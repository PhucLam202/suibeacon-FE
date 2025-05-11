
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
import { useTransition, startTransition } from "react";

import Index from "./pages/Index";
import Achievements from "./pages/Achievements";
import Projects from "./pages/Projects";
import Analytics from "./pages/Analytics";
import NotFound from "./pages/NotFound";
import ProjectDetail from "./pages/ProjectDetail";

const queryClient = new QueryClient();

// Router component with transitions
const AppRoutes = () => {
  const [isPending, startPageTransition] = useTransition();
  
  return (
    <Routes>
      <Route path="/" element={<Index />} />
      <Route path="/achievements" element={<Achievements />} />
      <Route path="/projects" element={<Projects />} />
      <Route path="/projects/:id" element={<ProjectDetail />} />
      <Route path="/analytics" element={<Analytics />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
