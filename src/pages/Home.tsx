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
      className="absolute rounded-full bg-primary/60 animate-particle-float"
      style={{
        width: size,
        height: size,
        left: '50%',
        top: '50%',
        transform: `translate(-50%, -50%) translate(${x}px, ${y}px)`,
        animationDelay: `${delay}s`,
        animationDuration: `${duration}s`,
        boxShadow: '0 0 6px hsl(var(--primary) / 0.8)',
      }}
    />
  );
};

export default function Home() {
  const navigate = useNavigate();
  const [introComplete, setIntroComplete] = useState(false);
  const [mirrorVisible, setMirrorVisible] = useState(false);
  const [textVisible, setTextVisible] = useState(false);
  const [isEntering, setIsEntering] = useState(false);
  const [isHovering, setIsHovering] = useState(false);

  // Generate particles with stable random values
  const particles = useMemo(() => 
    Array.from({ length: 12 }, (_, i) => ({
      id: i,
      delay: Math.random() * 2,
      duration: 3 + Math.random() * 2,
      size: 3 + Math.random() * 4,
      angle: (i * 30) + Math.random() * 15,
      distance: 80 + Math.random() * 40,
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
    if (isEntering) return;
    setIsEntering(true);
    // Navigate after the zoom animation completes smoothly
    setTimeout(() => navigate("/about"), 1800);
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-background grain">
      {/* Seamless white/light transition overlay - appears as if entering the mirror's light */}
      <div
        className={cn(
          "fixed inset-0 z-50 pointer-events-none",
          "bg-gradient-radial from-primary/90 via-primary/60 to-background",
          "transition-opacity ease-in-out",
          isEntering ? "opacity-100 duration-[1500ms] delay-300" : "opacity-0 duration-300"
        )}
      />

      {/* Ambient background gradient */}
      <div className="absolute inset-0 bg-gradient-radial from-secondary/20 via-background to-background" />

      {/* Main content */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4">
        {/* Mirror Portal Container */}
        <div
          className={cn(
            "relative cursor-pointer",
            "w-[140px] h-[140px] sm:w-[180px] sm:h-[180px] md:w-[220px] md:h-[220px] lg:w-[260px] lg:h-[260px]",
            "flex items-center justify-center",
            mirrorVisible ? "opacity-100 scale-100" : "opacity-0 scale-90",
            "transition-all duration-1000",
            // Entering animation - smooth zoom that fills the screen
            isEntering && "scale-[8] duration-[1800ms] ease-[cubic-bezier(0.4,0,0.2,1)]",
            // Hover breathing effect
            isHovering && !isEntering && "animate-pulse-subtle"
          )}
          onClick={handleMirrorClick}
          onMouseEnter={() => setIsHovering(true)}
          onMouseLeave={() => setIsHovering(false)}
        >
          {/* Floating particles around mirror */}
          <div className={cn(
            "absolute inset-0 transition-opacity duration-500",
            introComplete && !isEntering ? "opacity-100" : "opacity-0"
          )}>
            {particles.map((particle) => (
              <MirrorParticle key={particle.id} {...particle} />
            ))}
          </div>

          {/* Outer ripple/pulse ring on hover */}
          <div
            className={cn(
              "absolute inset-[-20%] rounded-full",
              "border border-primary/20",
              "transition-all duration-700",
              isHovering && !isEntering && "animate-ripple-pulse",
              isEntering && "opacity-0"
            )}
          />

          {/* Mirror glow effect - intensifies on hover */}
          <div
            className={cn(
              "absolute inset-[5%] rounded-full blur-2xl transition-all duration-500",
              "bg-gradient-radial from-primary/40 via-primary/20 to-transparent",
              introComplete && "animate-glow-pulse",
              isHovering && "from-primary/70 via-primary/40 blur-3xl",
              isEntering && "from-primary/100 via-primary/80 blur-[60px]"
            )}
          />

          {/* Soft blur pulse around edges on hover */}
          <div
            className={cn(
              "absolute inset-[-10%] rounded-full transition-all duration-500",
              "bg-gradient-radial from-transparent via-primary/10 to-transparent",
              isHovering && !isEntering && "animate-blur-pulse via-primary/30",
              isEntering && "opacity-0"
            )}
          />

          {/* Mirror image container with distortion effect */}
          <div className={cn(
            "relative w-full h-full flex items-center justify-center",
            "transition-all duration-500",
            isHovering && !isEntering && "animate-mirror-distort"
          )}>
            <img
              src={mirrorPortal}
              alt="Mystical portal mirror"
              className={cn(
                "w-[85%] h-[85%] object-contain rounded-full",
                "transition-all duration-500",
                isHovering && "brightness-125 contrast-105 scale-105",
                isEntering && "brightness-200 scale-150"
              )}
            />

            {/* Rotating ring effect on hover */}
            <div
              className={cn(
                "absolute inset-[5%] rounded-full border-2 border-primary/30",
                "transition-all duration-700",
                isHovering && !isEntering && "animate-spin-slow border-primary/60",
                isEntering && "opacity-0"
              )}
            />
            
            {/* Inner glow ring - ripple effect */}
            <div
              className={cn(
                "absolute inset-[15%] rounded-full",
                "bg-gradient-radial from-transparent via-primary/10 to-transparent",
                "transition-all duration-500",
                isHovering && "via-primary/25 animate-inner-ripple",
                isEntering && "via-primary/60"
              )}
            />

            {/* Click hint - JUMP IN! */}
            <div
              className={cn(
                "absolute bottom-[-50px] left-1/2 -translate-x-1/2",
                "px-6 py-2 rounded-full",
                "bg-primary/20 backdrop-blur-sm border border-primary/30",
                "text-primary text-sm md:text-base font-display tracking-widest uppercase",
                "opacity-0 transition-all duration-300",
                isHovering && !isEntering && "opacity-100 translate-y-0",
                !isHovering && "translate-y-2",
                isEntering && "opacity-0"
              )}
            >
              Jump In!
            </div>
          </div>
        </div>

        {/* Text content - fades out when entering */}
        <div
          className={cn(
            "text-center mt-12 transition-all duration-700",
            textVisible && !isEntering ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8",
            isEntering && "opacity-0 -translate-y-10"
          )}
        >
          <h1 className="font-display text-2xl sm:text-3xl md:text-5xl lg:text-6xl tracking-wider text-glow text-primary mb-4">
            <AnimatedText text="Eliud's Portfolio" delay={2600} letterDelay={0.08} />
          </h1>
          <p className="font-body text-sm sm:text-base md:text-lg text-muted-foreground tracking-wide">
            <AnimatedText
              text="Web Developer • Software Engineer • IT Specialist"
              delay={3500}
              letterDelay={0.02}
            />
          </p>
        </div>

        {/* Scroll indicator - fades out when entering */}
        <div
          className={cn(
            "absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2",
            "transition-all duration-700 delay-500",
            introComplete && !isEntering ? "opacity-100" : "opacity-0"
          )}
        >
          <div className="w-px h-12 bg-gradient-to-b from-primary to-transparent animate-pulse" />
        </div>
      </div>
    </div>
  );
}
