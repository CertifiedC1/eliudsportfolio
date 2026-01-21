import { useState } from "react";
import { Helmet } from "react-helmet-async";
import { cn } from "@/lib/utils";
import { PageTransition } from "@/components/PageTransition";
import { AnimatedText } from "@/components/AnimatedText";
import { VideoBackground } from "@/components/VideoBackground";
import {
  Code2,
  FileCode,
  Palette,
  Database,
  GitBranch,
  Globe,
  Smartphone,
  CreditCard,
  MessageSquare,
  Clock,
  Users,
  Lightbulb,
  Award,
  LucideIcon,
} from "lucide-react";

interface Skill {
  name: string;
  icon: LucideIcon;
}

const technicalSkills: Skill[] = [
  { name: "HTML", icon: FileCode },
  { name: "CSS", icon: Palette },
  { name: "JavaScript", icon: Code2 },
  { name: "React", icon: Code2 },
  { name: "Next.js", icon: Globe },
  { name: "Vue", icon: Code2 },
  { name: "Supabase", icon: Database },
  { name: "Firebase", icon: Database },
  { name: "MySQL", icon: Database },
  { name: "Git", icon: GitBranch },
  { name: "GitHub", icon: GitBranch },
  { name: "REST APIs", icon: Globe },
  { name: "M-Pesa", icon: Smartphone },
  { name: "Paystack", icon: CreditCard },
];

const softSkills: Skill[] = [
  { name: "Problem Solving", icon: Lightbulb },
  { name: "Communication", icon: MessageSquare },
  { name: "Time Management", icon: Clock },
  { name: "Team Collaboration", icon: Users },
];

// Interactive word component
const InteractiveWord = ({ children, className }: { children: React.ReactNode; className?: string }) => {
  return (
    <span 
      className={cn(
        "relative inline-block cursor-pointer transition-all duration-300",
        "hover:text-amber-400 hover:scale-110 hover:text-glow",
        "after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5",
        "after:bg-amber-400 after:scale-x-0 after:origin-left after:transition-transform after:duration-300",
        "hover:after:scale-x-100",
        className
      )}
    >
      {children}
    </span>
  );
};

// Orbiting skill component
const OrbitingSkill = ({ 
  skill, 
  index, 
  total, 
  isOrbiting, 
  centerX, 
  centerY,
  radius 
}: { 
  skill: Skill; 
  index: number; 
  total: number; 
  isOrbiting: boolean;
  centerX: number;
  centerY: number;
  radius: number;
}) => {
  const angle = (index / total) * 360;
  const Icon = skill.icon;
  
  return (
    <div
      className={cn(
        "absolute flex flex-col items-center gap-2 p-3 rounded-xl",
        "bg-card/80 backdrop-blur-sm border border-primary/30",
        "transition-all duration-700 ease-out z-10",
        isOrbiting && "animate-orbit-skill"
      )}
      style={{
        left: isOrbiting ? centerX : 'auto',
        top: isOrbiting ? centerY : 'auto',
        transform: isOrbiting 
          ? `translate(-50%, -50%) rotate(${angle}deg) translateX(${radius}px) rotate(-${angle}deg)` 
          : 'none',
        position: isOrbiting ? 'absolute' : 'relative',
        animationDelay: `${index * 0.1}s`,
      }}
    >
      <Icon className="w-6 h-6 sm:w-8 sm:h-8 text-primary" />
      <span className="text-xs sm:text-sm text-foreground/80 whitespace-nowrap">{skill.name}</span>
    </div>
  );
};

// Skills container with orbit effect
const SkillsOrbit = ({ 
  skills, 
  title, 
  gridCols 
}: { 
  skills: Skill[]; 
  title: string;
  gridCols: string;
}) => {
  const [isOrbiting, setIsOrbiting] = useState(false);
  const [touchedIndex, setTouchedIndex] = useState<number | null>(null);

  const handleSkillTouch = (index: number) => {
    setTouchedIndex(index);
    setIsOrbiting(true);
    // Stop orbiting after animation
    setTimeout(() => {
      setIsOrbiting(false);
      setTouchedIndex(null);
    }, 4000);
  };

  return (
    <div className="relative">
      <h2 className="font-display text-2xl md:text-3xl text-amber-400 text-glow mb-8 text-center">
        <AnimatedText text={title} delay={title === "Technical Skills" ? 600 : 900} letterDelay={0.08} />
      </h2>
      
      <div className={cn("relative", isOrbiting && "min-h-[300px] sm:min-h-[400px]")}>
        {/* Orbit center indicator */}
        {isOrbiting && (
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-primary/50 animate-pulse" />
        )}
        
        <div className={cn(
          "grid gap-4 transition-all duration-500",
          gridCols,
          isOrbiting && "opacity-0 pointer-events-none"
        )}>
          {skills.map((skill, index) => (
            <div
              key={skill.name}
              onClick={() => handleSkillTouch(index)}
              onTouchStart={() => handleSkillTouch(index)}
              className={cn(
                "glass rounded-xl p-4 sm:p-6 flex flex-col items-center gap-3 sm:gap-4 cursor-pointer",
                "hover:bg-primary/10 hover:border-primary/30 transition-all duration-300",
                "hover:scale-105 hover:-translate-y-1 group",
                "active:scale-95"
              )}
            >
              <skill.icon className="w-8 h-8 sm:w-10 sm:h-10 text-primary group-hover:scale-110 transition-transform" />
              <span className="font-body text-xs sm:text-sm md:text-base text-center text-foreground/80 group-hover:text-foreground">
                {skill.name}
              </span>
            </div>
          ))}
        </div>
        
        {/* Orbiting skills overlay */}
        {isOrbiting && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="relative w-full h-full">
              {skills.map((skill, index) => (
                <OrbitingSkill
                  key={skill.name}
                  skill={skill}
                  index={index}
                  total={skills.length}
                  isOrbiting={isOrbiting}
                  centerX={typeof window !== 'undefined' ? window.innerWidth / 2 : 200}
                  centerY={150}
                  radius={skills.length > 6 ? 120 : 100}
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default function About() {
  return (
    <>
      <Helmet>
        <title>About Me | Eliud's Portfolio</title>
        <meta name="description" content="Learn about Eliud - A passionate Web Developer, Software Engineer & IT Specialist with expertise in React, Supabase, and modern web technologies." />
      </Helmet>
      <PageTransition>
        <div className="relative min-h-screen overflow-hidden">
        {/* Video background */}
        <VideoBackground src="/videos/about-bg.mp4" />

        {/* Content */}
        <div className="relative z-10 pt-24 pb-16 px-4">
          <div className="container mx-auto max-w-5xl">
            {/* Header with animated text */}
            <div className="text-center mb-16 animate-fade-in">
              <h1 className="font-display text-4xl md:text-6xl text-primary text-glow mb-4">
                <InteractiveWord>
                  <AnimatedText text="About Me" delay={300} letterDelay={0.08} />
                </InteractiveWord>
              </h1>
              <div className="w-24 h-1 bg-gradient-to-r from-transparent via-primary to-transparent mx-auto" />
            </div>

            {/* Bio Section */}
            <div className="glass rounded-2xl p-8 md:p-12 mb-12 animate-fade-in" style={{ animationDelay: "0.2s" }}>
              <div className="prose prose-invert max-w-none">
                <p className="text-lg md:text-xl leading-relaxed text-foreground/90 font-body mb-6">
                  I am a passionate and results-driven{" "}
                  <InteractiveWord className="text-primary font-semibold">Web Developer</InteractiveWord>,{" "}
                  <InteractiveWord className="text-primary font-semibold">Software Engineer</InteractiveWord>, and{" "}
                  <InteractiveWord className="text-primary font-semibold">IT Specialist</InteractiveWord>{" "}
                  specializing in building modern, secure, and scalable web applications. I enjoy transforming complex problems into clean, user-focused digital solutions.
                </p>
                <p className="text-lg md:text-xl leading-relaxed text-foreground/90 font-body">
                  I have worked on multiple real-world projects and earned recognition through achievements including participation in a Hackathon, where I received a{" "}
                  <InteractiveWord className="text-primary font-semibold">Hackathon Certificate</InteractiveWord>{" "}
                  for innovation and problem-solving.
                </p>
              </div>

              {/* Achievement badge */}
              <div className="mt-8 flex items-center gap-4 p-4 rounded-xl bg-primary/10 border border-primary/20 hover:bg-primary/20 hover:scale-[1.02] transition-all duration-300 cursor-default group">
                <Award className="w-12 h-12 text-amber-400 group-hover:scale-110 transition-transform" />
                <div>
                  <h3 className="font-display text-lg text-amber-400">
                    <InteractiveWord>Hackathon Certificate</InteractiveWord>
                  </h3>
                  <p className="text-sm text-muted-foreground font-body">Recognized for innovation and problem-solving</p>
                </div>
              </div>
            </div>

            {/* Technical Skills */}
            <div className="mb-12 animate-fade-in" style={{ animationDelay: "0.4s" }}>
              <SkillsOrbit 
                skills={technicalSkills} 
                title="Technical Skills" 
                gridCols="grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-7"
              />
            </div>

            {/* Soft Skills */}
            <div className="animate-fade-in" style={{ animationDelay: "0.6s" }}>
              <SkillsOrbit 
                skills={softSkills} 
                title="Soft Skills" 
                gridCols="grid-cols-2 md:grid-cols-4"
              />
            </div>
            </div>
          </div>
        </div>
      </PageTransition>
    </>
  );
}
