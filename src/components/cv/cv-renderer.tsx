"use client";

import { motion } from "framer-motion";
import { CompactSenior } from "@/components/cv/layouts/compact-senior";
import { SingleColumnATS } from "@/components/cv/layouts/single-column-ats";
import { TwoColumnModern } from "@/components/cv/layouts/two-column-modern";
import type { Resume } from "@/lib/schema/resume";
import { cn } from "@/lib/utils";

export function CVRenderer({
  resume,
  className,
  id = "cv-preview",
  animate = true,
}: {
  resume: Resume;
  className?: string;
  id?: string;
  animate?: boolean;
}) {
  const layout = resume.meta.layout;

  const content = (() => {
    switch (layout) {
      case "single-column-ats":
        return <SingleColumnATS resume={resume} />;
      case "compact-senior":
        return <CompactSenior resume={resume} />;
      case "two-column-modern":
      default:
        return <TwoColumnModern resume={resume} />;
    }
  })();

  const Wrapper = animate ? motion.div : "div";
  const motionProps = animate
    ? {
        initial: { opacity: 0, y: 8 },
        animate: { opacity: 1, y: 0 },
        transition: { duration: 0.35, ease: [0.25, 0.1, 0.25, 1] as const },
      }
    : {};

  return (
    <Wrapper
      id={id}
      className={cn(
        "cv-paper rounded-lg border border-cv shadow-sm p-8 md:p-10 print:shadow-none print:border-0 print:p-0",
        className,
      )}
      {...motionProps}
    >
      {content}
    </Wrapper>
  );
}
