// Định nghĩa các URL cơ sở - sử dụng giá trị cố định thay vì biến môi trường
export const LOCAL_HOST_ENV = 'http://localhost:5000';
export const PRODUCT_ENV = 'https://suibeacon-be.onrender.com';

// Sử dụng URL production - change this to PRODUCT_ENV if needed
const API_BASE_URL = LOCAL_HOST_ENV;

// Địa chỉ ví mặc định khi không có wallet được kết nối

// API endpoints với khả năng sử dụng địa chỉ ví
export const API_ENDPOINTS = {
  // Phương thức để lấy endpoints với địa chỉ ví cụ thể
  withWallet: (walletAddress: string | null) => {
    // Sử dụng địa chỉ ví được cung cấp hoặc địa chỉ mặc định nếu không có
    const address = walletAddress;
    
       const endpoints = {
      PROJECTS: `${API_BASE_URL}/v1/display/${address}`,
      SUMMARY: `${API_BASE_URL}/v1/display/summary/${address}`,
      ACHIEVEMENTS:`${API_BASE_URL}/v1/achievements`,
      ACHIEVEMENT_UPLOAD:`${API_BASE_URL}/v1/achievements/upload`,
      ACHIEVEMENT_DETAILS: (blobId: string) => `${API_BASE_URL}/v1/achievements/details/${blobId}`,
      
      DOWNLOAD: (blobId: string) => `${API_BASE_URL}/v1/walrus/download/${blobId}`
    };
        
    return endpoints;
  }
};

// Hàm helper để sử dụng trong các component React
import { useSuiWallet } from "@/hooks/useSuiWallet";

export const useApiEndpoints = () => {
  const { walletAddress } = useSuiWallet();
  return API_ENDPOINTS.withWallet(walletAddress);
};
