
import * as React from "react";
import { DashboardLayout } from "@/components/dashboard/layout";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Progress } from "@/components/ui/progress";
import { Award, Calendar, ExternalLink, Medal, Star, Trophy, User } from "lucide-react";

// Mock data for achievements
const achievements = [
  {
    id: 1,
    title: "Master Developer",
    description: "Completed 100 projects with excellent client feedback",
    date: "2023-12-15",
    level: "platinum",
    featured: true,
    progress: 100,
    issuer: "Tech Excellence Board",
    image: "/achievements/master-dev.png",
    details: "This prestigious award recognizes developers who consistently deliver high-quality work across multiple projects and maintain excellent client relationships."
  },
  {
    id: 2,
    title: "Code Optimization Expert",
    description: "Reduced application load time by 40%",
    date: "2023-10-05",
    level: "gold",
    featured: false,
    progress: 100,
    issuer: "Performance Guild",
    details: "Awarded for implementing advanced optimization techniques that significantly improved application performance."
  },
  {
    id: 3,
    title: "UI/UX Specialist",
    description: "Created 25 user-friendly interfaces",
    date: "2023-09-18",
    level: "silver",
    featured: false,
    progress: 100,
    issuer: "Design Excellence Committee",
    details: "Recognition for consistently creating intuitive and accessible user interfaces that enhance user experience."
  },
  {
    id: 4,
    title: "Team Collaboration",
    description: "Successfully mentored 5 junior developers",
    date: "2023-08-22",
    level: "bronze",
    featured: false,
    progress: 100,
    issuer: "Team Leadership Council",
    details: "Awarded for exceptional mentorship and fostering a collaborative team environment."
  },
  {
    id: 5,
    title: "API Integration Master",
    description: "Integrated 15 third-party APIs",
    date: "2023-07-10",
    level: "gold",
    featured: false,
    progress: 100,
    issuer: "Integration Excellence Board",
    details: "Recognition for successfully implementing complex API integrations across multiple projects."
  },
  {
    id: 6,
    title: "Cloud Architecture",
    description: "Designing scalable cloud solutions",
    date: "2023-11-30",
    level: "silver",
    featured: false,
    progress: 75,
    status: "ongoing",
    issuer: "Cloud Computing Guild",
    details: "In-progress achievement for demonstrating expertise in cloud architecture and implementation."
  }
];

// Level badge component
const LevelBadge = ({ level }) => {
  const levelConfig = {
    "platinum": { icon: <Trophy className="h-3.5 w-3.5 mr-1" />, label: "Platinum", className: "bg-purple-500/10 text-purple-500 hover:bg-purple-500/20" },
    "gold": { icon: <Medal className="h-3.5 w-3.5 mr-1" />, label: "Gold", className: "bg-amber-500/10 text-amber-500 hover:bg-amber-500/20" },
    "silver": { icon: <Award className="h-3.5 w-3.5 mr-1" />, label: "Silver", className: "bg-slate-400/10 text-slate-400 hover:bg-slate-400/20" },
    "bronze": { icon: <Award className="h-3.5 w-3.5 mr-1" />, label: "Bronze", className: "bg-orange-700/10 text-orange-700 hover:bg-orange-700/20" }
  };
  
  const config = levelConfig[level] || { icon: <Award className="h-3.5 w-3.5 mr-1" />, label: level, className: "" };
  
  return (
    <Badge variant="outline" className={config.className}>
      {config.icon}
      {config.label}
    </Badge>
  );
};

// Status badge component
const StatusBadge = ({ status, progress }) => {
  if (progress === 100 || !status) {
    return (
      <Badge variant="outline" className="bg-green-500/10 text-green-500 hover:bg-green-500/20">
        Completed
      </Badge>
    );
  }
  
  return (
    <Badge variant="outline" className="bg-blue-500/10 text-blue-500 hover:bg-blue-500/20">
      {status || "In Progress"}
    </Badge>
  );
};

// Achievement detail dialog
const AchievementDetail = ({ achievement }) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="ghost" className="absolute inset-0 w-full h-full p-0 m-0 opacity-0">
          View details
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            {achievement.title}
            <LevelBadge level={achievement.level} />
          </DialogTitle>
          <DialogDescription>
            {achievement.description}
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-4 py-4">
          <div className="flex items-center gap-2 text-sm">
            <Calendar className="h-4 w-4 text-muted-foreground" />
            <span>Awarded on {new Date(achievement.date).toLocaleDateString()}</span>
          </div>
          
          <div className="flex items-center gap-2 text-sm">
            <User className="h-4 w-4 text-muted-foreground" />
            <span>Issued by {achievement.issuer}</span>
          </div>
          
          {achievement.progress < 100 && (
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Progress</span>
                <span>{achievement.progress}%</span>
              </div>
              <Progress value={achievement.progress} className="h-2" />
            </div>
          )}
          
          <p className="text-sm text-muted-foreground">{achievement.details}</p>
          
          <div className="pt-4 border-t">
            <Button variant="outline" className="w-full">
              <ExternalLink className="mr-2 h-4 w-4" />
              View Certificate
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

// Featured achievement component
const FeaturedAchievement = ({ achievement }) => {
  return (
    <div className="relative rounded-lg border p-6 bg-gradient-to-br from-slate-900 to-slate-800 dark:from-slate-800 dark:to-slate-900 shadow-lg overflow-hidden group">
      <div className="absolute top-0 right-0 p-2">
        <Star className="h-6 w-6 text-yellow-500 fill-yellow-500" />
      </div>
      
      <div className="flex flex-col md:flex-row items-center gap-6">
        <div className="relative flex-shrink-0 w-24 h-24 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center group-hover:scale-105 transition-transform duration-300">
          <Trophy className="h-12 w-12 text-white" />
        </div>
        
        <div className="flex-1 space-y-4 text-center md:text-left">
          <div>
            <h2 className="text-xl font-bold">{achievement.title}</h2>
            <p className="text-muted-foreground">{achievement.description}</p>
          </div>
          
          <div className="flex flex-wrap gap-2 justify-center md:justify-start">
            <LevelBadge level={achievement.level} />
            <StatusBadge status={achievement.status} progress={achievement.progress} />
          </div>
          
          <div className="flex items-center gap-2 text-sm text-muted-foreground justify-center md:justify-start">
            <Calendar className="h-4 w-4" />
            <span>Awarded on {new Date(achievement.date).toLocaleDateString()}</span>
          </div>
          
          {achievement.progress < 100 && (
            <div className="space-y-1 max-w-md">
              <div className="flex justify-between text-sm">
                <span>Progress</span>
                <span>{achievement.progress}%</span>
              </div>
              <Progress value={achievement.progress} className="h-2" />
            </div>
          )}
          
          <Button variant="outline" className="border-blue-500/50 text-blue-400 hover:bg-blue-500/10">
            View Details
          </Button>
        </div>
      </div>
      
      <AchievementDetail achievement={achievement} />
    </div>
  );
};

// Regular achievement card component
const AchievementCard = ({ achievement }) => {
  const levelIcons = {
    "platinum": <Trophy className="h-10 w-10 text-purple-500" />,
    "gold": <Medal className="h-10 w-10 text-amber-500" />,
    "silver": <Award className="h-10 w-10 text-slate-400" />,
    "bronze": <Award className="h-10 w-10 text-orange-700" />
  };
  
  return (
    <div className="relative rounded-lg border p-4 bg-card shadow-sm hover:shadow-md hover:border-primary/30 transition-all duration-200 group">
      <div className="space-y-3 text-center">
        <div className="mx-auto h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
          {levelIcons[achievement.level] || <Award className="h-10 w-10 text-primary" />}
        </div>
        
        <h3 className="font-semibold">{achievement.title}</h3>
        
        <p className="text-xs text-muted-foreground line-clamp-2">{achievement.description}</p>
        
        <div className="flex flex-wrap gap-2 justify-center">
          <LevelBadge level={achievement.level} />
          <StatusBadge status={achievement.status} progress={achievement.progress} />
        </div>
        
        {achievement.progress < 100 && (
          <div className="space-y-1">
            <Progress value={achievement.progress} className="h-1.5" />
            <span className="text-xs text-muted-foreground">{achievement.progress}% complete</span>
          </div>
        )}
        
        <div className="text-xs text-muted-foreground">
          {new Date(achievement.date).toLocaleDateString()}
        </div>
      </div>
      
      <AchievementDetail achievement={achievement} />
    </div>
  );
};

export default function Achievements() {
  const featuredAchievement = achievements.find(a => a.featured);
  const regularAchievements = achievements.filter(a => !a.featured);
  
  return (
    <DashboardLayout breadcrumbs={[{ title: "Achievements" }]}>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold">Achievements</h1>
          
          <Tabs defaultValue="all" className="w-[400px]">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="all">All</TabsTrigger>
              <TabsTrigger value="completed">Completed</TabsTrigger>
              <TabsTrigger value="ongoing">In Progress</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
        
        {/* Featured Achievement */}
        {featuredAchievement && (
          <div className="mb-8">
            <h2 className="text-lg font-semibold mb-3 flex items-center">
              <Trophy className="mr-2 h-5 w-5 text-yellow-500" />
              Featured Achievement
            </h2>
            <FeaturedAchievement achievement={featuredAchievement} />
          </div>
        )}
        
        {/* Regular Achievements */}
        <div>
          <h2 className="text-lg font-semibold mb-3">Your Achievements</h2>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {regularAchievements.map((achievement) => (
              <AchievementCard key={achievement.id} achievement={achievement} />
            ))}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
