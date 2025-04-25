import * as React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { DashboardLayout } from "@/components/dashboard/layout";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Calendar, Users, Tag, Edit, Trash2 } from "lucide-react";
import { StatusBadge } from "@/pages/Projects";

// Sử dụng cùng dữ liệu mock từ trang Projects
const projects = [
  {
    id: 1,
    name: "Dashboard Redesign",
    description: "Modern UI overhaul for analytics dashboard",
    status: "in-progress",
    date: "2023-11-15",
    team: 4,
    tags: ["UI/UX", "Frontend"],
    details: "This project aims to completely redesign our analytics dashboard with a modern UI approach, improving usability and visual appeal while maintaining all existing functionality."
  },
  // Các dự án khác...
];

export default function ProjectDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const projectId = parseInt(id || "0");
  
  const project = projects.find(p => p.id === projectId);
  
  if (!project) {
    return (
      <DashboardLayout breadcrumbs={[
        { title: "Projects", href: "/projects" },
        { title: "Not Found" }
      ]}>
        <div className="flex flex-col items-center justify-center h-[50vh] space-y-4">
          <h1 className="text-2xl font-bold">Project Not Found</h1>
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
      <div className="space-y-6">
        {/* Header with back button */}
        <div className="flex items-center space-x-4">
          <Button 
            variant="outline" 
            size="sm" 
            onClick={() => navigate("/projects")}
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back
          </Button>
          <h1 className="text-2xl font-bold">{project.name}</h1>
          <StatusBadge status={project.status} />
        </div>
        
        {/* Project details card */}
        <div className="rounded-xl border bg-card p-6 shadow-md dark:border-slate-700 dark:bg-gradient-to-br dark:from-slate-900 dark:to-slate-800">
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
            {/* Main info */}
            <div className="lg:col-span-2 space-y-6">
              <div>
                <h3 className="text-lg font-medium mb-2">Description</h3>
                <p className="text-muted-foreground">{project.description}</p>
              </div>
              
              <div>
                <h3 className="text-lg font-medium mb-2">Details</h3>
                <p className="text-muted-foreground">{project.details || "No additional details available."}</p>
              </div>
              
              <div>
                <h3 className="text-lg font-medium mb-2">Tags</h3>
                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag, i) => (
                    <Badge key={i} variant="secondary" className="px-2.5 py-1">
                      <Tag className="mr-1 h-3.5 w-3.5" />
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
            
            {/* Side info */}
            <div className="space-y-6">
              <div className="rounded-lg border bg-card/50 p-4 space-y-4 dark:border-slate-700 dark:bg-slate-800/50">
                <div>
                  <h4 className="text-sm font-medium text-muted-foreground mb-1">Created On</h4>
                  <div className="flex items-center">
                    <Calendar className="mr-2 h-4 w-4 text-primary" />
                    <span>{new Date(project.date).toLocaleDateString()}</span>
                  </div>
                </div>
                
                <div>
                  <h4 className="text-sm font-medium text-muted-foreground mb-1">Team Members</h4>
                  <div className="flex items-center">
                    <Users className="mr-2 h-4 w-4 text-primary" />
                    <span>{project.team} members</span>
                  </div>
                </div>
                
                <div className="pt-4 border-t dark:border-slate-700">
                  <div className="flex flex-col space-y-2">
                    <Button className="w-full">
                      <Edit className="mr-2 h-4 w-4" />
                      Edit Project
                    </Button>
                    <Button variant="destructive" className="w-full">
                      <Trash2 className="mr-2 h-4 w-4" />
                      Delete Project
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
