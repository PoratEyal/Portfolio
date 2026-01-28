import { AnimatedSection, StaggerContainer, StaggerItem } from '@/components/AnimatedSection';
import { StatCard } from '@/components/StatCard';

const stats = [
  { value: 150, label: 'Users on ActivityWiz', suffix: 'K+' },
  { value: 12, label: 'GitHub Repositories', suffix: '+' },
  { value: 3, label: 'Live Products', suffix: '' },
];

const highlights = [
  {
    emoji: '📍',
    title: 'Location',
    description: 'Tel Aviv, Israel',
  },
  {
    emoji: '💼',
    title: 'Focus',
    description: 'Software Development',
  },
  {
    emoji: '🚀',
    title: 'Specialty',
    description: 'AI & Web Applications',
  },
  {
    emoji: '🔥',
    title: 'Passion',
    description: 'Building Impactful Products',
  },
];

export function About() {
  return (
    <section id="about" className="py-24 bg-background">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left Column - Text */}
          <div>
            <AnimatedSection>
              <span className="text-primary text-sm font-semibold uppercase tracking-wider">
                About Me
              </span>
            </AnimatedSection>

            <AnimatedSection delay={0.1}>
              <h2 className="text-3xl sm:text-4xl font-bold text-foreground mt-4 mb-6">
                Crafting Digital Experiences with{' '}
                <span className="text-primary">Passion</span>
              </h2>
            </AnimatedSection>

            <AnimatedSection delay={0.2}>
              <p className="text-muted-foreground text-lg leading-relaxed mb-6">
                I'm a passionate Software Developer & AI Implementation specialist with experience building web applications, 
                AI tools, and mobile solutions. I love turning complex problems into simple, 
                beautiful, and intuitive solutions.
              </p>
            </AnimatedSection>

            <AnimatedSection delay={0.3}>
              <p className="text-muted-foreground leading-relaxed mb-8">
                My journey in tech has led me to work on diverse products - from social investment 
                platforms to AI-powered educational tools. I'm always eager to learn new technologies 
                and tackle challenging problems.
              </p>
            </AnimatedSection>

            {/* Stats */}
            <AnimatedSection delay={0.4}>
              <div className="grid grid-cols-3 gap-6 pt-8">
                {stats.map((stat) => (
                  <StatCard
                    key={stat.label}
                    value={stat.value}
                    label={stat.label}
                    suffix={stat.suffix}
                  />
                ))}
              </div>
            </AnimatedSection>
          </div>

          {/* Right Column - Highlights */}
          <StaggerContainer className="grid grid-cols-2 gap-4" staggerDelay={0.1}>
            {highlights.map((item) => (
              <StaggerItem key={item.title}>
                <div className="bg-secondary dark:bg-[#101318] rounded-2xl p-6 h-full transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
                  <div className="text-3xl mb-4">{item.emoji}</div>
                  <h3 className="text-foreground font-semibold mb-2">{item.title}</h3>
                  <p className="text-muted-foreground text-sm">{item.description}</p>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </div>
    </section>
  );
}
