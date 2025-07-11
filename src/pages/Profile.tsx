import { useState } from "react";
import { useParams } from "react-router-dom";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import MilestoneBadge from "@/components/MilestoneBadge";
import { UserPlus, Hand, MessageSquare, MapPin, Calendar, Edit3, Check, X } from "lucide-react";

const Profile = () => {
  const { username } = useParams();
  const [connectionStatus, setConnectionStatus] = useState<"connect" | "pending" | "connected">("connect");
  const [isEditingBio, setIsEditingBio] = useState(false);
  const [isEditingCurrentWork, setIsEditingCurrentWork] = useState(false);
  const [bio, setBio] = useState("Passionate computer science student interested in AI and machine learning. Love collaborating on innovative projects and always eager to learn new technologies.");
  const [currentWork, setCurrentWork] = useState("Building a machine learning model for campus sentiment analysis");
  const [tempBio, setTempBio] = useState(bio);
  const [tempCurrentWork, setTempCurrentWork] = useState(currentWork);

  // Mock user data
  const userProfile = {
    name: "Sarah Chen",
    username: "sarah_chen_cs",
    university: "MIT",
    department: "Computer Science",
    avatar: "https://images.unsplash.com/photo-1649972904349-6e44c42644a7?w=150&h=150&fit=crop&crop=face",
    joinDate: "September 2023",
    location: "Cambridge, MA",
    year: "Junior"
  };

  const milestones = [
    {
      type: "academic" as const,
      title: "Dean's List",
      description: "Achieved academic excellence",
      earnedDate: "Fall 2023"
    },
    {
      type: "social" as const,
      title: "Super Connector",
      description: "Made 50+ campus connections",
      earnedDate: "March 2024"
    },
    {
      type: "leadership" as const,
      title: "Study Group Leader",
      description: "Led 10+ study sessions",
      earnedDate: "February 2024"
    },
    {
      type: "achievement" as const,
      title: "Hackathon Winner",
      description: "1st place at MIT Hackathon",
      earnedDate: "November 2023"
    }
  ];

  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  };

  const handleConnect = () => {
    if (connectionStatus === "connect") {
      setConnectionStatus("pending");
    } else if (connectionStatus === "pending") {
      setConnectionStatus("connected");
    }
  };

  const handleWave = () => {
    console.log("Wave sent to", userProfile.name);
  };

  const handleMessage = () => {
    console.log("Opening message with", userProfile.name);
  };

  const getConnectionButtonText = () => {
    switch (connectionStatus) {
      case "connect":
        return "Connect";
      case "pending":
        return "Pending";
      case "connected":
        return "Connected";
      default:
        return "Connect";
    }
  };

  const getConnectionButtonClass = () => {
    switch (connectionStatus) {
      case "connect":
        return "btn-primary";
      case "pending":
        return "bg-amber-500 hover:bg-amber-600 text-white";
      case "connected":
        return "bg-green-500 hover:bg-green-600 text-white";
      default:
        return "btn-primary";
    }
  };

  const saveBio = () => {
    setBio(tempBio);
    setIsEditingBio(false);
  };

  const cancelBioEdit = () => {
    setTempBio(bio);
    setIsEditingBio(false);
  };

  const saveCurrentWork = () => {
    setCurrentWork(tempCurrentWork);
    setIsEditingCurrentWork(false);
  };

  const cancelCurrentWorkEdit = () => {
    setTempCurrentWork(currentWork);
    setIsEditingCurrentWork(false);
  };

  return (
    <div className="space-y-6">
      {/* Profile Header */}
      <div>
        <h1 className="text-3xl font-bold text-foreground mb-2">{userProfile.name}&apos;s Profile</h1>
        <p className="text-muted-foreground">Connect and learn more about {userProfile.name}</p>
      </div>

      {/* Main Profile Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column - Main Profile Info */}
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardContent className="p-6">
              {/* Profile Header */}
              <div className="flex flex-col sm:flex-row items-start space-y-4 sm:space-y-0 sm:space-x-6 mb-6">
                <Avatar className="h-24 w-24 border-4 border-primary/20">
                  <AvatarImage src={userProfile.avatar} alt={userProfile.name} />
                  <AvatarFallback className="bg-primary text-primary-foreground text-xl font-bold">
                    {getInitials(userProfile.name)}
                  </AvatarFallback>
                </Avatar>
                
                <div className="flex-1">
                  <h2 className="text-2xl font-bold text-foreground mb-1">{userProfile.name}</h2>
                  <p className="text-lg text-primary font-medium mb-1">{userProfile.department}</p>
                  <p className="text-muted-foreground mb-3">{userProfile.university}</p>
                  
                  <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground mb-4">
                    <div className="flex items-center space-x-1">
                      <MapPin className="h-4 w-4" />
                      <span>{userProfile.location}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Calendar className="h-4 w-4" />
                      <span>Joined {userProfile.joinDate}</span>
                    </div>
                    <Badge variant="secondary">{userProfile.year}</Badge>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex flex-wrap gap-3">
                    <Button
                      onClick={handleConnect}
                      className={`${getConnectionButtonClass()} btn-smooth transition-[var(--transition-smooth)]`}
                      disabled={connectionStatus === "pending"}
                    >
                      <UserPlus className="w-4 h-4 mr-2" />
                      {getConnectionButtonText()}
                    </Button>
                    
                    <Button
                      variant="outline"
                      onClick={handleWave}
                      className="btn-smooth"
                    >
                      <Hand className="w-4 h-4 mr-2" />
                      Wave
                    </Button>

                    {connectionStatus === "connected" && (
                      <Button
                        variant="outline"
                        onClick={handleMessage}
                        className="btn-smooth"
                      >
                        <MessageSquare className="w-4 h-4 mr-2" />
                        Message
                      </Button>
                    )}
                  </div>
                </div>
              </div>

              {/* Bio Section */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold text-foreground">About</h3>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setIsEditingBio(true)}
                    className="text-muted-foreground hover:text-foreground"
                  >
                    <Edit3 className="w-4 h-4" />
                  </Button>
                </div>
                
                {isEditingBio ? (
                  <div className="space-y-3">
                    <Textarea
                      value={tempBio}
                      onChange={(e) => setTempBio(e.target.value)}
                      placeholder="Tell others about yourself..."
                      className="min-h-[100px] auth-input"
                    />
                    <div className="flex space-x-2">
                      <Button size="sm" onClick={saveBio} className="btn-primary">
                        <Check className="w-3 h-3 mr-1" />
                        Save
                      </Button>
                      <Button size="sm" variant="outline" onClick={cancelBioEdit}>
                        <X className="w-3 h-3 mr-1" />
                        Cancel
                      </Button>
                    </div>
                  </div>
                ) : (
                  <p className="text-muted-foreground leading-relaxed">{bio}</p>
                )}
              </div>

              {/* Currently Working On */}
              <div className="space-y-4 pt-6 border-t border-border">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold text-foreground">Currently Working On</h3>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setIsEditingCurrentWork(true)}
                    className="text-muted-foreground hover:text-foreground"
                  >
                    <Edit3 className="w-4 h-4" />
                  </Button>
                </div>
                
                {isEditingCurrentWork ? (
                  <div className="space-y-3">
                    <Textarea
                      value={tempCurrentWork}
                      onChange={(e) => setTempCurrentWork(e.target.value)}
                      placeholder="What are you working on right now?"
                      className="min-h-[80px] auth-input"
                    />
                    <div className="flex space-x-2">
                      <Button size="sm" onClick={saveCurrentWork} className="btn-primary">
                        <Check className="w-3 h-3 mr-1" />
                        Save
                      </Button>
                      <Button size="sm" variant="outline" onClick={cancelCurrentWorkEdit}>
                        <X className="w-3 h-3 mr-1" />
                        Cancel
                      </Button>
                    </div>
                  </div>
                ) : (
                  <div className="bg-muted/50 rounded-lg p-4">
                    <p className="text-foreground font-medium">{currentWork}</p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Milestone Badges */}
          <Card>
            <CardHeader>
              <CardTitle>Achievements & Milestones</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {milestones.map((milestone, index) => (
                  <MilestoneBadge
                    key={index}
                    type={milestone.type}
                    title={milestone.title}
                    description={milestone.description}
                    earnedDate={milestone.earnedDate}
                  />
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right Column - Activity & Details */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Activity Overview</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="text-center py-8">
                <div className="text-muted-foreground">
                  <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
                    <UserPlus className="h-8 w-8" />
                  </div>
                  <p className="font-medium">Activity Feed</p>
                  <p className="text-sm">Coming soon - see recent connections, posts, and campus activities</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Quick Stats</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">Connections</span>
                <Badge variant="secondary">42</Badge>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">Profile Views</span>
                <Badge variant="secondary">128</Badge>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">Waves Sent</span>
                <Badge variant="secondary">23</Badge>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">Study Groups</span>
                <Badge variant="secondary">5</Badge>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Profile;