
import * as React from "react";
import { useNavigate } from "react-router-dom";
import { DashboardLayout } from "@/components/dashboard/layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { FolderKanban, Plus, Search, Edit, Eye, Trash2, MoreVertical, Calendar, Tag, Users } from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";

// Mock project data
const projects = [
  {
    id: 1,
    name: "Dashboard Redesign",
    description: "Modern UI overhaul for analytics dashboard",
    status: "in-progress",
    date: "2023-11-15",
    team: 4,
    tags: ["UI/UX", "Frontend"]
  },
  {
    id: 2,
    name: "API Integration Service",
    description: "Backend service for third-party API integration",
    status: "completed",
    date: "2023-10-28",
    team: 3,
    tags: ["Backend", "API"]
  },
  {
    id: 3,
    name: "Mobile App Prototype",
    description: "iOS and Android prototype for client approval",
    status: "draft",
    date: "2023-12-05",
    team: 2,
    tags: ["Mobile", "Design"]
  },
  {
    id: 4,
    name: "E-commerce Platform",
    description: "Full-stack e-commerce solution with payment integration",
    status: "in-progress",
    date: "2023-11-20",
    team: 6,
    tags: ["Fullstack", "E-commerce"]
  },
  {
    id: 5,
    name: "Content Management System",
    description: "Custom CMS for digital publishing company",
    status: "completed",
    date: "2023-09-30",
    team: 5,
    tags: ["Backend", "CMS"]
  }
];

// Status badge component
export const StatusBadge = ({ status }) => {
  const statusConfig = {
    "completed": { label: "Completed", className: "bg-green-500/10 text-green-500 hover:bg-green-500/20" },
    "in-progress": { label: "In Progress", className: "bg-blue-500/10 text-blue-500 hover:bg-blue-500/20" },
    "draft": { label: "Draft", className: "bg-amber-500/10 text-amber-500 hover:bg-amber-500/20" }
  };
  
  const config = statusConfig[status] || { label: status, className: "" };
  
  return (
    <Badge variant="outline" className={config.className}>
      {config.label}
    </Badge>
  );
};

export default function Projects() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = React.useState("");
  const [statusFilter, setStatusFilter] = React.useState("all");
  
  const filteredProjects = projects.filter(project => {
    const matchesSearch = project.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          project.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === "all" || project.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });
  
  return (
    <DashboardLayout breadcrumbs={[{ title: "Projects" }]}>
      <div className="space-y-6">
        {/* Header with icon and new project button */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <FolderKanban className="h-6 w-6 text-blue-500" />
            <h1 className="text-2xl font-bold">Projects</h1>
          </div>
          <Button className="bg-blue-600 hover:bg-blue-700">
            <Plus className="mr-2 h-4 w-4" />
            New Project
          </Button>
        </div>
        
        {/* Filter and search bar */}
        <div className="flex flex-col space-y-4 md:flex-row md:items-center md:justify-between md:space-y-0 md:space-x-4">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search projects..."
              className="pl-8"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <div className="flex items-center space-x-4">
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Statuses</SelectItem>
                <SelectItem value="in-progress">In Progress</SelectItem>
                <SelectItem value="completed">Completed</SelectItem>
                <SelectItem value="draft">Draft</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        
        {/* Project cards */}
        <div className="grid gap-4">
          {filteredProjects.map((project) => (
            <div 
              key={project.id} 
              className="group rounded-xl border bg-card p-5 shadow-md transition-all duration-200 hover:border-primary/50 hover:shadow-lg dark:border-slate-700 dark:bg-gradient-to-br dark:from-slate-900 dark:to-slate-800 dark:hover:border-blue-500/50 dark:hover:shadow-blue-900/10"
            >
              <div className="flex flex-col justify-between space-y-4 md:flex-row md:space-y-0">
                {/* Left side - Project info */}
                <div className="space-y-3">
                  <div className="flex items-center space-x-3">
                    <h3 className="text-lg font-semibold">{project.name}</h3>
                    <StatusBadge status={project.status} />
                  </div>
                  
                  <p className="text-sm text-muted-foreground">{project.description}</p>
                  
                  <div className="flex flex-wrap items-center gap-3 text-xs text-muted-foreground">
                    <div className="flex items-center">
                      <Calendar className="mr-1 h-3.5 w-3.5" />
                      {new Date(project.date).toLocaleDateString()}
                    </div>
                    <div className="flex items-center">
                      <Users className="mr-1 h-3.5 w-3.5" />
                      {project.team} members
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      {project.tags.map((tag, i) => (
                        <span key={i} className="rounded-full bg-secondary px-2 py-0.5 text-xs dark:bg-slate-800">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
                
                {/* Right side - Action buttons */}
                <div className="flex items-center space-x-2">
                  <div className="hidden md:flex md:space-x-2">
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="h-9 px-2.5"
                      onClick={() => navigate(`/projects/${project.id}`)}
                    >
                      <Eye className="h-4 w-4" />
                      <span className="ml-1.5">View</span>
                    </Button>
                    <Button variant="outline" size="sm" className="h-9 px-2.5">
                      <Edit className="h-4 w-4" />
                      <span className="ml-1.5">Edit</span>
                    </Button>
                    <Button variant="outline" size="sm" className="h-9 px-2.5 text-destructive hover:bg-destructive/10 hover:text-destructive">
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                  
                  {/* Mobile menu */}
                  <div className="md:hidden">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="outline" size="icon" className="h-9 w-9">
                          <MoreVertical className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => navigate(`/projects/${project.id}`)}>
                          <Eye className="mr-2 h-4 w-4" />
                          View
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Edit className="mr-2 h-4 w-4" />
                          Edit
                        </DropdownMenuItem>
                        <DropdownMenuItem className="text-destructive">
                          <Trash2 className="mr-2 h-4 w-4" />
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
}
