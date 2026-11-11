import type { ReactNode } from "react";

type ContainerProps = {
  children: ReactNode;
  className?: string;
} & Record<`data-${string}`, string | boolean>;

export function Container({ children, className = "", ...data }: ContainerProps) {
  return (
    <div className={`container ${className}`.trim()} {...data}>{children}</div>
  );
}
