import { Badge } from "@/components/ui/badge";
import { Trophy, Award, Star, Target } from "lucide-react";

interface MilestoneBadgeProps {
  type: "academic" | "social" | "leadership" | "achievement";
  title: string;
  description: string;
  earnedDate: string;
}

const MilestoneBadge = ({ type, title, description, earnedDate }: MilestoneBadgeProps) => {
  const getIcon = () => {
    switch (type) {
      case "academic":
        return <Trophy className="w-4 h-4" />;
      case "social":
        return <Star className="w-4 h-4" />;
      case "leadership":
        return <Award className="w-4 h-4" />;
      case "achievement":
        return <Target className="w-4 h-4" />;
      default:
        return <Trophy className="w-4 h-4" />;
    }
  };

  const getBadgeColor = () => {
    switch (type) {
      case "academic":
        return "bg-blue-100 text-blue-800 border-blue-200";
      case "social":
        return "bg-green-100 text-green-800 border-green-200";
      case "leadership":
        return "bg-purple-100 text-purple-800 border-purple-200";
      case "achievement":
        return "bg-orange-100 text-orange-800 border-orange-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  return (
    <div className="group cursor-pointer">
      <Badge 
        variant="outline" 
        className={`${getBadgeColor()} hover:shadow-sm transition-[var(--transition-fast)] p-2 h-auto flex flex-col items-start space-y-1`}
      >
        <div className="flex items-center space-x-1">
          {getIcon()}
          <span className="font-medium text-xs">{title}</span>
        </div>
        <p className="text-xs opacity-75 text-left">{description}</p>
        <span className="text-xs opacity-60">{earnedDate}</span>
      </Badge>
    </div>
  );
};

export default MilestoneBadge;