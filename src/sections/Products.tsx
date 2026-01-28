import { AnimatedSection, StaggerContainer, StaggerItem } from '@/components/AnimatedSection';
import { ProjectCard } from '@/components/ProjectCard';

const products = [
  {
    title: 'Hivest',
    description:
      'A social network for smarter investing. Connect with real investors, share portfolios, and learn from the community. Features secure portfolio tracking via broker integration and competitive leaderboards.',
    images: [
      '/images/hivest/logoApp.png',
      '/images/hivest/image1.png',
      '/images/hivest/WhatsApp%20Image%202026-01-24%20at%2016.07.48.jpeg',
      '/images/hivest/WhatsApp%20Image%202026-01-244545%20at%2016.07.48.jpeg',
    ],
    techStack: ['TypeScript', 'Node.js', 'Mobile App', 'iOS'],
    liveUrl: 'https://hivest.app',
    githubUrl: 'https://github.com/PoratEyal/hivestWebsite',
  },
  {
    title: 'ActivityWiz',
    description:
      'AI-powered activity creation platform for youth movement instructors. Generate custom activities or choose from a curated database of ready-made educational content.',
    images: [
      '/images/activityWiz/Screenshot%202026-01-28%20222013.png',
      '/images/activityWiz/Screenshot%202026-01-28%20222102.png',
      '/images/activityWiz/Screenshot%202026-01-28%20222135.png',
      '/images/activityWiz/Screenshot%202026-01-28%20222152.png',
      '/images/activityWiz/Screenshot%202026-01-28%20222202.png',
      '/images/activityWiz/Screenshot%202026-01-28%20222226.png',
    ],
    techStack: ['TypeScript', 'AI/ML', 'React', 'Hebrew UI'],
    liveUrl: 'https://activitywiz.com/he/youth',
  },
  {
    title: 'Shift Planner',
    description:
      'Web-based shift management application. Allows users to manage and view work shifts for current and upcoming weeks with an intuitive calendar interface.',
    images: [
      '/images/shift/311243396-ba4304f1-0370-4ff0-9f5a-60dcb3833622.png',
      '/images/shift/311243405-dc5d5935-6a27-4dd0-9c2f-02fdc7469af2.png',
      '/images/shift/311243411-c4f0aba8-953e-4927-b14c-7456853f07c7.png',
      '/images/shift/311243415-ce64d5b4-a80a-42ef-adf5-38641ac7cb26.png',
      '/images/shift/311243419-c6dbad8a-e897-4d4c-8728-b97c9376ac61.png',
      '/images/shift/311243534-c0cc9adb-b401-4ad0-801e-d75dd5e11467.png',
    ],
    techStack: ['JavaScript', 'Node.js', 'Express'],
    githubUrl: 'https://github.com/PoratEyal/Shift-Planner',
  },
];

export function Products() {
  return (
    <section id="products" className="py-24 bg-secondary/30">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <AnimatedSection>
            <span className="text-primary text-sm font-semibold uppercase tracking-wider">
              My Work
            </span>
          </AnimatedSection>

          <AnimatedSection delay={0.1}>
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground mt-4 mb-4">
              Featured <span className="text-primary">Products</span>
            </h2>
          </AnimatedSection>

          <AnimatedSection delay={0.2}>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              A selection of products I've built, ranging from AI-powered applications 
              to social platforms and productivity tools.
            </p>
          </AnimatedSection>
        </div>

        {/* Products Grid */}
        <StaggerContainer
          className="grid md:grid-cols-2 gap-8"
          staggerDelay={0.15}
        >
          {products.map((product) => (
            <StaggerItem key={product.title}>
              <ProjectCard {...product} />
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
}
