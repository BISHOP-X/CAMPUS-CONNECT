import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, MapPin, Clock } from "lucide-react";
import ComingSoonOverlay from "@/components/ComingSoonOverlay";

const Events = () => {
  const placeholderEvents = [
    {
      title: "Career Fair 2024",
      date: "March 15, 2024",
      time: "10:00 AM - 4:00 PM",
      location: "Student Center",
      type: "Career",
      attendees: 150,
    },
    {
      title: "Tech Talk: AI in Education",
      date: "March 18, 2024",
      time: "2:00 PM - 3:30 PM",
      location: "Engineering Building",
      type: "Academic",
      attendees: 89,
    },
    {
      title: "Spring Mixer",
      date: "March 22, 2024",
      time: "7:00 PM - 10:00 PM",
      location: "Campus Quad",
      type: "Social",
      attendees: 200,
    },
    {
      title: "Study Abroad Info Session",
      date: "March 25, 2024",
      time: "12:00 PM - 1:00 PM",
      location: "International Center",
      type: "Information",
      attendees: 45,
    },
  ];

  return (
    <div className="relative min-h-screen">
      <div className="space-y-6">
        <h1 className="text-3xl font-bold text-foreground">Campus Events</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {placeholderEvents.map((event, index) => (
            <Card key={index} className="hover-scale">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="text-lg">{event.title}</CardTitle>
                    <div className="flex items-center space-x-4 mt-2 text-sm text-muted-foreground">
                      <div className="flex items-center space-x-1">
                        <Calendar className="w-4 h-4" />
                        <span>{event.date}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Clock className="w-4 h-4" />
                        <span>{event.time}</span>
                      </div>
                    </div>
                  </div>
                  <Badge variant="outline">{event.type}</Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-1 text-sm text-muted-foreground">
                    <MapPin className="w-4 h-4" />
                    <span>{event.location}</span>
                  </div>
                  <span className="text-sm text-muted-foreground">{event.attendees} attending</span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      <ComingSoonOverlay
        title="Events Hub Coming Soon"
        description="Discover campus events, RSVP to activities, and create your own events to connect with other students. This feature is in development."
        icon={Calendar}
      />
    </div>
  );
};

export default Events;