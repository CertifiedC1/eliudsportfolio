import { useState, useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { cn } from "@/lib/utils";
import { AnimatedText } from "@/components/AnimatedText";
import mirrorPortal from "@/assets/mirror-portal.png";

// Particle component for mirror effects
const MirrorParticle = ({ delay, duration, size, angle, distance }: {
  delay: number;
  duration: number;
  size: number;
  angle: number;
  distance: number;
}) => {
  const x = Math.cos(angle * Math.PI / 180) * distance;
  const y = Math.sin(angle * Math.PI / 180) * distance;
  
  return (
    <div
      className="absolute rounded-full bg-primary/80 animate-particle-float"
      style={{
        width: size,
        height: size,
        left: '50%',
        top: '50%',
        transform: `translate(-50%, -50%) translate(${x}px, ${y}px)`,
        animationDelay: `${delay}s`,
        animationDuration: `${duration}s`,
        boxShadow: '0 0 10px hsl(var(--primary) / 0.9), 0 0 20px hsl(var(--primary) / 0.6)',
      }}
    />
  );
};

export default function Home() {
  const navigate = useNavigate();
  const [introComplete, setIntroComplete] = useState(false);
  const [mirrorVisible, setMirrorVisible] = useState(false);
  const [textVisible, setTextVisible] = useState(false);
  const [isZooming, setIsZooming] = useState(false);
  const [fadeToBlack, setFadeToBlack] = useState(false);
  const [isHovering, setIsHovering] = useState(false);

  // Generate particles with stable random values
  const particles = useMemo(() => 
    Array.from({ length: 16 }, (_, i) => ({
      id: i,
      delay: Math.random() * 2,
      duration: 3 + Math.random() * 2,
      size: 4 + Math.random() * 5,
      angle: (i * 22.5) + Math.random() * 10,
      distance: 70 + Math.random() * 50,
    })), []
  );

  useEffect(() => {
    // Cinematic intro sequence
    const mirrorTimer = setTimeout(() => setMirrorVisible(true), 500);
    const textTimer = setTimeout(() => setTextVisible(true), 2500);
    const completeTimer = setTimeout(() => setIntroComplete(true), 4000);

    return () => {
      clearTimeout(mirrorTimer);
      clearTimeout(textTimer);
      clearTimeout(completeTimer);
    };
  }, []);

  const handleMirrorClick = () => {
    setIsZooming(true);
    // Start fade to black after a brief zoom
    setTimeout(() => setFadeToBlack(true), 800);
    // Navigate after smooth fade completes
    setTimeout(() => navigate("/about"), 2000);
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-background grain">
      {/* Fade overlay for smooth transition */}
      <div
        className={cn(
          "fixed inset-0 bg-background z-50 pointer-events-none transition-opacity duration-[1200ms] ease-in-out",
          fadeToBlack ? "opacity-100" : "opacity-0"
        )}
      />

      {/* Ambient background gradient */}
      <div className="absolute inset-0 bg-gradient-radial from-secondary/20 via-background to-background" />

      {/* Main content */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4 py-8">
        {/* Mirror Portal Container */}
        <div
          className={cn(
            "relative cursor-pointer",
            "w-[140px] h-[140px] sm:w-[200px] sm:h-[200px] md:w-[260px] md:h-[260px] lg:w-[300px] lg:h-[300px]",
            "flex items-center justify-center",
            mirrorVisible ? "opacity-100 scale-100" : "opacity-0 scale-90",
            isZooming 
              ? "transition-all duration-[1500ms] ease-out scale-[2.5]" 
              : "transition-all duration-1000",
            isHovering && !isZooming && "animate-pulse-subtle"
          )}
          onClick={handleMirrorClick}
          onMouseEnter={() => setIsHovering(true)}
          onMouseLeave={() => setIsHovering(false)}
          onTouchStart={() => setIsHovering(true)}
          onTouchEnd={() => setIsHovering(false)}
        >
          {/* Enhanced floating particles around mirror */}
          <div className={cn(
            "absolute inset-0 transition-opacity duration-500",
            introComplete ? "opacity-100" : "opacity-0"
          )}>
            {particles.map((particle) => (
              <MirrorParticle key={particle.id} {...particle} />
            ))}
          </div>

          {/* Outer glow ring - always visible, stronger */}
          <div
            className={cn(
              "absolute -inset-4 sm:-inset-6 md:-inset-8 rounded-full blur-2xl transition-all duration-500",
              "bg-gradient-radial from-primary/50 via-primary/30 to-transparent",
              "animate-glow-pulse"
            )}
          />

          {/* Middle glow ring */}
          <div
            className={cn(
              "absolute -inset-2 sm:-inset-3 md:-inset-4 rounded-full blur-xl transition-all duration-500",
              "bg-gradient-radial from-primary/60 via-primary/40 to-transparent",
              introComplete && "animate-glow-pulse",
              isHovering && "from-primary/80 via-primary/50"
            )}
            style={{ animationDelay: "0.5s" }}
          />

          {/* Inner glow effect */}
          <div
            className={cn(
              "absolute inset-[5%] rounded-full blur-lg transition-all duration-500",
              "bg-gradient-radial from-primary/50 via-primary/25 to-transparent",
              isHovering && "from-primary/70 via-primary/40"
            )}
          />

          {/* Mirror image */}
          <div className="relative w-full h-full flex items-center justify-center">
            <img
              src={mirrorPortal}
              alt="Mystical portal mirror"
              className={cn(
                "w-[85%] h-[85%] object-contain rounded-full",
                "transition-all duration-500",
                isHovering && "brightness-110 contrast-105 scale-105"
              )}
            />

            {/* Rotating ring effect on hover */}
            <div
              className={cn(
                "absolute inset-[5%] rounded-full border-2 border-primary/40",
                "transition-all duration-700",
                isHovering && "animate-spin-slow border-primary/70"
              )}
            />
            
            {/* Inner glow ring */}
            <div
              className={cn(
                "absolute inset-[15%] rounded-full",
                "bg-gradient-radial from-transparent via-primary/15 to-transparent",
                "transition-all duration-500",
                isHovering && "via-primary/30"
              )}
            />

            {/* Click hint - JUMP IN! */}
            <div
              className={cn(
                "absolute bottom-[-35px] sm:bottom-[-50px] left-1/2 -translate-x-1/2",
                "px-3 sm:px-6 py-1 sm:py-2 rounded-full",
                "bg-primary/20 backdrop-blur-sm border border-primary/30",
                "text-primary text-xs sm:text-sm md:text-base font-display tracking-widest uppercase",
                "opacity-0 transition-all duration-300 whitespace-nowrap",
                "glow-primary",
                isHovering && "opacity-100 translate-y-0",
                !isHovering && "translate-y-2"
              )}
            >
              Jump In!
            </div>
          </div>
        </div>

        {/* Text content */}
        <div
          className={cn(
            "text-center mt-8 sm:mt-16 transition-all duration-1000 px-4",
            textVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          )}
        >
          <h1 className="font-display text-2xl sm:text-4xl md:text-6xl lg:text-7xl tracking-wider text-glow text-primary mb-2 sm:mb-4">
            <AnimatedText text="Eliud's Portfolio" delay={2600} letterDelay={0.08} />
          </h1>
          <p className="font-body text-sm sm:text-lg md:text-xl text-muted-foreground tracking-wide text-center">
            <AnimatedText
              text="Web Developer • Software Engineer • IT Specialist"
              delay={3500}
              letterDelay={0.02}
            />
          </p>
        </div>

        {/* Scroll indicator */}
        <div
          className={cn(
            "absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2",
            "transition-all duration-700 delay-500",
            introComplete ? "opacity-100" : "opacity-0"
          )}
        >
          <div className="w-px h-12 bg-gradient-to-b from-primary to-transparent animate-pulse" />
        </div>
      </div>
    </div>
  );
}
