import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Users2 } from "lucide-react";
import ComingSoonOverlay from "@/components/ComingSoonOverlay";

const Groups = () => {
  const placeholderGroups = [
    { name: "Computer Science Students", members: 245, type: "Academic" },
    { name: "Campus Photography Club", members: 89, type: "Interest" },
    { name: "Study Abroad 2024", members: 156, type: "Program" },
    { name: "Engineering Society", members: 312, type: "Academic" },
    { name: "International Students", members: 78, type: "Community" },
    { name: "Debate Club", members: 67, type: "Interest" },
  ];

  return (
    <div className="relative min-h-screen">
      <div className="space-y-6">
        <h1 className="text-3xl font-bold text-foreground">Groups</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {placeholderGroups.map((group, index) => (
            <Card key={index} className="hover-scale">
              <CardHeader>
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                    <Users2 className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <CardTitle className="text-lg">{group.name}</CardTitle>
                    <p className="text-sm text-muted-foreground">{group.members} members</p>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <Badge variant="secondary">{group.type}</Badge>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      <ComingSoonOverlay
        title="Study Groups Coming Soon"
        description="Connect with students in your courses, join study groups, and collaborate on projects. This feature is currently in development."
      />
    </div>
  );
};

export default Groups;