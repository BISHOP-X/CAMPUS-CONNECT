import { Link } from "react-router-dom";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Check, X, UserPlus } from "lucide-react";

interface UserCardProps {
  name: string;
  university: string;
  department: string;
  avatar?: string;
  username?: string;
  showConnectionButtons?: boolean;
  showConnectButton?: boolean;
  onAccept?: () => void;
  onDecline?: () => void;
  onConnect?: () => void;
  className?: string;
  clickable?: boolean;
}

const UserCard = ({
  name,
  university,
  department,
  avatar,
  username,
  showConnectionButtons = false,
  showConnectButton = false,
  onAccept,
  onDecline,
  onConnect,
  className = "",
  clickable = true
}: UserCardProps) => {
  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  };

  const generateUsername = (name: string) => {
    return name.toLowerCase().replace(/\s+/g, '_') + '_' + Math.random().toString(36).substr(2, 4);
  };

  const userUrl = `/profile/${username || generateUsername(name)}`;

  const cardContent = (
    <CardContent className="p-4">
      <div className="flex items-start space-x-3">
        <Avatar className="h-12 w-12 border-2 border-border">
          <AvatarImage src={avatar} alt={name} />
          <AvatarFallback className="bg-primary text-primary-foreground font-medium">
            {getInitials(name)}
          </AvatarFallback>
        </Avatar>
        
        <div className="flex-1 min-w-0">
          <h3 className="font-semibold text-foreground text-sm leading-tight hover:text-primary transition-colors">
            {name}
          </h3>
          <p className="text-xs text-muted-foreground mt-1">{university}</p>
          <p className="text-xs text-muted-foreground">{department}</p>
        </div>
      </div>

      {/* Connection Request Buttons */}
      {showConnectionButtons && (
        <div className="flex space-x-2 mt-4">
          <Button 
            size="sm" 
            onClick={onAccept}
            className="flex-1 btn-primary btn-smooth h-8 text-xs"
          >
            <Check className="w-3 h-3 mr-1" />
            Accept
          </Button>
          <Button 
            size="sm" 
            variant="outline"
            onClick={onDecline}
            className="flex-1 btn-smooth h-8 text-xs border-destructive text-destructive hover:bg-destructive hover:text-destructive-foreground"
          >
            <X className="w-3 h-3 mr-1" />
            Decline
          </Button>
        </div>
      )}

      {/* Connect Button */}
      {showConnectButton && (
        <div className="mt-4">
          <Button 
            size="sm" 
            variant="outline"
            onClick={onConnect}
            className="w-full btn-smooth h-8 text-xs"
          >
            <UserPlus className="w-3 h-3 mr-1" />
            Connect
          </Button>
        </div>
      )}
    </CardContent>
  );

  const card = (
    <Card className={`hover:shadow-[var(--shadow-card)] transition-[var(--transition-smooth)] hover:-translate-y-1 ${className}`}>
      {cardContent}
    </Card>
  );

  if (clickable && !showConnectionButtons && !showConnectButton) {
    return (
      <Link to={userUrl} className="block">
        {card}
      </Link>
    );
  }

  return card;
};

export default UserCard;