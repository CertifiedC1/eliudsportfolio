import { useState } from "react";
import { cn } from "@/lib/utils";
import { PageTransition } from "@/components/PageTransition";
import { MapPin, Mail, Send, Github, Linkedin, ArrowRight } from "lucide-react";
import { toast } from "sonner";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Visual only - show toast
    toast.success("Message sent! I'll get back to you soon.", {
      description: "Thank you for reaching out.",
    });
    setFormData({ name: "", email: "", message: "" });
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <PageTransition>
      <div className="relative min-h-screen overflow-hidden bg-background grain">
        {/* Gradient background */}
        <div className="fixed inset-0">
          <div className="absolute inset-0 bg-gradient-radial from-primary/5 via-background to-background" />
          <div className="absolute top-0 right-0 w-1/2 h-1/2 bg-gradient-radial from-primary/10 to-transparent blur-3xl" />
          <div className="absolute bottom-0 left-0 w-1/2 h-1/2 bg-gradient-radial from-accent/5 to-transparent blur-3xl" />
        </div>

        {/* Content */}
        <div className="relative z-10 pt-24 pb-16 px-4">
          <div className="container mx-auto max-w-5xl">
            {/* Header */}
            <div className="text-center mb-16 animate-fade-in">
              <h1 className="font-display text-4xl md:text-6xl text-primary text-glow mb-4">
                Get In Touch
              </h1>
              <p className="font-body text-lg text-muted-foreground max-w-2xl mx-auto">
                Let's collaborate and build something amazing together
              </p>
              <div className="w-24 h-1 bg-gradient-to-r from-transparent via-primary to-transparent mx-auto mt-6" />
            </div>

            <div className="grid md:grid-cols-2 gap-12">
              {/* Contact Info */}
              <div className="space-y-8 animate-fade-in" style={{ animationDelay: "0.2s" }}>
                <div className="glass rounded-2xl p-8">
                  <h2 className="font-display text-2xl text-foreground mb-6">
                    Contact Information
                  </h2>

                  <div className="space-y-6">
                    {/* Name */}
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                        <span className="font-display text-lg text-primary">EN</span>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground font-body">Name</p>
                        <p className="font-body text-foreground">Eliud Ndungu</p>
                      </div>
                    </div>

                    {/* Location */}
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                        <MapPin className="w-5 h-5 text-primary" />
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground font-body">Location</p>
                        <p className="font-body text-foreground">Kenya</p>
                      </div>
                    </div>
                  </div>

                  {/* Social Links */}
                  <div className="mt-8 pt-8 border-t border-border/50">
                    <p className="text-sm text-muted-foreground font-body mb-4">
                      Connect with me
                    </p>
                    <div className="flex gap-4">
                      <a
                        href="#"
                        className={cn(
                          "w-12 h-12 rounded-xl bg-secondary flex items-center justify-center",
                          "hover:bg-primary/20 hover:scale-110 transition-all duration-300",
                          "group"
                        )}
                      >
                        <Github className="w-5 h-5 text-muted-foreground group-hover:text-primary" />
                      </a>
                      <a
                        href="#"
                        className={cn(
                          "w-12 h-12 rounded-xl bg-secondary flex items-center justify-center",
                          "hover:bg-primary/20 hover:scale-110 transition-all duration-300",
                          "group"
                        )}
                      >
                        <Linkedin className="w-5 h-5 text-muted-foreground group-hover:text-primary" />
                      </a>
                      <a
                        href="#"
                        className={cn(
                          "w-12 h-12 rounded-xl bg-secondary flex items-center justify-center",
                          "hover:bg-primary/20 hover:scale-110 transition-all duration-300",
                          "group"
                        )}
                      >
                        <Mail className="w-5 h-5 text-muted-foreground group-hover:text-primary" />
                      </a>
                    </div>
                  </div>
                </div>

                {/* CTA */}
                <div className="glass rounded-2xl p-8 bg-gradient-to-br from-primary/10 to-transparent">
                  <h3 className="font-display text-xl text-foreground mb-3">
                    Open to Opportunities
                  </h3>
                  <p className="font-body text-muted-foreground mb-4">
                    I'm currently available for freelance projects, full-time positions, 
                    or exciting collaborations. Let's create something remarkable!
                  </p>
                  <div className="flex items-center gap-2 text-primary font-body text-sm">
                    <span>Let's work together</span>
                    <ArrowRight className="w-4 h-4 animate-pulse" />
                  </div>
                </div>
              </div>

              {/* Contact Form */}
              <div
                className="glass rounded-2xl p-8 animate-fade-in"
                style={{ animationDelay: "0.4s" }}
              >
                <h2 className="font-display text-2xl text-foreground mb-6">
                  Send a Message
                </h2>

                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Name Input */}
                  <div>
                    <label
                      htmlFor="name"
                      className="block font-body text-sm text-muted-foreground mb-2"
                    >
                      Your Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className={cn(
                        "w-full px-4 py-3 rounded-xl bg-secondary/50 border border-border/50",
                        "font-body text-foreground placeholder:text-muted-foreground/50",
                        "focus:outline-none focus:border-primary/50 focus:ring-2 focus:ring-primary/20",
                        "transition-all duration-300"
                      )}
                      placeholder="John Doe"
                    />
                  </div>

                  {/* Email Input */}
                  <div>
                    <label
                      htmlFor="email"
                      className="block font-body text-sm text-muted-foreground mb-2"
                    >
                      Email Address
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className={cn(
                        "w-full px-4 py-3 rounded-xl bg-secondary/50 border border-border/50",
                        "font-body text-foreground placeholder:text-muted-foreground/50",
                        "focus:outline-none focus:border-primary/50 focus:ring-2 focus:ring-primary/20",
                        "transition-all duration-300"
                      )}
                      placeholder="john@example.com"
                    />
                  </div>

                  {/* Message Input */}
                  <div>
                    <label
                      htmlFor="message"
                      className="block font-body text-sm text-muted-foreground mb-2"
                    >
                      Your Message
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows={5}
                      className={cn(
                        "w-full px-4 py-3 rounded-xl bg-secondary/50 border border-border/50",
                        "font-body text-foreground placeholder:text-muted-foreground/50",
                        "focus:outline-none focus:border-primary/50 focus:ring-2 focus:ring-primary/20",
                        "transition-all duration-300 resize-none"
                      )}
                      placeholder="Tell me about your project..."
                    />
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    className={cn(
                      "w-full flex items-center justify-center gap-3 px-6 py-4 rounded-xl",
                      "bg-primary hover:bg-primary/90 text-primary-foreground",
                      "font-body font-medium tracking-wide",
                      "transition-all duration-300 hover:scale-[1.02] hover:shadow-lg hover:shadow-primary/20",
                      "group"
                    )}
                  >
                    <span>Send Message</span>
                    <Send className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </PageTransition>
  );
}
