import { motion } from 'framer-motion';
import { Linkedin, Github, Facebook, Instagram } from 'lucide-react';

interface SocialLinksProps {
  className?: string;
  iconSize?: number;
}

export function SocialLinks({ className = '', iconSize = 22 }: SocialLinksProps) {
  const links = [
    {
      href: 'https://linkedin.com/in/porateyal',
      icon: Linkedin,
      label: 'LinkedIn',
    },
    {
      href: 'https://github.com/PoratEyal',
      icon: Github,
      label: 'GitHub',
    },
    {
      href: 'https://www.facebook.com/porat.eyal',
      icon: Facebook,
      label: 'Facebook',
    },
    {
      href: 'https://www.instagram.com/eyal.porat/',
      icon: Instagram,
      label: 'Instagram',
    },
  ];

  return (
    <div className={`flex items-center gap-2 ${className}`}>
      {links.map((link) => (
        <motion.a
          key={link.label}
          href={link.href}
          target="_blank"
          rel="noopener noreferrer"
          className="p-2.5 text-muted-foreground hover:text-primary hover:bg-secondary rounded-xl transition-colors duration-200"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          aria-label={link.label}
        >
          <link.icon size={iconSize} />
        </motion.a>
      ))}
    </div>
  );
}
