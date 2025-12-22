import { useRef, useState } from "react";
import { Volume2, VolumeX } from "lucide-react";
import { cn } from "@/lib/utils";

export function GlobalAudio() {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const toggleAudio = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
        setIsPlaying(false);
      } else {
        audioRef.current.volume = 0.3;
        audioRef.current.play()
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
      <audio
        ref={audioRef}
        src="/audio/ambient.mp3"
        loop
        preload="auto"
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
