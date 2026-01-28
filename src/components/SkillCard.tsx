import { motion } from 'framer-motion';

interface SkillCardProps {
  emoji: string;
  title: string;
  skills: string[];
}

export function SkillCard({ emoji, title, skills }: SkillCardProps) {
  return (
    <motion.div
      className="bg-secondary dark:bg-[#101318] rounded-2xl p-6 transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
      whileHover={{ y: -4 }}
    >
      <div className="flex items-center gap-4 mb-4">
        <motion.div
          className="text-3xl"
          whileHover={{ scale: 1.1 }}
        >
          {emoji}
        </motion.div>
        <h3 className="text-lg font-semibold text-foreground">{title}</h3>
      </div>
      <div className="flex flex-wrap gap-2">
        {skills.map((skill) => (
          <span
            key={skill}
            className="px-3 py-1.5 bg-background/80 dark:bg-[#1a1f2a] text-muted-foreground text-sm rounded-full transition-colors duration-200 hover:bg-primary/10 hover:text-primary"
          >
            {skill}
          </span>
        ))}
      </div>
    </motion.div>
  );
}
