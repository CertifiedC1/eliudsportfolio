import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { cn } from "@/lib/utils";
import { AnimatedText } from "@/components/AnimatedText";
import mirrorPortal from "@/assets/mirror-portal.png";
import silhouette from "@/assets/silhouette.png";

export default function Home() {
  const navigate = useNavigate();
  const [introComplete, setIntroComplete] = useState(false);
  const [mirrorVisible, setMirrorVisible] = useState(false);
  const [silhouetteVisible, setSilhouetteVisible] = useState(false);
  const [textVisible, setTextVisible] = useState(false);
  const [isZooming, setIsZooming] = useState(false);
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    // Cinematic intro sequence
    const mirrorTimer = setTimeout(() => setMirrorVisible(true), 500);
    const silhouetteTimer = setTimeout(() => setSilhouetteVisible(true), 1500);
    const textTimer = setTimeout(() => setTextVisible(true), 2500);
    const completeTimer = setTimeout(() => setIntroComplete(true), 4000);

    return () => {
      clearTimeout(mirrorTimer);
      clearTimeout(silhouetteTimer);
      clearTimeout(textTimer);
      clearTimeout(completeTimer);
    };
  }, []);

  const handleMirrorClick = () => {
    setIsZooming(true);
    setTimeout(() => navigate("/about"), 800);
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-background grain">
      {/* Ambient background gradient */}
      <div className="absolute inset-0 bg-gradient-radial from-secondary/20 via-background to-background" />

      {/* Main content */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4">
        {/* Mirror Portal Container - Fixed containment */}
        <div
          className={cn(
            "relative cursor-pointer transition-all duration-1000",
            "w-[280px] h-[280px] sm:w-[350px] sm:h-[350px] md:w-[450px] md:h-[450px] lg:w-[500px] lg:h-[500px]",
            "flex items-center justify-center",
            mirrorVisible ? "opacity-100 scale-100" : "opacity-0 scale-90",
            isZooming && "scale-[3] opacity-0"
          )}
          onClick={handleMirrorClick}
          onMouseEnter={() => setIsHovering(true)}
          onMouseLeave={() => setIsHovering(false)}
        >
          {/* Mirror glow effect - contained within parent */}
          <div
            className={cn(
              "absolute inset-0 rounded-full blur-2xl transition-all duration-500",
              "bg-gradient-radial from-primary/40 via-primary/20 to-transparent",
              introComplete && "animate-glow-pulse"
            )}
          />

          {/* Mirror image - contained */}
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

            {/* Silhouette overlay - positioned relative to mirror */}
            <img
              src={silhouette}
              alt="Contemplative silhouette"
              className={cn(
                "absolute bottom-[5%] left-1/2 -translate-x-1/2",
                "w-[50%] h-auto object-contain",
                "transition-all duration-1000",
                silhouetteVisible ? "opacity-70" : "opacity-0",
                introComplete && "animate-float"
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
            "text-center mt-16 transition-all duration-1000",
            textVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          )}
        >
          <h1 className="font-display text-3xl sm:text-4xl md:text-6xl lg:text-7xl tracking-wider text-glow text-primary mb-4">
            <AnimatedText text="Eliud's Portfolio" delay={2600} letterDelay={0.08} />
          </h1>
          <p className="font-body text-base sm:text-lg md:text-xl text-muted-foreground tracking-wide">
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
          <span className="text-muted-foreground text-xs font-body tracking-widest uppercase">
            Explore
          </span>
          <div className="w-px h-12 bg-gradient-to-b from-primary to-transparent animate-pulse" />
        </div>
      </div>
    </div>
  );
}
