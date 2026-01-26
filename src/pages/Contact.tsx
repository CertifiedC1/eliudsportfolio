import { useState } from "react";
import { Helmet } from "react-helmet-async";
import { cn } from "@/lib/utils";
import { PageTransition } from "@/components/PageTransition";
import { AnimatedText } from "@/components/AnimatedText";
import { VideoBackground } from "@/components/VideoBackground";
import { MapPin, Mail, Send, Github, Linkedin, ArrowRight, Phone, Copy, Check, Loader2 } from "lucide-react";
import { toast } from "sonner";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [copiedField, setCopiedField] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const contactInfo = {
    email: "ndungueliud2021@gmail.com",
    phone1: "0111653881",
    phone2: "0734007511",
    github: "https://github.com/CertifiedC1",
    linkedin: "https://www.linkedin.com/in/eliud-ndungu-3075a0339/",
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      toast.error("Please fill in all fields");
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch("https://www.fixafrica.co.ke/carenthusiast/api/email/email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          subject: `Portfolio Contact: Message from ${formData.name}`,
          content: `Name: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`,
          recipient: "ndungueliud2021@gmail.com",
          from_name: formData.name,
          reply_to: formData.email,
        }),
      });

      const data = await response.json();

      if (data.success) {
        toast.success("Message sent successfully!", {
          description: "Thank you for reaching out. I'll get back to you soon!",
        });
        setFormData({ name: "", email: "", message: "" });
      } else {
        throw new Error(data.message || "Failed to send message");
      }
    } catch (error) {
      console.error("Email sending error:", error);
      toast.error("Failed to send message", {
        description: "Please try again or contact me directly via email.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const copyToClipboard = (text: string, field: string) => {
    navigator.clipboard.writeText(text);
    setCopiedField(field);
    toast.success("Copied to clipboard!", {
      description: text,
    });
    setTimeout(() => setCopiedField(null), 2000);
  };

  return (
    <>
      <Helmet>
        <title>Contact | Eliud's Portfolio</title>
        <meta name="description" content="Get in touch with Eliud for freelance projects, collaborations, or full-time opportunities. Let's build something amazing together." />
      </Helmet>
      <PageTransition>
        <div className="relative min-h-screen overflow-hidden">
          {/* Video background */}
        <VideoBackground src="/videos/contact-bg.mp4" />

        {/* Content */}
        <div className="relative z-10 pt-24 pb-16 px-4">
          <div className="container mx-auto max-w-5xl">
            {/* Header with animated text */}
            <div className="text-center mb-12 sm:mb-16 animate-fade-in">
              <h1 className="font-display text-3xl sm:text-4xl md:text-6xl text-primary text-glow mb-4">
                <AnimatedText text="Get In Touch" delay={300} letterDelay={0.08} />
              </h1>
              <p className="font-body text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto px-4">
                <AnimatedText text="Let's collaborate and build something amazing together" delay={600} letterDelay={0.02} />
              </p>
              <div className="w-24 h-1 bg-gradient-to-r from-transparent via-primary to-transparent mx-auto mt-6" />
            </div>

            <div className="grid md:grid-cols-2 gap-8 md:gap-12">
              {/* Contact Info */}
              <div className="space-y-6 sm:space-y-8 animate-fade-in" style={{ animationDelay: "0.2s" }}>
                <div className="glass rounded-2xl p-6 sm:p-8">
                  {/* Animated golden heading */}
                  <h2 className="font-display text-xl sm:text-2xl text-amber-400 text-glow mb-6">
                    <AnimatedText text="Contact Information" delay={400} letterDelay={0.05} />
                  </h2>

                  <div className="space-y-4 sm:space-y-6">
                    {/* Name */}
                    <div className="flex items-center gap-4 group">
                      <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                        <span className="font-display text-base sm:text-lg text-primary">EN</span>
                      </div>
                      <div>
                        <p className="text-xs sm:text-sm text-muted-foreground font-body">Name</p>
                        <p className="font-body text-sm sm:text-base text-foreground">Eliud Ndungu</p>
                      </div>
                    </div>

                    {/* Location */}
                    <div className="flex items-center gap-4 group">
                      <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                        <MapPin className="w-4 h-4 sm:w-5 sm:h-5 text-primary" />
                      </div>
                      <div>
                        <p className="text-xs sm:text-sm text-muted-foreground font-body">Location</p>
                        <p className="font-body text-sm sm:text-base text-foreground">Kenya</p>
                      </div>
                    </div>

                    {/* Email - Copyable */}
                    <button
                      onClick={() => copyToClipboard(contactInfo.email, "email")}
                      className="w-full flex items-center gap-4 group hover:bg-primary/5 rounded-xl p-2 -m-2 transition-colors"
                    >
                      <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                        <Mail className="w-4 h-4 sm:w-5 sm:h-5 text-primary" />
                      </div>
                      <div className="flex-1 text-left min-w-0">
                        <p className="text-xs sm:text-sm text-muted-foreground font-body">Email</p>
                        <p className="font-body text-sm sm:text-base text-foreground truncate">{contactInfo.email}</p>
                      </div>
                      {copiedField === "email" ? (
                        <Check className="w-4 h-4 sm:w-5 sm:h-5 text-green-500 flex-shrink-0" />
                      ) : (
                        <Copy className="w-4 h-4 sm:w-5 sm:h-5 text-muted-foreground group-hover:text-primary transition-colors flex-shrink-0" />
                      )}
                    </button>

                    {/* Phone 1 - Copyable */}
                    <button
                      onClick={() => copyToClipboard(contactInfo.phone1, "phone1")}
                      className="w-full flex items-center gap-4 group hover:bg-primary/5 rounded-xl p-2 -m-2 transition-colors"
                    >
                      <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                        <Phone className="w-4 h-4 sm:w-5 sm:h-5 text-primary" />
                      </div>
                      <div className="flex-1 text-left">
                        <p className="text-xs sm:text-sm text-muted-foreground font-body">Phone</p>
                        <p className="font-body text-sm sm:text-base text-foreground">{contactInfo.phone1}</p>
                      </div>
                      {copiedField === "phone1" ? (
                        <Check className="w-4 h-4 sm:w-5 sm:h-5 text-green-500 flex-shrink-0" />
                      ) : (
                        <Copy className="w-4 h-4 sm:w-5 sm:h-5 text-muted-foreground group-hover:text-primary transition-colors flex-shrink-0" />
                      )}
                    </button>

                    {/* Phone 2 - Copyable */}
                    <button
                      onClick={() => copyToClipboard(contactInfo.phone2, "phone2")}
                      className="w-full flex items-center gap-4 group hover:bg-primary/5 rounded-xl p-2 -m-2 transition-colors"
                    >
                      <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                        <Phone className="w-4 h-4 sm:w-5 sm:h-5 text-primary" />
                      </div>
                      <div className="flex-1 text-left">
                        <p className="text-xs sm:text-sm text-muted-foreground font-body">Alternate</p>
                        <p className="font-body text-sm sm:text-base text-foreground">{contactInfo.phone2}</p>
                      </div>
                      {copiedField === "phone2" ? (
                        <Check className="w-4 h-4 sm:w-5 sm:h-5 text-green-500 flex-shrink-0" />
                      ) : (
                        <Copy className="w-4 h-4 sm:w-5 sm:h-5 text-muted-foreground group-hover:text-primary transition-colors flex-shrink-0" />
                      )}
                    </button>
                  </div>

                  {/* Social Links */}
                  <div className="mt-6 sm:mt-8 pt-6 sm:pt-8 border-t border-border/50">
                    <p className="text-xs sm:text-sm text-muted-foreground font-body mb-4">
                      Connect with me
                    </p>
                    <div className="flex gap-4">
                      <a
                        href={contactInfo.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={cn(
                          "w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-secondary flex items-center justify-center",
                          "hover:bg-primary/20 hover:scale-110 hover:-translate-y-1 transition-all duration-300",
                          "group"
                        )}
                      >
                        <Github className="w-4 h-4 sm:w-5 sm:h-5 text-muted-foreground group-hover:text-primary transition-colors" />
                      </a>
                      <a
                        href={contactInfo.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={cn(
                          "w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-secondary flex items-center justify-center",
                          "hover:bg-primary/20 hover:scale-110 hover:-translate-y-1 transition-all duration-300",
                          "group"
                        )}
                      >
                        <Linkedin className="w-4 h-4 sm:w-5 sm:h-5 text-muted-foreground group-hover:text-primary transition-colors" />
                      </a>
                      <a
                        href={`mailto:${contactInfo.email}`}
                        className={cn(
                          "w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-secondary flex items-center justify-center",
                          "hover:bg-primary/20 hover:scale-110 hover:-translate-y-1 transition-all duration-300",
                          "group"
                        )}
                      >
                        <Mail className="w-4 h-4 sm:w-5 sm:h-5 text-muted-foreground group-hover:text-primary transition-colors" />
                      </a>
                    </div>
                  </div>
                </div>

                {/* CTA */}
                <div className="glass rounded-2xl p-6 sm:p-8 bg-gradient-to-br from-primary/10 to-transparent hover:from-primary/15 transition-all duration-300 group cursor-default">
                  <h3 className="font-display text-lg sm:text-xl text-foreground mb-3">
                    Open to Opportunities
                  </h3>
                  <p className="font-body text-sm sm:text-base text-muted-foreground mb-4">
                    I'm currently available for freelance projects, full-time positions, 
                    or exciting collaborations. Let's create something remarkable!
                  </p>
                  <div className="flex items-center gap-2 text-primary font-body text-sm">
                    <span>Let's work together</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-2 transition-transform" />
                  </div>
                </div>
              </div>

              {/* Contact Form */}
              <div
                className="glass rounded-2xl p-6 sm:p-8 animate-fade-in"
                style={{ animationDelay: "0.4s" }}
              >
                {/* Animated golden heading */}
                <h2 className="font-display text-xl sm:text-2xl text-amber-400 text-glow mb-6">
                  <AnimatedText text="Send a Message" delay={500} letterDelay={0.05} />
                </h2>

                <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
                  {/* Name Input */}
                  <div className="group">
                    <label
                      htmlFor="name"
                      className="block font-body text-xs sm:text-sm text-muted-foreground mb-2 group-focus-within:text-primary transition-colors"
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
                        "font-body text-sm sm:text-base text-foreground placeholder:text-muted-foreground/50",
                        "focus:outline-none focus:border-primary/50 focus:ring-2 focus:ring-primary/20",
                        "transition-all duration-300 hover:border-primary/30"
                      )}
                      placeholder="John Doe"
                    />
                  </div>

                  {/* Email Input */}
                  <div className="group">
                    <label
                      htmlFor="email"
                      className="block font-body text-xs sm:text-sm text-muted-foreground mb-2 group-focus-within:text-primary transition-colors"
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
                        "font-body text-sm sm:text-base text-foreground placeholder:text-muted-foreground/50",
                        "focus:outline-none focus:border-primary/50 focus:ring-2 focus:ring-primary/20",
                        "transition-all duration-300 hover:border-primary/30"
                      )}
                      placeholder="john@example.com"
                    />
                  </div>

                  {/* Message Input */}
                  <div className="group">
                    <label
                      htmlFor="message"
                      className="block font-body text-xs sm:text-sm text-muted-foreground mb-2 group-focus-within:text-primary transition-colors"
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
                        "font-body text-sm sm:text-base text-foreground placeholder:text-muted-foreground/50",
                        "focus:outline-none focus:border-primary/50 focus:ring-2 focus:ring-primary/20",
                        "transition-all duration-300 resize-none hover:border-primary/30"
                      )}
                      placeholder="Tell me about your project..."
                    />
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className={cn(
                      "w-full flex items-center justify-center gap-3 px-6 py-3 sm:py-4 rounded-xl",
                      "bg-primary hover:bg-primary/90 text-primary-foreground",
                      "font-body font-medium tracking-wide text-sm sm:text-base",
                      "transition-all duration-300 hover:scale-[1.02] hover:-translate-y-0.5 hover:shadow-lg hover:shadow-primary/20",
                      "group disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 disabled:hover:translate-y-0"
                    )}
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        <span>Sending...</span>
                      </>
                    ) : (
                      <>
                        <span>Send Message</span>
                        <Send className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-0.5 transition-transform" />
                      </>
                    )}
                  </button>

                  <p className="text-center text-xs text-muted-foreground font-body mt-4">
                    Your message will be sent directly to my inbox!
                  </p>
                </form>
              </div>
            </div>
            </div>
          </div>
        </div>
      </PageTransition>
    </>
  );
}
