import { motion } from 'framer-motion';
import { ArrowDown, Code2 } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function Hero() {
  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      const offset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;
      window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
    }
  };

  const skills = [
    { emoji: '⚛️', label: 'TypeScript' },
    { emoji: '📱', label: 'React Native' },
    { emoji: '🤖', label: 'AI' },
    { emoji: '🧠', label: 'RAG' },
  ];

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-background via-background to-secondary/30">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-[120px]" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500/5 rounded-full blur-[120px]" />
      </div>

      <div className="relative z-10 max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Text Content */}
          <div className="text-center lg:text-left order-2 lg:order-1">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2, ease: [0.165, 0.84, 0.44, 1] }}
              className="inline-flex items-center gap-2 px-4 py-2 bg-secondary/80 rounded-full mb-6"
            >
              <span className="text-lg">💻</span>
              <span className="text-sm text-muted-foreground">Software Developer & AI Implementation</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3, ease: [0.165, 0.84, 0.44, 1] }}
              className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground mb-4 leading-tight"
            >
              Hello, I'm{' '}
              <span className="text-primary">Eyal Porat</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4, ease: [0.165, 0.84, 0.44, 1] }}
              className="text-lg text-muted-foreground mb-8 max-w-xl mx-auto lg:mx-0 leading-relaxed"
            >
              I build modern web applications and AI-powered solutions. Based in Tel Aviv, 
              I specialize in creating impactful digital experiences that make a difference.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5, ease: [0.165, 0.84, 0.44, 1] }}
              className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
            >
              <Button
                onClick={() => scrollToSection('#products')}
                className="bg-primary text-primary-foreground hover:bg-primary/90 transition-all duration-200 font-medium px-8 py-6 text-base"
              >
                <Code2 className="mr-2" size={20} />
                View My Products
              </Button>
              <Button
                onClick={() => scrollToSection('#contact')}
                variant="outline"
                className="border-border hover:bg-secondary transition-all duration-200 font-medium px-8 py-6 text-base"
              >
                Get In Touch
              </Button>
            </motion.div>
          </div>

          {/* Profile Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.4, ease: [0.165, 0.84, 0.44, 1] }}
            className="flex justify-center items-center order-1 lg:order-2"
          >
            <div className="relative">
              {/* Glow effect */}
              <div className="absolute inset-0 bg-primary/10 rounded-full blur-3xl scale-110" />
              
              {/* Image container */}
              <motion.div
                className="relative w-64 h-64 sm:w-80 sm:h-80 rounded-full overflow-hidden shadow-xl"
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
              >
                <img
                  src="/images/1747380383003.jpg"
                  alt="Eyal Porat"
                  className="w-full h-full object-cover"
                />
              </motion.div>

              {/* Floating skill badges with emojis */}
              {skills.map((skill, index) => (
                <motion.div
                  key={skill.label}
                  className="absolute px-4 py-2 bg-card/90 backdrop-blur-sm rounded-xl shadow-lg"
                  style={{
                    top: index === 0 ? '-10px' : index === 1 ? 'auto' : index === 2 ? '40%' : 'auto',
                    right: index === 0 ? '-10px' : index === 2 ? '-60px' : 'auto',
                    bottom: index === 1 ? '-10px' : index === 3 ? '20%' : 'auto',
                    left: index === 1 ? '-10px' : index === 3 ? '-50px' : 'auto',
                  }}
                  animate={{ y: [0, index % 2 === 0 ? -5 : 5, 0] }}
                  transition={{ duration: 3 + index * 0.3, repeat: Infinity, ease: 'easeInOut' }}
                >
                  <span className="text-lg mr-2">{skill.emoji}</span>
                  <span className="text-sm font-medium text-foreground">{skill.label}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 0.6 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <motion.button
          onClick={() => scrollToSection('#about')}
          className="flex flex-col items-center gap-2 text-muted-foreground hover:text-primary transition-colors duration-200"
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
        >
          <span className="text-xs">Scroll Down</span>
          <ArrowDown size={20} />
        </motion.button>
      </motion.div>
    </section>
  );
}
