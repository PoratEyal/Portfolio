import { motion } from 'framer-motion';
import { ExternalLink, Github, ArrowRight } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { ImageGallery } from './ImageGallery';

interface ProjectCardProps {
  title: string;
  description: string;
  images: string[];
  techStack: string[];
  liveUrl?: string;
  githubUrl?: string;
}

export function ProjectCard({
  title,
  description,
  images,
  techStack,
  liveUrl,
  githubUrl,
}: ProjectCardProps) {
  return (
    <motion.div
      className="group relative bg-secondary dark:bg-[#0c1016] border border-transparent dark:border-[#1a2230] rounded-2xl overflow-hidden transition-all duration-300 hover:shadow-xl"
      whileHover={{ y: -4 }}
    >
      {/* Image Gallery */}
      <ImageGallery images={images} alt={title} />

      {/* Content */}
      <div className="p-6">
        <h3 className="text-xl font-semibold text-foreground mb-3 group-hover:text-primary transition-colors duration-300">
          {title}
        </h3>
        <p className="text-muted-foreground text-sm leading-relaxed mb-4">
          {description}
        </p>

        {/* Tech Stack */}
        <div className="flex flex-wrap gap-2 mb-5">
          {techStack.map((tech) => (
            <Badge
              key={tech}
              variant="secondary"
              className="bg-background/80 dark:bg-[#1a1f2a] text-muted-foreground text-xs font-medium"
            >
              {tech}
            </Badge>
          ))}
        </div>

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
