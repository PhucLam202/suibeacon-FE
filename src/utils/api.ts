// Lấy base URL từ biến môi trường
export const LOCAL_HOST_ENV = import.meta.env.LOCAL_HOST_ENV || 'http://localhost:5000';


// API endpoints với khả năng sử dụng địa chỉ ví
export const API_ENDPOINTS = {
  // Phương thức để lấy endpoints với địa chỉ ví cụ thể
  withWallet: (walletAddress: string | null) => {
    const address = walletAddress;
    return {
      PROJECTS: `${LOCAL_HOST_ENV}/v1/display/${address}`,
      SUMMARY: `${LOCAL_HOST_ENV}/v1/display/summary/${address}`,
      DOWNLOAD: (blobId: string) => `${LOCAL_HOST_ENV}/v1/walrus/download/${blobId}`
    };
  }
};

// Hàm helper để sử dụng trong các component React
import { useSuiWallet } from "@/hooks/useSuiWallet";

export const useApiEndpoints = () => {
  const { walletAddress } = useSuiWallet();
  return API_ENDPOINTS.withWallet(walletAddress);
};
