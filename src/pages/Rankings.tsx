import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Trophy, Medal, Award } from "lucide-react";
import ComingSoonOverlay from "@/components/ComingSoonOverlay";

const Rankings = () => {
  const placeholderRankings = [
    { rank: 1, name: "Sarah Chen", score: 2450, badge: "Gold" },
    { rank: 2, name: "Alex Rodriguez", score: 2380, badge: "Silver" },
    { rank: 3, name: "Emily Johnson", score: 2290, badge: "Bronze" },
    { rank: 4, name: "Michael Kim", score: 2180, badge: "Rising Star" },
    { rank: 5, name: "Jessica Brown", score: 2120, badge: "Top Contributor" },
  ];

  const getRankIcon = (rank: number) => {
    if (rank === 1) return <Trophy className="w-5 h-5 text-yellow-500" />;
    if (rank === 2) return <Medal className="w-5 h-5 text-gray-400" />;
    if (rank === 3) return <Award className="w-5 h-5 text-amber-600" />;
    return <span className="w-5 h-5 flex items-center justify-center text-sm font-bold">#{rank}</span>;
  };

  return (
    <div className="relative min-h-screen">
      <div className="space-y-6">
        <h1 className="text-3xl font-bold text-foreground">Campus Rankings</h1>
        
        <div className="space-y-4">
          {placeholderRankings.map((student) => (
            <Card key={student.rank} className="hover-scale">
              <CardContent className="flex items-center justify-between p-6">
                <div className="flex items-center space-x-4">
                  {getRankIcon(student.rank)}
                  <div>
                    <h3 className="font-semibold text-foreground">{student.name}</h3>
                    <p className="text-sm text-muted-foreground">{student.score} points</p>
                  </div>
                </div>
                <Badge variant={student.rank <= 3 ? "default" : "secondary"}>
                  {student.badge}
                </Badge>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      <ComingSoonOverlay
        title="Student Rankings Coming Soon"
        description="Compete with fellow students, earn points through activities, and climb the leaderboard. This gamification feature is under development."
        icon={Trophy}
      />
    </div>
  );
};

export default Rankings;