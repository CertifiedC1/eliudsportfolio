import { useState } from "react";
import { Helmet } from "react-helmet-async";
import { cn } from "@/lib/utils";
import { PageTransition } from "@/components/PageTransition";
import { AnimatedText } from "@/components/AnimatedText";
import { VideoBackground } from "@/components/VideoBackground";
import { ExternalLink, Github } from "lucide-react";

const projects = [
  {
    title: "Chama M-Pesa App – Group Savings & Payments System",
    description: "A web-based financial management system for chamas (investment groups) that allows members to contribute, track savings, and automate payments using M-Pesa integration.",
    tech: ["React", "Supabase", "M-Pesa API", "Tailwind CSS"],
    role: "Full-stack Developer",
    outcome: "Automated group contributions, improved financial transparency, and reduced manual record-keeping for community savings groups.",
    github: "https://github.com/CertifiedC1",
    live: "https://chama-mpesaapp.vercel.app",
    featured: true,
  },
  {
    title: "Edumed Trust Organization",
    description: "A website for Edumed Trust, a Kenyan Christian Charitable Trust in operation since 1996. It supports the education, mentorship, and medical needs of bright students from needy families. The platform showcases their mission of transforming lives through the gospel of Christ, having educated 450 students, supported 640 lives, assisted 123 families, and supported 39 businesses.",
    tech: ["React", "Tailwind CSS", "Responsive Design"],
    role: "Full-stack Developer",
    outcome: "Created a compelling digital presence that highlights the organization's impact, facilitates donor engagement, and connects beneficiaries with support resources.",
    github: "https://github.com/CertifiedC1",
    live: "https://edumedtrust.org",
    featured: false,
  },
  {
    title: "Kimuri School Website",
    description: "A modern school website that helps parents and students know and interact with the school environment better. Features information about academics, events, and school activities.",
    tech: ["React", "Tailwind CSS", "Responsive Design"],
    role: "Full-stack Developer",
    outcome: "Enhanced school-community engagement by providing an intuitive platform for parents and students to access school information and resources.",
    github: "https://github.com/CertifiedC1",
    live: "https://kimurischool.vercel.app/",
    featured: false,
  },
  {
    title: "ProDrive Suspension",
    description: "A professional automotive suspension solutions website showcasing high-performance suspension systems and services for various vehicle types.",
    tech: ["React", "Tailwind CSS", "Modern UI/UX"],
    role: "Full-stack Developer",
    outcome: "Delivered a sleek, professional web presence that effectively showcases automotive suspension products and services.",
    github: "https://github.com/CertifiedC1",
    live: "https://prodrive-suspension.vercel.app/",
    featured: false,
  },
  {
    title: "EntryHive – Digital Ticketing Platform",
    description: "A modern web-based ticketing platform that enables event organizers to sell tickets, validate entry using secure QR codes, and manage events through a centralized dashboard.",
    tech: ["React", "Supabase", "QR Code Validation", "Tailwind CSS"],
    role: "Full-stack Developer",
    outcome: "Delivered a seamless ticket purchase and validation flow, reduced ticket fraud through single-use QR codes, and improved event entry efficiency.",
    github: "https://github.com/CertifiedC1",
    live: "https://entryhive.vercel.app",
    featured: false,
  },
  {
    title: "AIU Chatbot – University Information Assistant",
    description: "An intelligent chatbot for Africa International University designed to help students get quick answers about admissions, courses, fees, timetables, accommodation, exams, and other campus services. It works through predefined responses, returning correct stored answers when users select options or type keywords.",
    tech: ["React", "JavaScript", "Tailwind CSS", "NLP"],
    role: "Full-stack Developer",
    outcome: "Streamlined student access to university information, reducing response times and improving the overall student experience.",
    github: "https://github.com/CertifiedC1",
    live: "https://certifiedbot.vercel.app/",
    featured: false,
  },
  {
    title: "Portfolio Builder",
    description: "A modern web-based portfolio builder offering responsiveness from simple configuration input, enabling portfolios to be highly noticed and professionally presented.",
    tech: ["React", "Node.js", "Tailwind CSS"],
    role: "Creator & Developer",
    outcome: "Enabled developers to launch professional portfolios faster, reducing setup time and improving online visibility.",
    github: "https://github.com/CertifiedC1",
    live: "https://eliudport.vercel.app/",
    featured: false,
  },
];

// Floating project card component
const FloatingProjectCard = ({ 
  project, 
  index, 
  isFloating,
  onTouch
}: { 
  project: typeof projects[0]; 
  index: number; 
  isFloating: boolean;
  onTouch: () => void;
}) => {
  const [hovered, setHovered] = useState(false);
  
  return (
    <div
      onClick={onTouch}
      onTouchStart={onTouch}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className={cn(
        "glass rounded-2xl overflow-hidden group cursor-pointer",
        "hover:border-primary/40 transition-all duration-500",
        "hover:scale-[1.02] hover:shadow-2xl hover:shadow-primary/20",
        project.featured && "md:col-span-2",
        "animate-fade-in",
        isFloating && "animate-float-card"
      )}
      style={{ 
        animationDelay: `${0.2 + index * 0.1}s`,
        ...(isFloating && {
          animation: `float-card 3s ease-in-out infinite`,
          animationDelay: `${index * 0.3}s`,
        })
      }}
    >
      <div className={cn("p-6 md:p-8", project.featured && "md:flex md:gap-8")}>
        <div className={cn("flex-1", project.featured && "md:max-w-[60%]")}>
          {/* Project Title - Interactive */}
          <div className="flex items-start justify-between mb-4">
            <h3 className={cn(
              "font-display text-xl md:text-2xl text-foreground transition-all duration-300",
              "group-hover:text-primary group-hover:text-glow",
              hovered && "scale-105 origin-left"
            )}>
              {project.title}
            </h3>
            {project.featured && (
              <span className="px-3 py-1 text-xs font-body uppercase tracking-wider bg-primary/20 text-primary rounded-full">
                Featured
              </span>
            )}
          </div>

          {/* Description */}
          <p className="font-body text-muted-foreground mb-6 leading-relaxed">
            {project.description}
          </p>

          {/* Role & Outcome */}
          <div className="space-y-2 mb-6">
            <p className="font-body text-sm">
              <span className="text-primary">Role:</span>{" "}
              <span className="text-foreground/80">{project.role}</span>
            </p>
            <p className="font-body text-sm">
              <span className="text-primary">Outcome:</span>{" "}
              <span className="text-foreground/80">{project.outcome}</span>
            </p>
          </div>
        </div>

        <div className={cn("flex-1", project.featured && "md:flex md:flex-col md:justify-between")}>
          {/* Tech Stack */}
          <div className="flex flex-wrap gap-2 mb-6">
            {project.tech.map((tech) => (
              <span
                key={tech}
                className="px-3 py-1 text-xs font-body bg-secondary/80 text-foreground/80 rounded-lg border border-border/50 hover:bg-primary/20 hover:text-primary transition-colors"
              >
                {tech}
              </span>
            ))}
          </div>

          {/* Buttons */}
          <div className="flex gap-4">
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className={cn(
                "flex items-center gap-2 px-4 py-2 rounded-lg font-body text-sm",
                "bg-secondary hover:bg-secondary/80 text-foreground/80 hover:text-foreground",
                "transition-all duration-300 hover:scale-105 hover:-translate-y-0.5"
              )}
            >
              <Github size={16} />
              GitHub
            </a>
            {project.live !== "#" && (
              <a
                href={project.live}
                target="_blank"
                rel="noopener noreferrer"
                className={cn(
                  "flex items-center gap-2 px-4 py-2 rounded-lg font-body text-sm",
                  "bg-primary hover:bg-primary/90 text-primary-foreground",
                  "transition-all duration-300 hover:scale-105 hover:-translate-y-0.5"
                )}
              >
                <ExternalLink size={16} />
                Live Demo
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default function Projects() {
  const [floatingCards, setFloatingCards] = useState<Set<number>>(new Set());

  const handleCardTouch = (index: number) => {
    setFloatingCards(prev => {
      const newSet = new Set(prev);
      if (newSet.has(index)) {
        newSet.delete(index);
      } else {
        newSet.add(index);
        // Auto-stop floating after 5 seconds
        setTimeout(() => {
          setFloatingCards(current => {
            const updated = new Set(current);
            updated.delete(index);
            return updated;
          });
        }, 5000);
      }
      return newSet;
    });
  };

  return (
    <>
      <Helmet>
        <title>Projects | Eliud's Portfolio</title>
        <meta name="description" content="Explore Eliud's portfolio of web development projects including ticketing platforms, payment systems, and more." />
      </Helmet>
      <PageTransition>
        <div className="relative min-h-screen overflow-hidden">
          {/* Video background */}
        <VideoBackground src="/videos/projects-bg.mp4" />

        {/* Content */}
        <div className="relative z-10 pt-24 pb-16 px-4">
          <div className="container mx-auto max-w-6xl">
            {/* Header with animated text */}
            <div className="text-center mb-16 animate-fade-in">
              <h1 className="font-display text-4xl md:text-6xl text-primary text-glow mb-4">
                <AnimatedText text="Projects" delay={300} letterDelay={0.08} />
              </h1>
              <p className="font-body text-lg text-muted-foreground max-w-2xl mx-auto">
                <AnimatedText text="A showcase of my work and creative solutions" delay={600} letterDelay={0.02} />
              </p>
              <div className="w-24 h-1 bg-gradient-to-r from-transparent via-primary to-transparent mx-auto mt-6" />
            </div>

            {/* Projects Grid */}
            <div className="grid gap-8 md:grid-cols-2">
              {projects.map((project, index) => (
                <FloatingProjectCard
                  key={project.title}
                  project={project}
                  index={index}
                  isFloating={floatingCards.has(index)}
                  onTouch={() => handleCardTouch(index)}
                />
              ))}
              </div>
            </div>
          </div>
        </div>
      </PageTransition>
    </>
  );
}
