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
        {/* Mirror Portal Container */}
        <div
          className={cn(
            "relative cursor-pointer transition-all duration-1000",
            mirrorVisible ? "opacity-100 scale-100" : "opacity-0 scale-90",
            isZooming && "animate-zoom-portal"
          )}
          onClick={handleMirrorClick}
        >
          {/* Mirror glow effect */}
          <div
            className={cn(
              "absolute inset-0 rounded-full blur-3xl transition-all duration-500",
              "bg-gradient-radial from-primary/30 via-primary/10 to-transparent",
              introComplete && "animate-glow-pulse"
            )}
            style={{ transform: "scale(1.3)" }}
          />

          {/* Mirror image */}
          <div className="relative group">
            <img
              src={mirrorPortal}
              alt="Mystical portal mirror"
              className={cn(
                "w-[300px] md:w-[450px] lg:w-[550px] h-auto rounded-full",
                "mirror-distort transition-all duration-500",
                "group-hover:brightness-110 group-hover:contrast-105"
              )}
            />

            {/* Silhouette overlay */}
            <img
              src={silhouette}
              alt="Contemplative silhouette"
              className={cn(
                "absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-[10%]",
                "w-[180px] md:w-[250px] lg:w-[300px] h-auto",
                "transition-all duration-1000",
                silhouetteVisible ? "opacity-80" : "opacity-0",
                introComplete && "animate-float"
              )}
            />

            {/* Click hint */}
            <div
              className={cn(
                "absolute bottom-[-60px] left-1/2 -translate-x-1/2",
                "text-muted-foreground text-sm font-body tracking-wider",
                "opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              )}
            >
              Click to enter
            </div>
          </div>
        </div>

        {/* Text content */}
        <div
          className={cn(
            "text-center mt-12 transition-all duration-1000",
            textVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          )}
        >
          <h1 className="font-display text-4xl md:text-6xl lg:text-7xl tracking-wider text-glow text-primary mb-4">
            <AnimatedText text="Eliud's Portfolio" delay={2600} letterDelay={0.08} />
          </h1>
          <p className="font-body text-lg md:text-xl text-muted-foreground tracking-wide">
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
