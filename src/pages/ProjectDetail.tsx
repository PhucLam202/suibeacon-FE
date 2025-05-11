import * as React from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { DashboardLayout } from "@/components/dashboard/layout";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  ArrowLeft, Calendar, Users, Tag, Edit, Trash2, 
  Package, Globe, Info, Clock, Wallet, Database, Copy
} from "lucide-react";
import { StatusBadge } from "@/pages/Projects";
import axios from "axios";
import { toast } from "@/components/ui/sonner";
import { useApiEndpoints } from "@/utils/api";
import { useSuiWallet } from "@/hooks/useSuiWallet";

// Interface cho dữ liệu project
interface Project {
  id: number | string;
  name: string;
  description?: string;
  status: string;
  date: string;
  tags: string[];
  blobId?: string;
  packages?: any[];
  metadata?: any;
}

export default function ProjectDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const [project, setProject] = React.useState<Project | null>(null);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);
  const endpoints = useApiEndpoints();
  
  // Lấy blobId từ query params
  const queryParams = new URLSearchParams(location.search);
  const blobId = queryParams.get('blobId');
  const isConnected = useSuiWallet().isConnected;

  // Fetch dữ liệu project và chi tiết
  React.useEffect(() => {
    if (!isConnected) return;
    
    const fetchProjectDetail = async () => {
      if (!id) {
        setError("Project ID is missing");
        setLoading(false);
        return;
      }
      
      if (!blobId) {
        setError("Blob ID is missing");
        setLoading(false);
        return;
      }
      
      try {
        setLoading(true);
        
        // Tạo key cho localStorage
        const storageKey = `project_${id}_${blobId}`;
        
        // Kiểm tra xem dữ liệu đã có trong localStorage chưa
        const cachedData = localStorage.getItem(storageKey);
        
        if (cachedData) {
          // Nếu có dữ liệu trong cache, sử dụng nó
          const parsedData = JSON.parse(cachedData);
          setProject(parsedData);
          setError(null);
          setLoading(false);
          return;
        }
        
        // Nếu không có dữ liệu trong cache, gọi API
        console.log(`Fetching details for blob: ${blobId}`);
        
        // Trước tiên, lấy thông tin dự án để có tên dự án
        const projectInfoResponse = await axios.get(endpoints.PROJECTS);
        
        // Tìm dự án có id phù hợp
        let projectName = "";
        if (projectInfoResponse.data && projectInfoResponse.data.data && Array.isArray(projectInfoResponse.data.data.data)) {
          const projectInfo = projectInfoResponse.data.data.data.find(item => item._id === id);
          if (projectInfo && projectInfo.projectName) {
            projectName = projectInfo.projectName;
          } else {
            projectName = `Project ${id.substring(0, 8)}`;
          }
        } else {
          projectName = `Project ${id.substring(0, 8)}`;
        }
        
        // Gọi API để lấy chi tiết
        const response = await axios.get(endpoints.DOWNLOAD(blobId));
        
        
        if (response.data && response.data.data && response.data.data.blob) {
          // Parse dữ liệu JSON từ blob
          const blobData = JSON.parse(response.data.data.blob);
          
          // Tạo dữ liệu project từ blobData
          const projectData = {
            id: id,
            name: projectName,
            description: `${blobId}`,
            status: "completed",
            date: blobData.metadata?.timestamp || new Date().toISOString(),
            tags: ["Sui", "Blockchain"],
            blobId: blobId,
            packages: blobData.packages || [],
            metadata: blobData.metadata || {}
          };
          
          // Lưu vào state
          setProject(projectData);
          
          // Lưu vào localStorage để sử dụng cho lần sau
          localStorage.setItem(storageKey, JSON.stringify(projectData));
          
          setError(null);
          toast.success("Project data loaded successfully");
        } else {
          throw new Error("Invalid response format");
        }
      } catch (err) {
        console.error("Error fetching project details:", err);
        setError("Failed to load project details. Please try again later.");
        toast.error("Failed to load project details");
        
        // Tạo dữ liệu giả để hiển thị trong trường hợp lỗi
        const fallbackData = {
          id: id,
          name: `Project ${id.substring(0, 8)}`,
          description: `Blob ID: ${blobId}`,
          status: "completed",
          date: new Date().toISOString(),
          tags: ["Sui", "Blockchain"],
          blobId: blobId,
          packages: [
            { name: "biblatex-check", version: "1.0.2", type: "installed" },
            { name: "python310", version: "3.10.16", type: "installed" }
          ],
          metadata: {
            totalCount: 2,
            timestamp: new Date().toISOString(),
            source: "Local",
            walletAddress: "0x7oKYAVBIswuNBIQ4jDv27FBNyHZCPLhJGnc7MBf1C5s"
          }
        };
        
        setProject(fallbackData);
      } finally {
        setLoading(false);
      }
    };

    fetchProjectDetail();
  }, [id, blobId, isConnected, endpoints]);
  
  // Hiển thị loading state
  if (loading) {
    return (
      <DashboardLayout breadcrumbs={[
        { title: "Projects", href: "/projects" },
        { title: "Loading..." }
      ]}>
        <div className="flex justify-center items-center py-10">
          <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-500"></div>
        </div>
      </DashboardLayout>
    );
  }
  
  // Hiển thị error state
  if (error || !project) {
    return (
      <DashboardLayout breadcrumbs={[
        { title: "Projects", href: "/projects" },
        { title: "Error" }
      ]}>
        <div className="flex flex-col items-center justify-center h-[50vh] space-y-4">
          <h1 className="text-2xl font-bold">Project Not Found</h1>
          <p className="text-muted-foreground">{error || "Project data is missing"}</p>
          <Button onClick={() => navigate("/projects")}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Projects
          </Button>
        </div>
      </DashboardLayout>
    );
  }
  
  return (
    <DashboardLayout breadcrumbs={[
      { title: "Projects", href: "/projects" },
      { title: project.name }
    ]}>
      <div className="space-y-8 max-w-7xl mx-auto px-4 py-6">
        {/* Header with back button */}
        <div className="flex items-center space-x-4 mb-8">
          <Button 
            variant="outline" 
            size="sm" 
            onClick={() => navigate("/projects")}
            className="rounded-full hover:shadow-md transition-all"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back
          </Button>
          <h1 className="text-3xl font-bold tracking-tight">{project.name}</h1>
          <StatusBadge status={project.status} />
        </div>
        
        {/* Project header card with visual element */}
        <div className="rounded-xl border bg-card p-8 shadow-md dark:border-slate-700 dark:bg-gradient-to-br dark:from-slate-900 dark:to-slate-800 mb-8 overflow-hidden">
          <div className="flex flex-col md:flex-row gap-6 items-center">
            {/* Project icon/visual */}
            <div className="flex-shrink-0 w-24 h-24 rounded-xl bg-sky-100 dark:bg-sky-900/30 flex items-center justify-center">
              <Database className="h-12 w-12 text-sky-500" />
            </div>
            
            {/* Project summary */}
            <div className="flex-grow">
              <div className="flex flex-wrap gap-3 mb-3">
                {project.tags.map((tag, i) => (
                  <Badge key={i} variant="secondary" className="px-3 py-1.5 text-sm rounded-full">
                    <Tag className="mr-1.5 h-3.5 w-3.5" />
                    {tag}
                  </Badge>
                ))}
              </div>
              <p className="text-lg text-muted-foreground mb-4">{project.description}</p>
              <div className="flex flex-wrap gap-6 text-sm text-muted-foreground">
                <div className="flex items-center">
                  <Calendar className="mr-2 h-4 w-4 text-sky-500" />
                  {new Date(project.date).toLocaleDateString()}
                </div>
                <div className="flex items-center">
                  <Info className="mr-2 h-4 w-4 text-sky-500" />
                  Status: <span className="ml-1 font-medium">{project.status}</span>
                </div>
                <div className="flex items-center">
                  <Package className="mr-2 h-4 w-4 text-sky-500" />
                  {project.packages?.length || 0} packages
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Project details grid */}
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          {/* Main info - 2/3 width */}
          <div className="lg:col-span-2 space-y-8">
            {/* Packages section */}
            {project.packages && project.packages.length > 0 && (
              <div className="rounded-xl border bg-card p-6 shadow-md transition-all hover:shadow-lg dark:border-slate-700 dark:bg-gradient-to-br dark:from-slate-900 dark:to-slate-800">
                <h3 className="text-xl font-semibold mb-4 flex items-center">
                  <Package className="mr-2 h-5 w-5 text-sky-500" />
                  Packages ({project.packages.length})
                </h3>
                <div className="border rounded-lg overflow-hidden">
                  <table className="w-full">
                    <thead className="bg-muted">
                      <tr>
                        <th className="px-4 py-3 text-left font-medium">Name</th>
                        <th className="px-4 py-3 text-left font-medium">Version</th>
                        <th className="px-4 py-3 text-left font-medium">Type</th>
                      </tr>
                    </thead>
                    <tbody>
                      {project.packages.map((pkg, index) => (
                        <tr key={index} className={index % 2 === 0 ? "bg-background" : "bg-muted/30"}>
                          <td className="px-4 py-3">{pkg.name}</td>
                          <td className="px-4 py-3">{pkg.version}</td>
                          <td className="px-4 py-3">{pkg.type}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
            
            {/* Additional info section */}
            <div className="rounded-xl border bg-card p-6 shadow-md transition-all hover:shadow-lg dark:border-slate-700 dark:bg-gradient-to-br dark:from-slate-900 dark:to-slate-800">
              <h3 className="text-xl font-semibold mb-4 flex items-center">
                <Globe className="mr-2 h-5 w-5 text-sky-500" />
                Project Information
              </h3>
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-4 rounded-lg bg-sky-50 dark:bg-sky-900/20">
                    <h4 className="text-sm font-medium text-muted-foreground mb-1">Project ID</h4>
                    <p className="font-medium">{project.id}</p>
                  </div>
                  <div className="p-4 rounded-lg bg-sky-50 dark:bg-sky-900/20">
                    <h4 className="text-sm font-medium text-muted-foreground mb-1">Created On</h4>
                    <p className="font-medium">{new Date(project.date).toLocaleDateString()}</p>
                  </div>
                  <div className="p-4 rounded-lg bg-sky-50 dark:bg-sky-900/20">
                    <h4 className="text-sm font-medium text-muted-foreground mb-1">Status</h4>
                    <p className="font-medium">{project.status}</p>
                  </div>
                  <div className="p-4 rounded-lg bg-sky-50 dark:bg-sky-900/20">
                    <h4 className="text-sm font-medium text-muted-foreground mb-1">Tags</h4>
                    <div className="flex flex-wrap gap-2 mt-1">
                      {project.tags.map((tag, i) => (
                        <span key={i} className="px-2 py-1 bg-white dark:bg-slate-800 rounded-md text-xs font-medium">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Side info - 1/3 width */}
          <div className="space-y-8">
            {/* Blob ID card */}
            <div className="rounded-xl border bg-card p-6 shadow-md transition-all hover:shadow-lg dark:border-slate-700 dark:bg-gradient-to-br dark:from-slate-900 dark:to-slate-800">
              <h3 className="text-xl font-semibold mb-4 flex items-center">
                <Info className="mr-2 h-5 w-5 text-sky-500" />
                Blob Details
              </h3>
              <div className="space-y-4">
                <div>
                  <h4 className="text-sm font-medium text-muted-foreground mb-1">Blob ID</h4>
                  <div className="p-3 bg-muted rounded-lg text-sm break-all font-mono">{project.blobId}</div>
                </div>
              </div>
            </div>
            {/* Pull Package */}
            <div className="rounded-xl border bg-card p-6 shadow-md transition-all hover:shadow-lg dark:border-slate-700 dark:bg-gradient-to-br dark:from-slate-900 dark:to-slate-800">
              <h3 className="text-xl font-semibold mb-4 flex items-center">
                <Package className="mr-2 h-5 w-5 text-sky-500" />
                Pull Package
              </h3>
              <div className="space-y-4">
                <div>
                  <h4 className="text-sm font-medium text-muted-foreground mb-1">Command</h4>
                  <div className="p-3 bg-muted rounded-lg text-sm break-all font-mono">
                    beacon pull {project.blobId}
                  </div>
                </div>
                <Button 
                  variant="outline" 
                  className="w-full"
                  onClick={() => {
                    navigator.clipboard.writeText(`beacon pull ${project.blobId}`);
                    toast.success("Command copied to clipboard");
                  }}
                >
                  <Copy className="mr-2 h-4 w-4" />
                  Copy Command
                </Button>
              </div>
            </div>
            {/* Metadata card */}
            {project.metadata && (
              <div className="rounded-xl border bg-card p-6 shadow-md transition-all hover:shadow-lg dark:border-slate-700 dark:bg-gradient-to-br dark:from-slate-900 dark:to-slate-800">
                <h3 className="text-xl font-semibold mb-4 flex items-center">
                  <Clock className="mr-2 h-5 w-5 text-sky-500" />
                  Metadata
                </h3>
                <div className="space-y-4">
                  <div className="flex items-center p-3 bg-muted/50 rounded-lg">
                    <div className="w-8 h-8 rounded-full bg-sky-100 dark:bg-sky-900/50 flex items-center justify-center mr-3">
                      <Package className="h-4 w-4 text-sky-500" />
                    </div>
                    <div>
                      <h4 className="text-sm font-medium">Total Count</h4>
                      <p className="text-lg font-semibold">{project.metadata.totalCount}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center p-3 bg-muted/50 rounded-lg">
                    <div className="w-8 h-8 rounded-full bg-sky-100 dark:bg-sky-900/50 flex items-center justify-center mr-3">
                      <Clock className="h-4 w-4 text-sky-500" />
                    </div>
                    <div>
                      <h4 className="text-sm font-medium">Timestamp</h4>
                      <p className="text-sm">{new Date(project.metadata.timestamp).toLocaleString()}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center p-3 bg-muted/50 rounded-lg">
                    <div className="w-8 h-8 rounded-full bg-sky-100 dark:bg-sky-900/50 flex items-center justify-center mr-3">
                      <Globe className="h-4 w-4 text-sky-500" />
                    </div>
                    <div>
                      <h4 className="text-sm font-medium">Source</h4>
                      <p className="text-sm font-medium">{project.metadata.source}</p>
                    </div>
                  </div>
                  
                  <div className="p-3 bg-muted/50 rounded-lg">
                    <div className="flex items-center mb-2">
                      <div className="w-8 h-8 rounded-full bg-sky-100 dark:bg-sky-900/50 flex items-center justify-center mr-3">
                        <Wallet className="h-4 w-4 text-sky-500" />
                      </div>
                      <h4 className="text-sm font-medium">Wallet Address</h4>
                    </div>
                    <p className="text-xs break-all font-mono bg-background p-2 rounded-md dark:bg-slate-800">
                      {project.metadata.walletAddress}
                    </p>
                  </div>
                </div>
              </div>
            )}
            
            {/* Actions card */}
            {/* <div className="rounded-xl border bg-card p-6 shadow-md transition-all hover:shadow-lg dark:border-slate-700 dark:bg-gradient-to-br dark:from-slate-900 dark:to-slate-800">
              <h3 className="text-xl font-semibold mb-4">Actions</h3>
              <div className="flex flex-col space-y-3">
                <Button className="w-full bg-sky-600 hover:bg-sky-700">
                  <Edit className="mr-2 h-4 w-4" />
                  Edit Project
                </Button>
                <Button 
                  variant="outline" 
                  className="w-full"
                  onClick={() => {
                    // Xóa cache và tải lại dữ liệu
                    const storageKey = `project_${id}_${blobId}`;
                    localStorage.removeItem(storageKey);
                    window.location.reload();
                    toast.info("Refreshing project data...");
                  }}
                >
                  <Clock className="mr-2 h-4 w-4" />
                  Refresh Data
                </Button>
                <Button variant="destructive" className="w-full">
                  <Trash2 className="mr-2 h-4 w-4" />
                  Delete Project
                </Button>
              </div>
            </div> */}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
