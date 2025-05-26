export interface Achievement {
  id: string | number;
  title: string;
  description: string;
  date: string;
  level: "platinum" | "gold" | "silver" | "bronze";
  featured?: boolean;
  progress: number;
  issuer?: string;
  details?: string;
  status?: string;
  imageURL?: string;
  image?: string;
  blobId?: string;
}

export interface AchievementProps {
  achievement: Achievement;
}
