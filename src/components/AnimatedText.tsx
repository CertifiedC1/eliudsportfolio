import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

interface AnimatedTextProps {
  text: string;
  className?: string;
  delay?: number;
  letterDelay?: number;
}

export function AnimatedText({
  text,
  className,
  delay = 0,
  letterDelay = 0.05,
}: AnimatedTextProps) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), delay);
    return () => clearTimeout(timer);
  }, [delay]);

  return (
    <span className={cn("inline-flex flex-wrap", className)}>
      {text.split("").map((letter, index) => (
        <span
          key={index}
          className={cn(
            "inline-block transition-all duration-500",
            isVisible
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-4"
          )}
          style={{
            transitionDelay: `${index * letterDelay}s`,
          }}
        >
          {letter === " " ? "\u00A0" : letter}
        </span>
      ))}
    </span>
  );
}
