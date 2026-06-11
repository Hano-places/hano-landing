import type { ReactNode } from "react";

type SectionProps = {
  id?: string;
  children: ReactNode;
  className?: string;
  ariaLabelledBy?: string;
  topMargin?: boolean;
};

export function Section({
  id,
  children,
  className = "",
  ariaLabelledBy,
  topMargin = false,
}: SectionProps) {
  return (
    <section
      id={id}
      className={`${topMargin ? "section-top-margin" : ""} ${className}`.trim()}
      aria-labelledby={ariaLabelledBy}
    >
      {children}
    </section>
  );
}
