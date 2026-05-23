import { cn } from "@/lib/utils";
import type { z } from "zod";
import type { proficiencySchema } from "@/lib/schema/resume";

type Proficiency = z.infer<typeof proficiencySchema>;

const LEVELS: Record<Proficiency, number> = {
  familiar: 1,
  intermediate: 2,
  advanced: 3,
  expert: 4,
};

export function ProficiencyDots({
  level,
  className,
}: {
  level?: Proficiency;
  className?: string;
}) {
  if (!level) return null;
  const filled = LEVELS[level];

  return (
    <span
      className={cn("inline-flex gap-0.5 ml-1.5 align-middle", className)}
      aria-label={`Proficiency: ${level}`}
      title={level}
    >
      {[1, 2, 3, 4].map((i) => (
        <span
          key={i}
          className={cn(
            "h-1 w-1 rounded-full",
            i <= filled ? "bg-electric-500" : "bg-graphite-300 dark:bg-graphite-600",
          )}
        />
      ))}
    </span>
  );
}
