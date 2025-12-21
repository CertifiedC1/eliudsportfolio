import { cn } from "@/lib/utils";
import { PageTransition } from "@/components/PageTransition";
import { AnimatedText } from "@/components/AnimatedText";
import { VideoBackground } from "@/components/VideoBackground";
import { ExternalLink, Github } from "lucide-react";

const projects = [
  {
    title: "School Management System",
    description: "Web-based platform for managing student records, payments, and authentication with integrated mobile money support.",
    tech: ["React", "Supabase", "M-Pesa API", "Tailwind CSS"],
    role: "Full-stack Developer",
    outcome: "Improved user flow and automated payments for streamlined school administration.",
    github: "#",
    live: "#",
    featured: true,
  },
  {
    title: "E-Commerce Dashboard",
    description: "A comprehensive admin dashboard for managing products, orders, and customer analytics with real-time updates.",
    tech: ["Next.js", "Firebase", "Chart.js", "TypeScript"],
    role: "Frontend Developer",
    outcome: "Enhanced data visualization and improved order management efficiency by 40%.",
    github: "#",
    live: "#",
    featured: false,
  },
  {
    title: "Task Management App",
    description: "Collaborative task management application with real-time synchronization and team workspace features.",
    tech: ["Vue.js", "Supabase", "Vuetify"],
    role: "Full-stack Developer",
    outcome: "Enabled teams to track projects efficiently with drag-and-drop Kanban boards.",
    github: "#",
    live: "#",
    featured: false,
  },
  {
    title: "Portfolio Generator",
    description: "A tool that generates beautiful portfolio websites from simple JSON configuration files.",
    tech: ["React", "Node.js", "Tailwind CSS"],
    role: "Creator & Developer",
    outcome: "Helped 50+ developers create professional portfolios quickly.",
    github: "#",
    live: "#",
    featured: false,
  },
];

export default function Projects() {
  return (
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
                <div
                  key={project.title}
                  className={cn(
                    "glass rounded-2xl overflow-hidden group",
                    "hover:border-primary/40 transition-all duration-500",
                    "hover:scale-[1.02] hover:shadow-2xl hover:shadow-primary/10",
                    project.featured && "md:col-span-2",
                    "animate-fade-in"
                  )}
                  style={{ animationDelay: `${0.2 + index * 0.1}s` }}
                >
                  <div className={cn("p-6 md:p-8", project.featured && "md:flex md:gap-8")}>
                    <div className={cn("flex-1", project.featured && "md:max-w-[60%]")}>
                      {/* Project Title */}
                      <div className="flex items-start justify-between mb-4">
                        <h3 className="font-display text-xl md:text-2xl text-foreground group-hover:text-primary transition-colors">
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
                          className={cn(
                            "flex items-center gap-2 px-4 py-2 rounded-lg font-body text-sm",
                            "bg-secondary hover:bg-secondary/80 text-foreground/80 hover:text-foreground",
                            "transition-all duration-300 hover:scale-105 hover:-translate-y-0.5"
                          )}
                        >
                          <Github size={16} />
                          GitHub
                        </a>
                        <a
                          href={project.live}
                          className={cn(
                            "flex items-center gap-2 px-4 py-2 rounded-lg font-body text-sm",
                            "bg-primary hover:bg-primary/90 text-primary-foreground",
                            "transition-all duration-300 hover:scale-105 hover:-translate-y-0.5"
                          )}
                        >
                          <ExternalLink size={16} />
                          Live Demo
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </PageTransition>
  );
}
