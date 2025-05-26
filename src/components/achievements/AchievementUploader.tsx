import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2, Upload, CheckCircle, AlertCircle } from "lucide-react";
import { useSuiWallet } from "@/hooks/useSuiWallet";
import { toast } from "@/components/ui/sonner";
import axios from "axios";
import { useApiEndpoints } from "@/utils/api";

interface UploadResponse {
  success: boolean;
  blobId?: string;
  imageUrl?: string;
  message: string;
}

interface AchievementUploaderProps {
  onSuccess?: () => void;
}

export function AchievementUploader({ onSuccess }: AchievementUploaderProps) {
  const [file, setFile] = useState<File | null>(null);
  const [description, setDescription] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [result, setResult] = useState<UploadResponse | null>(null);
  const [error, setError] = useState<string | null>(null);
  
  const { walletAddress } = useSuiWallet();
  const endpoints = useApiEndpoints();
  
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    setResult(null);
    
    try {
      const formData = new FormData();
      
      if (!file) {
        throw new Error('Please select an image file');
      }
      
      formData.append('image', file);
      formData.append('description', description);
      
      // Log FormData contents
      for (let pair of formData.entries()) {
        if (pair[1] instanceof File) {
          console.log(`${pair[0]}: File(name=${pair[1].name}, type=${pair[1].type}, size=${pair[1].size} bytes)`);
        } else {
          console.log(`${pair[0]}: ${pair[1]}`);
        }
      }
      
      const apiUrl = endpoints.ACHIEVEMENT_UPLOAD;
      if (!apiUrl) {
        throw new Error('API endpoint not found');
      }
      console.log("formData", formData);
      
      const response = await axios.post(apiUrl, formData, {
        headers: {
          'wallet-address': walletAddress as string,
        }
      });
      
      console.log("Upload response:", response.data);
      
      // Kiểm tra cấu trúc response
      if (response.data && response.data.data && response.data.data.success) {
        const responseData = response.data.data;
        
        setResult({
          success: responseData.success,
          blobId: responseData.blobId,
          imageUrl: responseData.imageUrl,
          message: responseData.message
        });
        
        toast.success("Achievement uploaded successfully!");
        setFile(null);
        setDescription('');
        
        // Call the onSuccess callback if provided
        if (onSuccess) {
          onSuccess();
        }
      } else if (response.data && response.data.success) {
        // Cấu trúc response: { success: true, ... }
        setResult(response.data);
        toast.success("Achievement uploaded successfully!");
        setFile(null);
        setDescription('');
        
        // Call the onSuccess callback if provided
        if (onSuccess) {
          onSuccess();
        }
      } else {
        console.error("Unexpected response structure:", response.data);
        throw new Error(response.data.message || response.data.data?.message || 'Upload failed');
      }
    } catch (err: any) {
      console.error("Upload error:", err);
      
      let errorMessage = 'An unknown error occurred';
      
      if (err.response) {
        console.error("Server error response:", err.response.data);
        errorMessage = `Server error (${err.response.status}): ${err.response.data?.message || err.response.data?.data?.message || err.message}`;
      } else if (err.request) {
        errorMessage = 'No response received from server. Please check your connection.';
      } else {
        errorMessage = err.message;
      }
      
      setError(errorMessage);
      toast.error("Failed to upload achievement", {
        description: errorMessage
      });
    } finally {
      setIsLoading(false);
    }
  };
  
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-xl">Upload Achievement</CardTitle>
        <CardDescription>
          Add a new achievement to your collection
        </CardDescription>
      </CardHeader>
      
      <CardContent>
        <div className="space-y-4">
          <div className="grid w-full max-w-sm items-center gap-1.5">
            <label htmlFor="image" className="text-sm font-medium">
              Select Image
            </label>
            <Input 
              type="file" 
              id="image" 
              accept="image/*" 
              onChange={handleFileChange} 
            />
          </div>
          
          {file && (
            <div className="mt-4 border rounded-md overflow-hidden">
              <img 
                src={URL.createObjectURL(file)} 
                alt="Preview" 
                className="w-full h-auto max-h-64 object-contain"
              />
            </div>
          )}
          
          <div className="grid w-full items-center gap-1.5 mt-4">
            <label htmlFor="description" className="text-sm font-medium">
              Description
            </label>
            <Textarea 
              id="description" 
              value={description} 
              onChange={(e) => setDescription(e.target.value)} 
              placeholder="Describe your achievement..." 
              className="min-h-[100px]"
            />
          </div>
        </div>
        
        {error && (
          <div className="mt-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded-md flex items-start gap-2">
            <AlertCircle className="h-5 w-5 flex-shrink-0 mt-0.5" />
            <p>{error}</p>
          </div>
        )}
        
        {result && (
          <div className="mt-4 p-3 bg-green-100 border border-green-400 text-green-700 rounded-md">
            <div className="flex items-center gap-2 mb-2">
              <CheckCircle className="h-5 w-5" />
              <h3 className="font-medium">Upload Successful!</h3>
            </div>
            <p className="mb-2">{result.message}</p>
            {result.imageUrl && (
              <div className="mt-3 space-y-2">
                <h4 className="font-medium text-sm">Your Achievement:</h4>
                <div className="border rounded-md overflow-hidden">
                  <img 
                    src={result.imageUrl} 
                    alt="Uploaded achievement" 
                    className="w-full h-auto max-h-64 object-contain"
                  />
                </div>
                <p className="text-sm">
                  Image URL: <a href={result.imageUrl} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">{result.imageUrl}</a>
                </p>
              </div>
            )}
            <p className="text-sm mt-2">Blob ID: {result.blobId}</p>
          </div>
        )}
      </CardContent>
      
      <CardFooter>
        <Button 
          onClick={handleSubmit} 
          disabled={isLoading || !file || !description}
          className="w-full"
        >
          {isLoading ? (
            <span className="flex items-center gap-2">
              <Loader2 className="h-4 w-4 animate-spin" />
              Uploading...
            </span>
          ) : (
            <span className="flex items-center gap-2">
              <Upload className="h-4 w-4" />
              Upload Achievement
            </span>
          )}
        </Button>
      </CardFooter>
    </Card>
  );
}
