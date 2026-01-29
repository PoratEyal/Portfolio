import { AnimatedSection, StaggerContainer, StaggerItem } from '@/components/AnimatedSection';
import { SkillCard } from '@/components/SkillCard';

const skillCategories = [
  {
    emoji: '💻',
    title: 'Frontend',
    skills: ['React', 'TypeScript', 'React Native', 'HTML/CSS', 'Tailwind CSS'],
  },
  {
    emoji: '⚙️',
    title: 'Backend',
    skills: ['Node.js', 'Express', 'Python', 'C#', 'ASP.NET', 'REST APIs', 'Authentication'],
  },
  {
    emoji: '🤖',
    title: 'AI / ML',
    skills: ['RAG', 'LangChain', 'Vector Databases', 'Prompt Engineering', 'Embeddings'],
  },
  {
    emoji: '🗄️',
    title: 'Database',
    skills: ['MongoDB', 'SQL', 'PostgreSQL', 'Firebase', 'Prisma'],
  },
  {
    emoji: '🛠️',
    title: 'Tools',
    skills: ['Git', 'GitHub', 'VS Code', 'Cursor', 'Docker', 'Figma', 'Postman', 'Jira'],
  },
  {
    emoji: '📱',
    title: 'Mobile',
    skills: ['React Native', 'Expo', 'Android', 'iOS', 'Responsive Design'],
  },
];

export function Skills() {
  return (
    <section id="skills" className="py-24 bg-background">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <AnimatedSection>
            <span className="text-primary text-sm font-semibold uppercase tracking-wider">
              Expertise
            </span>
          </AnimatedSection>

          <AnimatedSection delay={0.1}>
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground mt-4 mb-4">
              Skills & <span className="text-primary">Technologies</span>
            </h2>
          </AnimatedSection>

          <AnimatedSection delay={0.2}>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Technologies and tools I use to bring ideas to life. Always learning 
              and exploring new technologies to stay at the forefront of development.
            </p>
          </AnimatedSection>
        </div>

        {/* Skills Grid */}
        <StaggerContainer
          className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6"
          staggerDelay={0.1}
        >
          {skillCategories.map((category) => (
            <StaggerItem key={category.title}>
              <SkillCard {...category} />
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
}
