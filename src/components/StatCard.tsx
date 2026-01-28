import { useCountUp } from '@/hooks/useCountUp';

interface StatCardProps {
  value: number;
  label: string;
  suffix?: string;
}

export function StatCard({ value, label, suffix = '' }: StatCardProps) {
  const { count, ref } = useCountUp({
    end: value,
    duration: 2000,
    suffix,
  });

  return (
    <div ref={ref} className="text-center">
      <div className="text-4xl md:text-5xl font-bold text-primary mb-2">
        {count}
      </div>
      <div className="text-muted-foreground text-sm">{label}</div>
    </div>
  );
}
