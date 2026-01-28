import { AnimatedSection, StaggerContainer, StaggerItem } from '@/components/AnimatedSection';
import { ProjectCard } from '@/components/ProjectCard';

const baseUrl = import.meta.env.BASE_URL ?? '/';
const assetUrl = (path: string) =>
  `${baseUrl}${path}`.replace(/([^:]\/)\/+/g, '$1');

const featuredImage = assetUrl('images/image1.png');

const products = [
  {
    title: 'Hivest',
    description:
      'A social network for smarter investing. Connect with real investors, share portfolios, and learn from the community. Features secure portfolio tracking via broker integration and competitive leaderboards.',
    logo: assetUrl('images/hivest/logoApp.png'),
    appStoreUrl: 'https://apps.apple.com/il/app/hivest/id6751804629',
    liveUrl: 'https://hivest.app',
    githubUrl: 'https://github.com/PoratEyal/hivestWebsite',
  },
  {
    title: 'ActivityWiz',
    description:
      'AI-powered activity creation platform for youth movement instructors. Generate custom activities or choose from a curated database of ready-made educational content.',
    logo: assetUrl('images/activityWiz/logo512.png'),
    badge: '150K+ users',
    liveUrl: 'https://activitywiz.com/he/youth',
  },
  {
    title: 'Shift Planner',
    description:
      'Web-based shift management application. Allows users to manage and view work shifts for current and upcoming weeks with an intuitive calendar interface.',
    logo: assetUrl('images/shift/logo512%20(2).png'),
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
        <div className="grid lg:grid-cols-2 gap-16 xl:gap-20 items-center">
          <StaggerContainer
            className="flex flex-col gap-6 order-1"
            staggerDelay={0.15}
          >
            {products.map((product) => (
              <StaggerItem key={product.title}>
                <ProjectCard {...product} />
              </StaggerItem>
            ))}
          </StaggerContainer>

          <div className="relative order-2 hidden lg:block">
            <img
              src={featuredImage}
              alt="My Work showcase"
              className="w-full h-auto object-contain scale-[1.08] lg:scale-110"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
