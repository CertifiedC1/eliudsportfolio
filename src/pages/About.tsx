import { cn } from "@/lib/utils";
import { PageTransition } from "@/components/PageTransition";
import dreamBackground from "@/assets/dream-background.png";
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
} from "lucide-react";

const technicalSkills = [
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

const softSkills = [
  { name: "Problem Solving", icon: Lightbulb },
  { name: "Communication", icon: MessageSquare },
  { name: "Time Management", icon: Clock },
  { name: "Team Collaboration", icon: Users },
];

export default function About() {
  return (
    <PageTransition>
      <div className="relative min-h-screen overflow-hidden">
        {/* Dreamlike background */}
        <div
          className="fixed inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${dreamBackground})` }}
        />
        <div className="fixed inset-0 bg-background/60 backdrop-blur-[2px]" />

        {/* Content */}
        <div className="relative z-10 pt-24 pb-16 px-4">
          <div className="container mx-auto max-w-5xl">
            {/* Header */}
            <div className="text-center mb-16 animate-fade-in">
              <h1 className="font-display text-4xl md:text-6xl text-primary text-glow mb-4">
                About Me
              </h1>
              <div className="w-24 h-1 bg-gradient-to-r from-transparent via-primary to-transparent mx-auto" />
            </div>

            {/* Bio Section */}
            <div className="glass rounded-2xl p-8 md:p-12 mb-12 animate-fade-in" style={{ animationDelay: "0.2s" }}>
              <div className="prose prose-invert max-w-none">
                <p className="text-lg md:text-xl leading-relaxed text-foreground/90 font-body mb-6">
                  I am a passionate and results-driven <span className="text-primary font-semibold">Web Developer</span>, <span className="text-primary font-semibold">Software Engineer</span>, and <span className="text-primary font-semibold">IT Specialist</span> specializing in building modern, secure, and scalable web applications. I enjoy transforming complex problems into clean, user-focused digital solutions.
                </p>
                <p className="text-lg md:text-xl leading-relaxed text-foreground/90 font-body">
                  I have worked on multiple real-world projects and earned recognition through achievements including participation in a Hackathon, where I received a <span className="text-primary font-semibold">Hackathon Certificate</span> for innovation and problem-solving.
                </p>
              </div>

              {/* Achievement badge */}
              <div className="mt-8 flex items-center gap-4 p-4 rounded-xl bg-primary/10 border border-primary/20">
                <Award className="w-12 h-12 text-primary" />
                <div>
                  <h3 className="font-display text-lg text-primary">Hackathon Certificate</h3>
                  <p className="text-sm text-muted-foreground font-body">Recognized for innovation and problem-solving</p>
                </div>
              </div>
            </div>

            {/* Technical Skills */}
            <div className="mb-12 animate-fade-in" style={{ animationDelay: "0.4s" }}>
              <h2 className="font-display text-2xl md:text-3xl text-foreground mb-8 text-center">
                Technical Skills
              </h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-4">
                {technicalSkills.map((skill, index) => (
                  <div
                    key={skill.name}
                    className={cn(
                      "glass rounded-xl p-4 flex flex-col items-center gap-3",
                      "hover:bg-primary/10 hover:border-primary/30 transition-all duration-300",
                      "hover:scale-105 cursor-default group"
                    )}
                    style={{ animationDelay: `${0.5 + index * 0.05}s` }}
                  >
                    <skill.icon className="w-8 h-8 text-primary group-hover:scale-110 transition-transform" />
                    <span className="font-body text-sm text-center text-foreground/80 group-hover:text-foreground">
                      {skill.name}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Soft Skills */}
            <div className="animate-fade-in" style={{ animationDelay: "0.6s" }}>
              <h2 className="font-display text-2xl md:text-3xl text-foreground mb-8 text-center">
                Soft Skills
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {softSkills.map((skill, index) => (
                  <div
                    key={skill.name}
                    className={cn(
                      "glass rounded-xl p-6 flex flex-col items-center gap-4",
                      "hover:bg-primary/10 hover:border-primary/30 transition-all duration-300",
                      "hover:scale-105 cursor-default group"
                    )}
                  >
                    <skill.icon className="w-10 h-10 text-primary group-hover:scale-110 transition-transform" />
                    <span className="font-body text-base text-center text-foreground/80 group-hover:text-foreground">
                      {skill.name}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </PageTransition>
  );
}
