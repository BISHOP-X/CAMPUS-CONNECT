import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { BookOpen, FileText, Video, Download } from "lucide-react";
import ComingSoonOverlay from "@/components/ComingSoonOverlay";

const Resources = () => {
  const placeholderResources = [
    {
      title: "Calculus I Study Guide",
      type: "PDF",
      subject: "Mathematics",
      downloads: 234,
      icon: FileText,
    },
    {
      title: "Chemistry Lab Techniques",
      type: "Video",
      subject: "Chemistry",
      downloads: 156,
      icon: Video,
    },
    {
      title: "Programming Fundamentals",
      type: "Document",
      subject: "Computer Science",
      downloads: 445,
      icon: BookOpen,
    },
    {
      title: "Essay Writing Workshop",
      type: "PDF",
      subject: "English",
      downloads: 189,
      icon: FileText,
    },
    {
      title: "Physics Problem Sets",
      type: "Document",
      subject: "Physics",
      downloads: 167,
      icon: BookOpen,
    },
    {
      title: "Statistics Cheat Sheet",
      type: "PDF",
      subject: "Mathematics",
      downloads: 298,
      icon: FileText,
    },
  ];

  return (
    <div className="relative min-h-screen">
      <div className="space-y-6">
        <h1 className="text-3xl font-bold text-foreground">Study Resources</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {placeholderResources.map((resource, index) => (
            <Card key={index} className="hover-scale">
              <CardHeader>
                <div className="flex items-start space-x-3">
                  <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                    <resource.icon className="w-5 h-5 text-primary" />
                  </div>
                  <div className="flex-1">
                    <CardTitle className="text-lg leading-tight">{resource.title}</CardTitle>
                    <div className="flex items-center space-x-2 mt-2">
                      <Badge variant="secondary">{resource.subject}</Badge>
                      <Badge variant="outline">{resource.type}</Badge>
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex items-center space-x-1 text-sm text-muted-foreground">
                  <Download className="w-4 h-4" />
                  <span>{resource.downloads} downloads</span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      <ComingSoonOverlay
        title="Resource Library Coming Soon"
        description="Access shared study materials, upload your own resources, and collaborate on academic content with your peers. This feature is under development."
        icon={BookOpen}
      />
    </div>
  );
};

export default Resources;