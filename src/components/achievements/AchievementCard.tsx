import * as React from "react";
import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Award, Medal, Trophy, Wallet } from "lucide-react";
import { MintAchievementNFT } from "./MintAchievementNFT";
import { AchievementProps } from "@/types/ArchievementType";

// Component hiển thị cấp độ thành tựu
const LevelBadge = ({ level }) => {
  const levelConfig = {
    platinum: { icon: <Trophy className="h-3.5 w-3.5 mr-1" />, label: "Platinum", className: "bg-purple-500/10 text-purple-500 hover:bg-purple-500/20" },
    gold: { icon: <Medal className="h-3.5 w-3.5 mr-1" />, label: "Gold", className: "bg-amber-500/10 text-amber-500 hover:bg-amber-500/20" },
    silver: { icon: <Award className="h-3.5 w-3.5 mr-1" />, label: "Silver", className: "bg-slate-400/10 text-slate-400 hover:bg-slate-400/20" },
    bronze: { icon: <Award className="h-3.5 w-3.5 mr-1" />, label: "Bronze", className: "bg-orange-700/10 text-orange-700 hover:bg-orange-700/20" },
  };

  const config = levelConfig[level] || { icon: <Award className="h-3.5 w-3.5 mr-1" />, label: level, className: "" };

  return (
    <Badge variant="outline" className={config.className}>
      {config.icon}
      {config.label}
    </Badge>
  );
};

// Component hiển thị trạng thái thành tựu
const StatusBadge = ({ status, progress }) => {
  if (progress === 100 || !status) {
    return (
      <Badge variant="outline" className="bg-green-500/10 text-green-500 hover:bg-green-500/20">
        Hoàn thành
      </Badge>
    );
  }

  return (
    <Badge variant="outline" className="bg-blue-500/10 text-blue-500 hover:bg-blue-500/20">
      {status || "Đang thực hiện"}
    </Badge>
  );
};

// Component card hiển thị từng thành tựu
export function AchievementCard({ achievement }: AchievementProps) {
  const [showMint, setShowMint] = useState(false);
  const levelIcons = {
    platinum: <Trophy className="h-10 w-10 text-purple-500" />,
    gold: <Medal className="h-10 w-10 text-amber-500" />,
    silver: <Award className="h-10 w-10 text-slate-400" />,
    bronze: <Award className="h-10 w-10 text-orange-700" />,
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
            <span className="text-xs text-muted-foreground">{achievement.progress}% hoàn thành</span>
          </div>
        )}

        <div className="text-xs text-muted-foreground">{new Date(achievement.date).toLocaleDateString()}</div>

        {achievement.progress === 100 && (
          <div className="pt-2">
            <Button
              variant="outline"
              size="sm"
              className="w-full border-primary/30 hover:bg-primary/10 flex items-center justify-center gap-1"
              onClick={() => setShowMint(!showMint)}
            >
              <Wallet className="h-3.5 w-3.5" />
              {showMint ? "Ẩn tùy chọn Mint" : "Mint thành NFT"}
            </Button>

            {showMint && (
              <div className="mt-3">
                <MintAchievementNFT achievement={achievement} onMintSuccess={() => setShowMint(false)} />
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
