import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import UserCard from "@/components/UserCard";
import { 
  Eye, 
  Hand, 
  TrendingUp, 
  Users, 
  Camera, 
  Edit3, 
  GraduationCap, 
  Calendar, 
  Award, 
  MessageCircle, 
  MapPin,
  Star,
  BookOpen,
  Clock,
  Target,
  Zap,
  Activity,
  Brain,
  Coffee,
  FileText,
  Bell,
  Share2,
  Heart,
  MessageSquare,
  UserPlus,
  ChevronRight,
  Bookmark,
  Download,
  Upload,
  Globe,
  Sparkles,
  X,
  Check
} from "lucide-react";

const Dashboard = () => {
  // State for modals
  const [showConnectionRequests, setShowConnectionRequests] = useState(false);
  const [showActivityFeed, setShowActivityFeed] = useState(false);
  const [showCampusNews, setShowCampusNews] = useState(false);

  // Mock data for demonstration
  const connectionRequests = [
    {
      id: 1,
      name: "Sarah Chen",
      university: "MIT",
      department: "Computer Science",
      avatar: ""
    },
    {
      id: 2, 
      name: "Marcus Johnson",
      university: "Stanford University",
      department: "Engineering",
      avatar: ""
    },
    {
      id: 3,
      name: "Emily Rodriguez",
      university: "Harvard University", 
      department: "Business Administration",
      avatar: ""
    }
  ];

  const suggestions = [
    {
      id: 4,
      name: "Alex Kim",
      university: "MIT",
      department: "Computer Science",
      avatar: ""
    },
    {
      id: 5,
      name: "Jordan Smith",
      university: "MIT", 
      department: "Computer Science",
      avatar: ""
    },
    {
      id: 6,
      name: "Taylor Brown",
      university: "MIT",
      department: "Mathematics",
      avatar: ""
    },
    {
      id: 7,
      name: "Casey Wilson",
      university: "MIT",
      department: "Physics",
      avatar: ""
    }
  ];

  // Activity Feed Data
  const activityFeed = [
    {
      id: 1,
      type: "connection",
      user: "Sarah Chen",
      action: "accepted your connection request",
      time: "2 minutes ago",
      avatar: "",
      department: "Computer Science"
    },
    {
      id: 2,
      type: "study_group",
      user: "Alex Kim",
      action: "shared notes in Data Structures Study Group",
      time: "15 minutes ago",
      avatar: "",
      department: "Computer Science"
    },
    {
      id: 3,
      type: "event",
      user: "MIT CS Club",
      action: "posted a new event: React Workshop",
      time: "1 hour ago",
      avatar: "",
      department: "Computer Science"
    },
    {
      id: 4,
      type: "achievement",
      user: "You",
      action: "earned the 'Study Streak Master' badge",
      time: "2 hours ago",
      avatar: "",
      department: ""
    },
    {
      id: 5,
      type: "message",
      user: "Jordan Smith",
      action: "sent you a message about Algorithm assignment",
      time: "3 hours ago",
      avatar: "",
      department: "Computer Science"
    },
    {
      id: 6,
      type: "resource",
      user: "Taylor Brown",
      action: "shared Linear Algebra cheat sheet",
      time: "4 hours ago",
      avatar: "",
      department: "Mathematics"
    }
  ];

  // Campus News Data
  const campusNews = [
    {
      id: 1,
      title: "MIT announces new AI research lab",
      summary: "Cutting-edge facility to focus on ethical AI development",
      time: "6 hours ago",
      category: "Research"
    },
    {
      id: 2,
      title: "Spring semester registration opens",
      summary: "Early registration begins March 15th for all students",
      time: "1 day ago",
      category: "Academic"
    },
    {
      id: 3,
      title: "Career fair next week",
      summary: "50+ companies recruiting for internships and full-time",
      time: "2 days ago",
      category: "Career"
    }
  ];

  const getActivityIcon = (type: string) => {
    switch (type) {
      case "connection": return <UserPlus className="w-4 h-4 text-blue-500" />;
      case "study_group": return <Users className="w-4 h-4 text-green-500" />;
      case "event": return <Calendar className="w-4 h-4 text-purple-500" />;
      case "achievement": return <Award className="w-4 h-4 text-yellow-500" />;
      case "message": return <MessageSquare className="w-4 h-4 text-orange-500" />;
      case "resource": return <FileText className="w-4 h-4 text-indigo-500" />;
      default: return <Bell className="w-4 h-4 text-gray-500" />;
    }
  };

  const handleAcceptConnection = (id: number) => {
    console.log("Accepting connection:", id);
  };

  const handleDeclineConnection = (id: number) => {
    console.log("Declining connection:", id);
  };

  const handleConnect = (id: number) => {
    console.log("Connecting to:", id);
  };

  return (
    <div className="space-y-6">
      {/* Premium Profile Header */}
      <Card className="relative overflow-hidden border-0 shadow-lg">
        {/* Enhanced Background */}
        <div className="h-32 bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-700 relative">
          <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-black/20"></div>
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.1),transparent_50%)]"></div>
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_80%,rgba(255,255,255,0.05),transparent_50%)]"></div>
        </div>
        
        {/* Profile Content with Better Spacing */}
        <CardContent className="relative -mt-16 px-6 pb-6">
          <div className="flex flex-col md:flex-row md:items-end gap-6">
            {/* Profile Picture */}
            <div className="relative">
              <Avatar className="w-32 h-32 border-4 border-white shadow-xl ring-4 ring-white/10">
                <AvatarImage src="" alt="John Doe" />
                <AvatarFallback className="text-2xl font-bold bg-gradient-to-br from-blue-500 to-purple-600 text-white">
                  JD
                </AvatarFallback>
              </Avatar>
              <div className="absolute -bottom-1 -right-1 w-8 h-8 bg-green-500 rounded-full border-4 border-white shadow-lg flex items-center justify-center">
                <div className="w-3 h-3 bg-white rounded-full"></div>
              </div>
            </div>
            
            {/* Profile Info */}
            <div className="flex-1 min-w-0 space-y-3">
              {/* Name and Status */}
              <div className="flex flex-col sm:flex-row sm:items-center gap-3">
                <h1 className="text-3xl font-bold text-gray-900">John Doe</h1>
                <Badge variant="secondary" className="bg-green-50 text-green-700 border-green-200 w-fit">
                  <div className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse"></div>
                  Online
                </Badge>
              </div>
              
              {/* Education Info */}
              <div className="flex items-center gap-2 text-gray-600">
                <GraduationCap className="w-4 h-4 text-blue-500" />
                <span className="font-medium">Computer Science</span>
                <span className="text-gray-400">•</span>
                <span>Year 3</span>
                <span className="text-gray-400">•</span>
                <span>Massachusetts Institute of Technology</span>
              </div>
              
              {/* Stats Row */}
              <div className="flex flex-wrap items-center gap-6 text-sm">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 bg-blue-50 rounded-full flex items-center justify-center">
                    <Users className="w-4 h-4 text-blue-600" />
                  </div>
                  <div>
                    <span className="font-semibold text-gray-900">127</span>
                    <span className="text-gray-600 ml-1">connections</span>
                  </div>
                </div>
                
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 bg-yellow-50 rounded-full flex items-center justify-center">
                    <Star className="w-4 h-4 text-yellow-600" />
                  </div>
                  <div>
                    <span className="font-semibold text-gray-900">Level 8</span>
                    <Badge variant="outline" className="text-xs ml-2 border-yellow-200 text-yellow-700">
                      2,340 XP
                    </Badge>
                  </div>
                </div>
                
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 bg-purple-50 rounded-full flex items-center justify-center">
                    <Award className="w-4 h-4 text-purple-600" />
                  </div>
                  <div>
                    <span className="font-semibold text-gray-900">12</span>
                    <span className="text-gray-600 ml-1">achievements</span>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Action Buttons */}
            <div className="flex gap-3">
              <Button variant="outline" className="flex items-center gap-2 bg-white/90 hover:bg-white border-gray-200 hover:border-gray-300">
                <Edit3 className="w-4 h-4" />
                Edit Profile
              </Button>
              <Button className="flex items-center gap-2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 shadow-lg">
                <MessageCircle className="w-4 h-4" />
                Message
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Key Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Academic & Progress */}
        <Card className="hover:shadow-lg transition-all duration-300">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg font-semibold">Academic Progress</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center p-3 bg-blue-50 rounded-lg">
                <div className="text-2xl font-bold text-blue-600">3.8</div>
                <div className="text-sm text-muted-foreground">GPA</div>
              </div>
              <div className="text-center p-3 bg-orange-50 rounded-lg">
                <div className="text-2xl font-bold text-orange-600">14</div>
                <div className="text-sm text-muted-foreground">Study Streak</div>
              </div>
            </div>
            <div className="mt-4 space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">5 courses active</span>
                <Badge variant="secondary" className="text-xs">
                  <Target className="h-3 w-3 mr-1" />
                  On track
                </Badge>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">2.5 hours today</span>
                <Badge variant="secondary" className="text-xs">
                  <TrendingUp className="h-3 w-3 mr-1" />
                  Personal best!
                </Badge>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Social & Engagement */}
        <Card className="hover:shadow-lg transition-all duration-300">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg font-semibold">Campus Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center p-3 bg-green-50 rounded-lg">
                <div className="text-2xl font-bold text-green-600">28</div>
                <div className="text-sm text-muted-foreground">Interactions</div>
              </div>
              <div className="text-center p-3 bg-purple-50 rounded-lg">
                <div className="text-2xl font-bold text-purple-600">6</div>
                <div className="text-sm text-muted-foreground">Events</div>
              </div>
            </div>
            <div className="mt-4 space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">8 study groups</span>
                <Badge variant="secondary" className="text-xs">
                  <Users className="h-3 w-3 mr-1" />
                  +5 new
                </Badge>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">12 achievements</span>
                <Badge variant="secondary" className="text-xs">
                  <Star className="h-3 w-3 mr-1" />
                  Top 15%
                </Badge>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Compact Activity & News Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Recent Activity Summary */}
        <Card className="hover:shadow-lg transition-all duration-300 cursor-pointer" onClick={() => setShowActivityFeed(true)}>
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Activity className="w-5 h-5 text-blue-500" />
                Recent Activity
              </div>
              <div className="flex items-center gap-2">
                <Badge variant="secondary" className="text-xs">
                  {activityFeed.length} updates
                </Badge>
                <ChevronRight className="w-4 h-4 text-muted-foreground" />
              </div>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {activityFeed.slice(0, 3).map((activity) => (
                <div key={activity.id} className="flex items-center gap-2 p-2 rounded hover:bg-gray-50 transition-colors">
                  <div className="w-6 h-6 bg-gray-100 rounded-full flex items-center justify-center flex-shrink-0">
                    {getActivityIcon(activity.type)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-medium truncate">{activity.user}</div>
                    <div className="text-xs text-muted-foreground truncate">{activity.action}</div>
                  </div>
                  <div className="text-xs text-muted-foreground">{activity.time}</div>
                </div>
              ))}
            </div>
            <div className="mt-3 text-center">
              <Button variant="ghost" size="sm" className="text-xs">
                View All Activity
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Campus News Summary */}
        <Card className="hover:shadow-lg transition-all duration-300 cursor-pointer" onClick={() => setShowCampusNews(true)}>
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Globe className="w-5 h-5 text-green-500" />
                Campus News
              </div>
              <div className="flex items-center gap-2">
                <Badge variant="secondary" className="text-xs">
                  {campusNews.length} updates
                </Badge>
                <ChevronRight className="w-4 h-4 text-muted-foreground" />
              </div>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {campusNews.map((news) => (
                <div key={news.id} className="p-2 border rounded hover:bg-gray-50 transition-colors">
                  <div className="flex items-start justify-between mb-1">
                    <Badge variant="outline" className="text-xs">
                      {news.category}
                    </Badge>
                    <span className="text-xs text-muted-foreground">{news.time}</span>
                  </div>
                  <h4 className="font-medium text-sm mb-1 truncate">{news.title}</h4>
                  <p className="text-xs text-muted-foreground line-clamp-2">{news.summary}</p>
                </div>
              ))}
            </div>
            <div className="mt-3 text-center">
              <Button variant="ghost" size="sm" className="text-xs">
                View All News
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Compact Quick Actions */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-purple-500" />
              Quick Actions
            </div>
            <Button variant="ghost" size="sm" className="text-xs">
              More
              <ChevronRight className="w-3 h-3 ml-1" />
            </Button>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex gap-3 overflow-x-auto pb-2">
            <Button variant="outline" className="flex-shrink-0 flex items-center gap-2 h-10">
              <Users className="w-4 h-4 text-blue-500" />
              <span className="text-sm">Find Partners</span>
            </Button>
            <Button variant="outline" className="flex-shrink-0 flex items-center gap-2 h-10">
              <Calendar className="w-4 h-4 text-purple-500" />
              <span className="text-sm">Events</span>
            </Button>
            <Button variant="outline" className="flex-shrink-0 flex items-center gap-2 h-10">
              <Upload className="w-4 h-4 text-green-500" />
              <span className="text-sm">Share Notes</span>
            </Button>
            <Button variant="outline" className="flex-shrink-0 flex items-center gap-2 h-10">
              <MessageCircle className="w-4 h-4 text-orange-500" />
              <span className="text-sm">Messages</span>
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* People & Connections */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Users className="w-5 h-5 text-blue-500" />
              People
            </div>
            <div className="flex items-center gap-2">
              {connectionRequests.length > 0 && (
                <Button onClick={() => setShowConnectionRequests(true)} size="sm" variant="outline">
                  <UserPlus className="w-3 h-3 mr-1" />
                  {connectionRequests.length} Request{connectionRequests.length > 1 ? 's' : ''}
                </Button>
              )}
              <Button variant="ghost" size="sm" className="text-xs">
                View All
                <ChevronRight className="w-3 h-3 ml-1" />
              </Button>
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="text-sm font-medium text-muted-foreground">Suggested Connections</div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {suggestions.slice(0, 3).map((user) => (
                <div key={user.id} className="flex items-center gap-2 p-3 border rounded-lg hover:shadow-sm transition-shadow">
                  <Avatar className="w-8 h-8">
                    <AvatarImage src={user.avatar} alt={user.name} />
                    <AvatarFallback className="bg-gradient-to-br from-green-500 to-blue-600 text-white text-xs">
                      {user.name.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-sm truncate">{user.name}</p>
                    <p className="text-xs text-muted-foreground truncate">{user.department}</p>
                  </div>
                  <Button
                    size="sm"
                    onClick={() => handleConnect(user.id)}
                    className="h-7 px-2 text-xs"
                  >
                    Connect
                  </Button>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Connection Requests Modal */}
      {showConnectionRequests && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <Card className="w-full max-w-md max-h-[80vh] overflow-hidden">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
              <CardTitle className="flex items-center gap-2">
                <UserPlus className="w-5 h-5 text-blue-500" />
                Connection Requests
                <Badge variant="secondary">{connectionRequests.length}</Badge>
              </CardTitle>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowConnectionRequests(false)}
                className="h-8 w-8 p-0"
              >
                <X className="w-4 h-4" />
              </Button>
            </CardHeader>
            <CardContent className="overflow-y-auto max-h-[60vh]">
              <div className="space-y-4">
                {connectionRequests.map((user) => (
                  <div key={user.id} className="flex items-center gap-3 p-3 border rounded-lg">
                    <Avatar className="w-10 h-10">
                      <AvatarImage src={user.avatar} alt={user.name} />
                      <AvatarFallback className="bg-gradient-to-br from-blue-500 to-purple-600 text-white text-sm">
                        {user.name.split(' ').map(n => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-sm">{user.name}</p>
                      <p className="text-xs text-muted-foreground">{user.department}</p>
                      <p className="text-xs text-muted-foreground">{user.university}</p>
                    </div>
                    <div className="flex gap-2">
                      <Button
                        size="sm"
                        onClick={() => handleAcceptConnection(user.id)}
                        className="h-8 px-3"
                      >
                        <Check className="w-3 h-3 mr-1" />
                        Accept
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleDeclineConnection(user.id)}
                        className="h-8 px-3"
                      >
                        <X className="w-3 h-3 mr-1" />
                        Decline
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Activity Feed Modal */}
      {showActivityFeed && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <Card className="w-full max-w-2xl max-h-[80vh] overflow-hidden">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
              <CardTitle className="flex items-center gap-2">
                <Activity className="w-5 h-5 text-blue-500" />
                Recent Activity
                <Badge variant="secondary">{activityFeed.length}</Badge>
              </CardTitle>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowActivityFeed(false)}
                className="h-8 w-8 p-0"
              >
                <X className="w-4 h-4" />
              </Button>
            </CardHeader>
            <CardContent className="overflow-y-auto max-h-[60vh]">
              <div className="space-y-4">
                {activityFeed.map((activity) => (
                  <div key={activity.id} className="flex items-start gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors">
                    <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center flex-shrink-0">
                      {getActivityIcon(activity.type)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-medium text-sm">{activity.user}</span>
                        <span className="text-xs text-muted-foreground">{activity.action}</span>
                      </div>
                      {activity.department && (
                        <div className="text-xs text-muted-foreground mb-1">{activity.department}</div>
                      )}
                      <div className="text-xs text-muted-foreground">{activity.time}</div>
                    </div>
                    <div className="flex items-center gap-1">
                      <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                        <Heart className="w-3 h-3" />
                      </Button>
                      <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                        <Share2 className="w-3 h-3" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Campus News Modal */}
      {showCampusNews && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <Card className="w-full max-w-2xl max-h-[80vh] overflow-hidden">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
              <CardTitle className="flex items-center gap-2">
                <Globe className="w-5 h-5 text-green-500" />
                Campus News
                <Badge variant="secondary">{campusNews.length}</Badge>
              </CardTitle>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowCampusNews(false)}
                className="h-8 w-8 p-0"
              >
                <X className="w-4 h-4" />
              </Button>
            </CardHeader>
            <CardContent className="overflow-y-auto max-h-[60vh]">
              <div className="space-y-4">
                {campusNews.map((news) => (
                  <div key={news.id} className="p-4 border rounded-lg hover:shadow-sm transition-shadow">
                    <div className="flex items-start justify-between mb-3">
                      <Badge variant="outline" className="text-xs">
                        {news.category}
                      </Badge>
                      <span className="text-xs text-muted-foreground">{news.time}</span>
                    </div>
                    <h4 className="font-medium text-lg mb-2">{news.title}</h4>
                    <p className="text-sm text-muted-foreground mb-4">{news.summary}</p>
                    <div className="flex items-center gap-2">
                      <Button variant="default" size="sm" className="text-xs">
                        Read Full Article
                      </Button>
                      <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                        <Bookmark className="w-4 h-4" />
                      </Button>
                      <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                        <Share2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      )}

    </div>
  );
};

export default Dashboard;