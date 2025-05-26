import * as React from "react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Achievement } from "@/types/ArchievementType";
import { Calendar, User, FileText, Tag, ExternalLink, ArrowLeft, Link2, Wallet } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { MintAchievementNFT } from "./MintAchievementNFT";

interface AchievementDetailViewProps {
  achievement: any;
  originalAchievement: Achievement | null;
  onClose: () => void;
}

export function AchievementDetailView({ 
  achievement, 
  originalAchievement, 
  onClose 
}: AchievementDetailViewProps) {
  const [showMint, setShowMint] = useState(false);
  
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString() + ", " + date.toLocaleTimeString();
  };

  return (
    <div className="space-y-6 py-2">
      {/* Header with back button */}
      <div className="flex items-center gap-2 mb-4 border-b pb-4">
        <Button 
          variant="ghost" 
          size="sm" 
          onClick={onClose}
          className="p-0 h-8 w-8"
        >
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <h2 className="text-xl font-bold">Achievement Details</h2>
      </div>
      
      {/* Achievement header */}
      <div className="flex flex-col gap-6">
        <div className="w-full flex flex-col md:flex-row gap-6">
          <div className="w-full md:w-1/3">
            <img 
              src={achievement.imageURL} 
              alt={achievement.title || originalAchievement?.title}
              className="w-full h-auto rounded-lg object-cover aspect-square border shadow-sm"
            />
          </div>
          
          <div className="w-full md:w-2/3 space-y-4">
            <h3 className="text-2xl font-bold">{achievement.title || achievement.description || "Achievement"}</h3>
            
            <div className="flex flex-wrap items-center gap-2">
              <Badge variant="outline" className={achievement.status ? "bg-green-100 text-green-800 border-green-200" : "bg-amber-100 text-amber-800 border-amber-200"}>
                {achievement.status ? "Completed" : "In Progress"}
              </Badge>
              <span className="text-sm text-muted-foreground">
                Created on {new Date(achievement.createdAt).toLocaleDateString()}
              </span>
            </div>
            
            <p className="text-muted-foreground text-base">{achievement.description}</p>
          </div>
        </div>
        
        {/* Technical Details Card */}
        <div className="border rounded-lg p-6 bg-slate-50 space-y-6 mt-4">
          <h4 className="font-semibold text-lg">Technical Details</h4>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-y-6 gap-x-8">
            <div className="space-y-1">
              <div className="flex items-start gap-2">
                <FileText className="h-4 w-4 text-muted-foreground mt-1 flex-shrink-0" />
                <div>
                  <p className="text-sm font-medium text-muted-foreground">ID:</p>
                  <p className="text-sm font-mono break-all">{achievement._id}</p>
                </div>
              </div>
            </div>
            
            <div className="space-y-1">
              <div className="flex items-start gap-2">
                <User className="h-4 w-4 text-muted-foreground mt-1 flex-shrink-0" />
                <div>
                  <p className="text-sm font-medium text-muted-foreground">User Address:</p>
                  <p className="text-sm font-mono break-all">{achievement.userAddress}</p>
                </div>
              </div>
            </div>
            
            <div className="space-y-1">
              <div className="flex items-start gap-2">
                <Tag className="h-4 w-4 text-muted-foreground mt-1 flex-shrink-0" />
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Blob ID:</p>
                  <p className="text-sm font-mono break-all">{achievement.blobId}</p>
                </div>
              </div>
            </div>
            
            <div className="space-y-1">
              <div className="flex items-start gap-2">
                <Calendar className="h-4 w-4 text-muted-foreground mt-1 flex-shrink-0" />
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Created:</p>
                  <p className="text-sm">{formatDate(achievement.createdAt)}</p>
                </div>
              </div>
            </div>
          
          </div>
          
          {/* Metadata section if available */}
          {achievement.metadata && (
            <div className="mt-6 pt-4 border-t">
              <h4 className="font-medium mb-2">Metadata</h4>
              <pre className="bg-slate-100 p-4 rounded-md text-xs overflow-auto max-h-40 font-mono">
                {JSON.stringify(achievement.metadata, null, 2)}
              </pre>
            </div>
          )}
        </div>
        
        {/* Mint NFT Section */}
        {!achievement.status && (
          <div className="border rounded-lg p-6 bg-primary/5 space-y-4 border-dashed border-primary/50">
            <h4 className="font-semibold text-lg flex items-center gap-2">
              <Wallet className="h-5 w-5 text-primary" />
              Mint as NFT
            </h4>
            
            <p className="text-sm text-muted-foreground">
              Create a permanent record of this achievement on the Sui blockchain as an NFT
            </p>
            
            <Button
              variant="outline"
              size="sm"
              className="w-full border-primary/30 hover:bg-primary/10 flex items-center justify-center gap-1"
              onClick={() => setShowMint(!showMint)}
            >
              <Wallet className="h-3.5 w-3.5" />
              {showMint ? "Hide Mint Options" : "Mint as NFT"}
            </Button>

            {showMint && (
              <div className="mt-3">
                <MintAchievementNFT 
                  achievement={achievement} 
                  onMintSuccess={() => {
                    setShowMint(false);
                  }} 
                />
              </div>
            )}
          </div>
        )}
      </div>
      
      <div className="flex justify-end gap-3 pt-4 mt-6 border-t">
        <Button 
          variant="outline" 
          onClick={onClose}
          className="px-6"
        >
          Close
        </Button>
      </div>
    </div>
  );
}
