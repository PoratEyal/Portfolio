import { motion } from 'framer-motion';
import { ExternalLink, Github, ArrowRight, Apple } from 'lucide-react';
interface ProjectCardProps {
  title: string;
  description: string;
  logo: string;
  badge?: string;
  appStoreUrl?: string;
  liveUrl?: string;
  githubUrl?: string;
}

export function ProjectCard({
  title,
  description,
  logo,
  badge,
  appStoreUrl,
  liveUrl,
  githubUrl,
}: ProjectCardProps) {
  return (
    <motion.div
      className="group relative bg-secondary/70 dark:bg-[#0c1016] rounded-2xl overflow-hidden transition-all duration-300 hover:shadow-xl"
      whileHover={{ y: -4 }}
    >
      <div className="absolute right-4 top-4 flex items-center gap-2">
        {badge && (
          <div className="inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-medium text-primary bg-primary/10 border border-primary/20">
            {badge}
          </div>
        )}
        {appStoreUrl && (
          <a
            href={appStoreUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center rounded-full bg-foreground/10 text-foreground text-xs font-medium px-3 py-1.5 hover:bg-foreground/20 transition-colors"
          >
            <Apple size={14} className="mr-2 hidden sm:inline-flex" />
            <span className="sm:hidden">Download</span>
            <span className="hidden sm:inline">Download App Store</span>
          </a>
        )}
      </div>
      {/* Content */}
      <div className="p-6">
        <div className="flex items-center gap-4 mb-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-background/90 dark:bg-[#121824] overflow-hidden">
            <img src={logo} alt={`${title} logo`} className="h-full w-full object-contain" />
          </div>
          <h3 className="text-xl font-semibold text-foreground group-hover:text-primary transition-colors duration-300">
            {title}
          </h3>
        </div>
        <p className="text-muted-foreground text-sm leading-relaxed mb-4">
          {description}
        </p>

        {/* Links */}
        <div className="flex items-center gap-4">
          {liveUrl && (
            <a
              href={liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-primary text-sm font-medium hover:underline group/link"
            >
              <ExternalLink size={16} />
              Live Site
              <ArrowRight
                size={14}
                className="transition-transform duration-200 group-hover/link:translate-x-1"
              />
            </a>
          )}
          {githubUrl && (
            <a
              href={githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-muted-foreground text-sm font-medium hover:text-primary transition-colors duration-200"
            >
              <Github size={16} />
              GitHub
            </a>
          )}
        </div>
      </div>
    </motion.div>
  );
}
