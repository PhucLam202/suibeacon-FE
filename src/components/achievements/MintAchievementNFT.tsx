// MintAchievementNFT.tsx
import * as React from "react";
import { useState } from "react";
import { Award, CheckCircle2, Wallet, AlertCircle, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "@/components/ui/sonner";
import { ConnectButton, useCurrentAccount, useSignAndExecuteTransaction } from "@mysten/dapp-kit";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { useSuiWallet } from "@/hooks/useSuiWallet";
import { Transaction } from "@mysten/sui/transactions";

/**
 * Props for the MintAchievementNFT component
 * @property {any} achievement - The achievement data to mint as NFT
 * @property {Function} [onMintSuccess] - Optional callback function to execute after successful minting
 */
interface MintAchievementNFTProps {
  achievement: any;
  onMintSuccess?: () => void;
}

/**
 * Component for minting achievement NFTs on the Sui blockchain
 * 
 * This component handles the entire minting process including:
 * - Creating and executing the transaction
 * - Showing transaction status
 * - Handling success and error states
 * - Displaying appropriate UI based on wallet connection and minting status
 * 
 * @param {MintAchievementNFTProps} props - Component props
 * @returns {JSX.Element} - Rendered component
 */
export function MintAchievementNFT({ achievement, onMintSuccess }: MintAchievementNFTProps) {
  // Component state
  const [status, setStatus] = useState("idle"); // idle, signing, loading, minted
  const { mutate: signAndExecuteTransaction } = useSignAndExecuteTransaction();
  const currentAccount = useCurrentAccount();
  const [showSignatureDialog, setShowSignatureDialog] = useState(false);
  const { walletAddress } = useSuiWallet();

  // Contract addresses and object IDs from the published package
  // Updated package ID from the transaction log
  const PACKAGE_ID = "0xa2983a6993469f1823b75be5ef1868afa4d093d5bd84583112aa848230e9fe9d";
  // Updated registry ID from the transaction log
  const REGISTRY_ID = "0x8d4538af6a267ccd08abb3b8a6abfdeaef387dea7fa8c2e948de3f2c6ea8dec8";
  const CLOCK_OBJECT_ID = "0x6"; 

  /**
   * Handles the NFT minting process
   * 
   * This function:
   * 1. Creates a new transaction
   * 2. Adds the necessary objects and parameters
   * 3. Executes the transaction
   * 4. Handles success and error states
   */

  const handleMintNFT = () => {
    // Check if wallet is connected
    if (!currentAccount) return toast.error("Connect your wallet first");
    
    // Update UI state
    setStatus("signing");
    setShowSignatureDialog(true);

    try {
      // Create a new transaction
      const txb = new Transaction();

      // Get required objects
      const registryObj = txb.object(REGISTRY_ID);
      const clockObj = txb.object(CLOCK_OBJECT_ID);


      // Lấy đúng dữ liệu từ cấu trúc achievement như trong hình ảnh
      // Sử dụng title làm user_address
      const user_address = txb.pure.string(achievement.description);
      
      // Sử dụng description làm project_name
      const project_name = txb.pure.string(achievement.description || "");
      
      // Sử dụng blobId hoặc id làm blob_id
      const blob_id = txb.pure.string(achievement.blobId);
      
      // Sử dụng image làm image_url
      const image_url = txb.pure.string(achievement.image);

      console.log("Parameters for mint:", {
        user_address: achievement.userAddress,
        project_name: achievement.description,
        blob_id: achievement.blobId || achievement.id,
        image_url: achievement.image
      });

      // Gọi hàm mint với đúng số lượng và thứ tự tham số
      txb.moveCall({
        target: `${PACKAGE_ID}::suibeacon::mint`,
        arguments: [
          user_address,
          project_name,
          blob_id,
          registryObj,
          image_url,
          clockObj,
        ],
      });

      // Show notification to inform user about the transaction signing
      toast.info("Please sign the transaction in your wallet", {
        description: "Confirm the transaction to mint your NFT"
      });

      // Execute the transaction and request wallet signature
      setStatus("loading");
      signAndExecuteTransaction(
        {
          transaction: txb,
          chain: "sui:mainnet",
        },
        {
          onSuccess: (result) => {
            console.log("Transaction result:", result);
            setStatus("minted");
            setShowSignatureDialog(false);
            if (onMintSuccess) onMintSuccess();

            toast.success("NFT minted successfully!", {
              description: "Your achievement has been minted as an NFT"
            });
          },
          onError: (error) => {
            console.error("Error minting NFT:", error);
            setStatus("idle");
            setShowSignatureDialog(false);

            // Handle specific error cases with appropriate messages
            if (error.message?.includes("User rejected")) {
              toast.error("Transaction was rejected", {
                description: "You cancelled the transaction signing"
              });
            } else if (error.message?.includes("MoveAbort") && error.message?.includes("1")) {
              toast.error("Already minted", {
                description: "You have already minted an NFT for this achievement."
              });
            } else if (error.message?.includes("Incorrect number of arguments")) {
              toast.error("Contract configuration error", {
                description: "The contract function signature has changed. Please check the console for details."
              });
              console.error("Full error:", error);
              
              // Try to extract more information about expected arguments
              const errorMsg = error.message || "";
              console.log("Error message:", errorMsg);
            } else {
              toast.error("Failed to mint NFT", {
                description: error.message || "Please try again later"
              });
            }
          }
        }
      );
    } catch (error) {
      console.error("Error creating transaction:", error);
      setStatus("idle");
      setShowSignatureDialog(false);
      
      toast.error("Failed to create transaction", {
        description: error.message || "Please try again later"
      });
    }
  };

  /**
   * Dialog component for showing transaction signature request
   * Displays while waiting for user to sign the transaction in their wallet
   */
  const SignatureRequestDialog = () => (
    <Dialog open={showSignatureDialog} onOpenChange={setShowSignatureDialog}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Wallet className="h-5 w-5 text-primary" />
            Wallet Signature Request
          </DialogTitle>
          <DialogDescription>
            Please check your wallet application to sign the transaction
          </DialogDescription>
        </DialogHeader>
        <div className="flex flex-col items-center justify-center py-4 space-y-4">
          <div className="flex items-center justify-center w-16 h-16 rounded-full bg-primary/10">
            <Loader2 className="h-8 w-8 text-primary animate-spin" />
          </div>
          <div className="text-center space-y-2">
            <p className="font-medium">Waiting for signature...</p>
            <p className="text-sm text-muted-foreground">
              A signature request has been sent to your wallet
            </p>
            <div className="px-3 py-2 bg-amber-500/10 text-amber-500 rounded-md text-sm mt-2 flex items-center gap-2">
              <AlertCircle className="h-4 w-4" />
              <span>Do not close this window until the transaction is complete</span>
            </div>
          </div>
          <div className="text-xs text-muted-foreground">
            Wallet address: {walletAddress ? `${walletAddress.slice(0, 6)}...${walletAddress.slice(-4)}` : "Not identified"}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );

  // Render success state if NFT has been minted
  if (status === "minted") {
    return (
      <Card className="bg-muted/50">
        <CardContent className="pt-6 flex flex-col items-center justify-center text-center space-y-3">
          <CheckCircle2 className="h-12 w-12 text-green-500" />
          <div>
            <h3 className="font-medium text-lg">Successfully Minted!</h3>
            <p className="text-sm text-muted-foreground">
              This achievement is now permanently recorded on the Sui blockchain
            </p>
          </div>
        </CardContent>
      </Card>
    );
  }

  // Render the main component UI
  return (
    <>
      <Card className="border-dashed border-primary/50 bg-primary/5">
        <CardHeader className="pb-3">
          <CardTitle className="text-lg flex items-center gap-2">
            <Award className="h-5 w-5 text-primary" />
            Mint as NFT
          </CardTitle>
        </CardHeader>
        <CardContent className="pb-3">
          <p className="text-sm text-muted-foreground">
            Create a permanent record of this achievement on the Sui blockchain as an NFT
          </p>
          {status === "signing" && (
            <div className="mt-2 p-2 bg-blue-500/10 text-blue-500 rounded-md text-sm flex items-center gap-2">
              <Wallet className="h-4 w-4" />
              <span>Please check your wallet to sign the transaction</span>
            </div>
          )}
        </CardContent>
        <CardFooter>
          {!currentAccount ? (
            <div className="w-full space-y-2">
              <p className="text-sm text-center text-muted-foreground mb-1">Connect your wallet to mint this achievement</p>
              <ConnectButton className="w-full" />
            </div>
          ) : (
            <Button
              onClick={handleMintNFT}
              disabled={status === "signing" || status === "loading"}
              className="w-full"
              variant="default"
            >
              {status === "signing" ? (
                <span className="flex items-center gap-2">
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Waiting for signature...
                </span>
              ) : status === "loading" ? (
                <span className="flex items-center gap-2">
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Processing transaction...
                </span>
              ) : (
                <span className="flex items-center gap-2">
                  <Wallet className="h-4 w-4" />
                  Mint Achievement NFT
                </span>
              )}
            </Button>
          )}
        </CardFooter>
      </Card>
      <SignatureRequestDialog />
    </>
  );
}
