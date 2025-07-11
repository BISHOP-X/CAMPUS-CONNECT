import { Rocket } from "lucide-react";

interface ComingSoonOverlayProps {
  title: string;
  description: string;
  icon?: React.ComponentType<{ className?: string }>;
}

const ComingSoonOverlay = ({ 
  title, 
  description, 
  icon: Icon = Rocket 
}: ComingSoonOverlayProps) => {
  return (
    <div className="absolute inset-0 bg-background/80 backdrop-blur-sm z-10 flex items-center justify-center">
      <div className="text-center space-y-4 max-w-md mx-auto px-6">
        <div className="flex justify-center">
          <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
            <Icon className="w-8 h-8 text-primary" />
          </div>
        </div>
        <h2 className="text-2xl font-bold text-foreground">{title}</h2>
        <p className="text-muted-foreground leading-relaxed">{description}</p>
      </div>
    </div>
  );
};

export default ComingSoonOverlay;