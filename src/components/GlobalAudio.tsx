import { useRef, useState } from "react";
import { Volume2, VolumeX } from "lucide-react";
import { cn } from "@/lib/utils";

export function GlobalAudio() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const toggleAudio = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
        setIsPlaying(false);
      } else {
        videoRef.current.volume = 0.4;
        videoRef.current.play()
          .then(() => {
            setIsPlaying(true);
          })
          .catch((err) => {
            console.log("Audio play error:", err);
          });
      }
    }
  };

  return (
    <>
      {/* Hidden video element for audio playback */}
      <video
        ref={videoRef}
        src="/videos/about-bg.mp4"
        loop
        playsInline
        preload="auto"
        className="hidden"
      />
      <button
        onClick={toggleAudio}
        className={cn(
          "fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50 w-10 h-10 sm:w-12 sm:h-12 rounded-full",
          "bg-secondary/80 backdrop-blur-md border border-border/50",
          "flex items-center justify-center",
          "hover:bg-primary/20 hover:scale-110 transition-all duration-300",
          "group shadow-lg glow-primary",
          isPlaying && "animate-pulse-subtle"
        )}
        aria-label={isPlaying ? "Mute audio" : "Unmute audio"}
      >
        {isPlaying ? (
          <Volume2 className="w-4 h-4 sm:w-5 sm:h-5 text-primary group-hover:scale-110 transition-transform" />
        ) : (
          <VolumeX className="w-4 h-4 sm:w-5 sm:h-5 text-muted-foreground group-hover:text-primary transition-colors" />
        )}
      </button>
    </>
  );
}
