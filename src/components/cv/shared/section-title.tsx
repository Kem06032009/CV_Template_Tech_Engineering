import { cn } from "@/lib/utils";

export function SectionTitle({
  children,
  className,
  variant = "default",
}: {
  children: React.ReactNode;
  className?: string;
  variant?: "default" | "sidebar" | "compact";
}) {
  return (
    <h2
      className={cn(
        "font-semibold tracking-tight text-[var(--cv-fg)]",
        variant === "default" &&
          "text-sm uppercase tracking-widest text-cv-muted mb-3 pb-2 border-b border-cv",
        variant === "sidebar" &&
          "text-xs uppercase tracking-widest text-cv-accent mb-3",
        variant === "compact" &&
          "text-xs uppercase tracking-wider text-cv-muted mb-2",
        className,
      )}
    >
      {children}
    </h2>
  );
}
