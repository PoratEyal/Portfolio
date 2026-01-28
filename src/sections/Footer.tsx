import { motion } from 'framer-motion';
import { SocialLinks } from '@/components/SocialLinks';

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="py-12 bg-background">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Logo & Copyright */}
          <div className="text-center md:text-left">
            <motion.a
              href="#"
              onClick={(e) => {
                e.preventDefault();
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="text-xl font-bold text-foreground hover:text-primary transition-colors duration-200"
              whileHover={{ scale: 1.02 }}
            >
              Eyal Porat
            </motion.a>
            <p className="text-muted-foreground text-sm mt-2">
              © {currentYear} All rights reserved.
            </p>
          </div>

          {/* Tagline */}


          {/* Social Links */}
          <SocialLinks />
        </div>
      </div>
    </footer>
  );
}
