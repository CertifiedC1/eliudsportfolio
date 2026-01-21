import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState, useMemo } from "react";
import { Helmet } from "react-helmet-async";
import { cn } from "@/lib/utils";

// Floating particle component
const FloatingParticle = ({ delay, duration, size, x, y }: {
  delay: number;
  duration: number;
  size: number;
  x: number;
  y: number;
}) => {
  return (
    <div
      className="absolute rounded-full bg-primary/60 animate-float"
      style={{
        width: size,
        height: size,
        left: `${x}%`,
        top: `${y}%`,
        animationDelay: `${delay}s`,
        animationDuration: `${duration}s`,
        boxShadow: '0 0 15px hsl(var(--primary) / 0.5)',
      }}
    />
  );
};

const NotFound = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isVisible, setIsVisible] = useState(false);
  const [isHovering, setIsHovering] = useState(false);

  // Generate particles with stable random values
  const particles = useMemo(() => 
    Array.from({ length: 12 }, (_, i) => ({
      id: i,
      delay: Math.random() * 3,
      duration: 4 + Math.random() * 3,
      size: 3 + Math.random() * 4,
      x: Math.random() * 100,
      y: Math.random() * 100,
    })), []
  );

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
    const timer = setTimeout(() => setIsVisible(true), 100);
    return () => clearTimeout(timer);
  }, [location.pathname]);

  const handleReturn = () => {
    navigate("/");
  };

  return (
    <>
      <Helmet>
        <title>Page Not Found | Eliud's Portfolio</title>
        <meta name="description" content="The page you're looking for doesn't exist." />
      </Helmet>
      
      <div className="relative min-h-screen overflow-hidden bg-background grain flex items-center justify-center">
        {/* Ambient background gradient */}
        <div className="absolute inset-0 bg-gradient-radial from-secondary/30 via-background to-background" />
        
        {/* Floating particles */}
        <div className="absolute inset-0 overflow-hidden">
          {particles.map((particle) => (
            <FloatingParticle key={particle.id} {...particle} />
          ))}
        </div>

        {/* Main content */}
        <div
          className={cn(
            "relative z-10 text-center px-6 py-12 max-w-lg mx-auto",
            "transition-all duration-1000 ease-out",
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          )}
        >
          {/* 404 Number with glow */}
          <div className="relative mb-8">
            <h1 
              className={cn(
                "font-display text-[120px] sm:text-[180px] md:text-[200px] font-bold",
                "text-primary text-glow leading-none tracking-tight",
                "animate-glow-pulse"
              )}
            >
              404
            </h1>
            
            {/* Glow effect behind the number */}
            <div 
              className="absolute inset-0 -z-10 blur-3xl bg-primary/20 rounded-full"
              style={{ transform: 'scale(0.8)' }}
            />
          </div>

          {/* Message */}
          <div className="space-y-4 mb-10">
            <h2 className="font-display text-2xl sm:text-3xl md:text-4xl text-foreground tracking-wide">
              Lost in the Void
            </h2>
            <p className="font-body text-muted-foreground text-base sm:text-lg max-w-md mx-auto leading-relaxed">
              The page you're seeking has vanished into the digital ether. 
              Perhaps it never existed, or maybe it's hiding in another dimension.
            </p>
          </div>

          {/* Return button */}
          <button
            onClick={handleReturn}
            onMouseEnter={() => setIsHovering(true)}
            onMouseLeave={() => setIsHovering(false)}
            className={cn(
              "relative px-8 py-4 rounded-full",
              "font-display text-sm sm:text-base tracking-widest uppercase",
              "bg-primary/10 border border-primary/40",
              "text-primary",
              "transition-all duration-500 ease-out",
              "hover:bg-primary/20 hover:border-primary/60",
              "hover:shadow-[0_0_30px_hsl(var(--primary)/0.3)]",
              "focus:outline-none focus:ring-2 focus:ring-primary/50",
              isHovering && "glow-primary"
            )}
          >
            <span className="relative z-10">Return Home</span>
            
            {/* Animated background */}
            <div 
              className={cn(
                "absolute inset-0 rounded-full bg-gradient-to-r from-primary/0 via-primary/10 to-primary/0",
                "transition-opacity duration-500",
                isHovering ? "opacity-100 animate-shimmer" : "opacity-0"
              )}
            />
          </button>

          {/* Decorative line */}
          <div className="mt-12 flex items-center justify-center gap-4">
            <div className="w-16 h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent" />
            <div className="w-2 h-2 rounded-full bg-primary/60 animate-pulse" />
            <div className="w-16 h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent" />
          </div>
        </div>
      </div>
    </>
  );
};

export default NotFound;
