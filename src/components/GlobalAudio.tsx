import { useEffect, useRef, useState } from "react";
import { Volume2, VolumeX } from "lucide-react";
import { cn } from "@/lib/utils";

export function GlobalAudio() {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);

  useEffect(() => {
    const handleFirstInteraction = () => {
      if (!hasInteracted && audioRef.current) {
        audioRef.current.play().then(() => {
          setIsPlaying(true);
          setHasInteracted(true);
        }).catch(() => {
          // Autoplay blocked, user needs to click
        });
      }
    };

    // Try to play on first user interaction
    document.addEventListener("click", handleFirstInteraction, { once: true });
    
    return () => {
      document.removeEventListener("click", handleFirstInteraction);
    };
  }, [hasInteracted]);

  const toggleAudio = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
        setIsPlaying(false);
      } else {
        audioRef.current.play().then(() => {
          setIsPlaying(true);
          setHasInteracted(true);
        });
      }
    }
  };

  return (
    <>
      <audio
        ref={audioRef}
        src="/videos/about-bg.mp4"
        loop
        className="hidden"
      />
      <button
        onClick={toggleAudio}
        className={cn(
          "fixed bottom-6 right-6 z-50 w-12 h-12 rounded-full",
          "bg-secondary/80 backdrop-blur-md border border-border/50",
          "flex items-center justify-center",
          "hover:bg-primary/20 hover:scale-110 transition-all duration-300",
          "group shadow-lg"
        )}
        aria-label={isPlaying ? "Mute audio" : "Unmute audio"}
      >
        {isPlaying ? (
          <Volume2 className="w-5 h-5 text-primary group-hover:scale-110 transition-transform" />
        ) : (
          <VolumeX className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
        )}
      </button>
    </>
  );
}
