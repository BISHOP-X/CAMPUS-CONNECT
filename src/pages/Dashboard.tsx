import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import UserCard from "@/components/UserCard";
import { Eye, Hand, TrendingUp, Users } from "lucide-react";

const Dashboard = () => {
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
      {/* Welcome Header */}
      <div>
        <h1 className="text-3xl font-bold text-foreground mb-2">Welcome, John!</h1>
        <p className="text-muted-foreground">Here's what's happening in your campus community today.</p>
      </div>

      {/* Activity Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Activity Card */}
        <Card className="hover:shadow-[var(--shadow-card)] transition-[var(--transition-smooth)]">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Profile Activity</CardTitle>
            <Eye className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-primary">7</div>
            <p className="text-xs text-muted-foreground">new profile views</p>
            <div className="mt-2">
              <Badge variant="secondary" className="text-xs">
                <TrendingUp className="h-3 w-3 mr-1" />
                +12% from last week
              </Badge>
            </div>
          </CardContent>
        </Card>

        {/* Waves Card */}
        <Card className="hover:shadow-[var(--shadow-card)] transition-[var(--transition-smooth)]">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">New Waves</CardTitle>
            <Hand className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-primary">3</div>
            <p className="text-xs text-muted-foreground">students waved at you</p>
            <div className="mt-2">
              <Badge variant="secondary" className="text-xs">
                New this week
              </Badge>
            </div>
          </CardContent>
        </Card>

        {/* Connections Card */}
        <Card className="hover:shadow-[var(--shadow-card)] transition-[var(--transition-smooth)]">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Connections</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-primary">42</div>
            <p className="text-xs text-muted-foreground">campus connections</p>
            <div className="mt-2">
              <Badge variant="secondary" className="text-xs">
                +3 this week
              </Badge>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Connection Requests */}
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              Connection Requests
              <Badge variant="secondary">{connectionRequests.length}</Badge>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {connectionRequests.map((user) => (
              <UserCard
                key={user.id}
                name={user.name}
                university={user.university}
                department={user.department}
                avatar={user.avatar}
                showConnectionButtons={true}
                onAccept={() => handleAcceptConnection(user.id)}
                onDecline={() => handleDeclineConnection(user.id)}
              />
            ))}
          </CardContent>
        </Card>

        {/* Suggestions */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Students You Might Know</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {suggestions.map((user) => (
                <UserCard
                  key={user.id}
                  name={user.name}
                  university={user.university}
                  department={user.department}
                  avatar={user.avatar}
                  showConnectButton={true}
                  onConnect={() => handleConnect(user.id)}
                />
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;