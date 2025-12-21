import { cn } from "@/lib/utils";

interface VideoBackgroundProps {
  src: string;
  className?: string;
  overlay?: boolean;
}

export function VideoBackground({ src, className, overlay = true }: VideoBackgroundProps) {
  return (
    <div className={cn("fixed inset-0 -z-10 overflow-hidden", className)}>
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute min-w-full min-h-full w-auto h-auto object-cover"
        style={{
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
        }}
      >
        <source src={src} type="video/mp4" />
      </video>
      {overlay && (
        <div className="absolute inset-0 bg-background/70 backdrop-blur-[1px]" />
      )}
    </div>
  );
}
