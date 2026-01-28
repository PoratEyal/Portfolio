import { useState } from 'react';
import { motion } from 'framer-motion';
import { AnimatedSection } from '@/components/AnimatedSection';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Facebook, Github, Instagram, Linkedin, Mail, Send } from 'lucide-react';

export function Contact() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 1500));
    
    setIsSubmitting(false);
    setIsSubmitted(true);
    
    // Reset after showing success
    setTimeout(() => {
      setIsSubmitted(false);
      (e.target as HTMLFormElement).reset();
    }, 3000);
  };

  const contactLinks = [
    {
      icon: Linkedin,
      label: 'LinkedIn',
      value: 'linkedin.com/in/porateyal',
      href: 'https://linkedin.com/in/porateyal',
    },
    {
      icon: Github,
      label: 'GitHub',
      value: 'github.com/PoratEyal',
      href: 'https://github.com/PoratEyal',
    },
    {
      icon: Mail,
      label: 'Email',
      value: 'eyal1.porat@gmail.com',
      href: 'mailto:eyal1.porat@gmail.com',
    },
    {
      icon: Facebook,
      label: 'Facebook',
      value: 'facebook.com/porat.eyal',
      href: 'https://www.facebook.com/porat.eyal',
    },
    {
      icon: Instagram,
      label: 'Instagram',
      value: '@eyal.porat',
      href: 'https://www.instagram.com/eyal.porat/',
    },
  ];

  return (
    <section
      id="contact"
      className="py-24 bg-secondary/30"
    >
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <AnimatedSection>
            <span className="text-primary text-sm font-semibold uppercase tracking-wider">
              Get In Touch
            </span>
          </AnimatedSection>

          <AnimatedSection delay={0.1}>
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground mt-4 mb-4">
              Let's Work <span className="text-primary">Together</span>
            </h2>
          </AnimatedSection>

          <AnimatedSection delay={0.2}>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Have a project in mind? Let's create something amazing. 
              I'm always open to discussing new opportunities.
            </p>
          </AnimatedSection>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Info */}
          <AnimatedSection delay={0.3}>
            <div className="space-y-8">
              <div>
                <h3 className="text-xl font-semibold text-foreground mb-6">
                  Contact Information
                </h3>
                <p className="text-muted-foreground mb-8">
                  Feel free to reach out through any of these channels. 
                  I'll get back to you as soon as possible.
                </p>
              </div>

              <div className="space-y-4">
                {contactLinks.map((link) => (
                  <a
                    key={link.label}
                    href={link.href}
                    target={link.href.startsWith('mailto') ? undefined : '_blank'}
                    rel={link.href.startsWith('mailto') ? undefined : 'noopener noreferrer'}
                    className="flex items-center gap-4 group p-3 rounded-xl hover:bg-card transition-colors"
                  >
                    <link.icon className="text-muted-foreground group-hover:text-primary transition-colors" size={22} />
                    <div>
                      <p className="text-foreground font-medium">{link.label}</p>
                      <p className="text-muted-foreground text-sm group-hover:text-primary transition-colors">
                        {link.value}
                      </p>
                    </div>
                  </a>
                ))}
              </div>
            </div>
          </AnimatedSection>

          {/* Contact Form */}
          <AnimatedSection delay={0.4}>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-foreground mb-2"
                >
                  Your Name
                </label>
                <Input
                  id="name"
                  name="name"
                  type="text"
                  required
                  placeholder="John Doe"
                  className="bg-card border-border text-foreground placeholder:text-muted-foreground/50 focus:border-primary focus:ring-primary/20"
                />
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-foreground mb-2"
                >
                  Email Address
                </label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  required
                  placeholder="john@example.com"
                  className="bg-card border-border text-foreground placeholder:text-muted-foreground/50 focus:border-primary focus:ring-primary/20"
                />
              </div>

              <div>
                <label
                  htmlFor="message"
                  className="block text-sm font-medium text-foreground mb-2"
                >
                  Message
                </label>
                <Textarea
                  id="message"
                  name="message"
                  required
                  rows={5}
                  placeholder="Tell me about your project..."
                  className="bg-card border-border text-foreground placeholder:text-muted-foreground/50 focus:border-primary focus:ring-primary/20 resize-none"
                />
              </div>

              <motion.div
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
              >
                <Button
                  type="submit"
                  disabled={isSubmitting || isSubmitted}
                  className={`w-full py-6 text-base font-medium transition-all duration-300 ${
                    isSubmitted
                      ? 'bg-green-500 hover:bg-green-500'
                      : 'bg-primary hover:bg-primary/90'
                  } text-primary-foreground`}
                >
                  {isSubmitting ? (
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                      className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
                    />
                  ) : isSubmitted ? (
                    'Message Sent!'
                  ) : (
                    <>
                      <Send className="mr-2" size={18} />
                      Send Message
                    </>
                  )}
                </Button>
              </motion.div>
            </form>
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
}
