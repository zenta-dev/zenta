import { FC, ReactNode } from "react";

interface HeadingProps {
  title: string;
  description: string;
  className?: string;
  children?: ReactNode;
}

export const Heading: FC<HeadingProps> = ({
  title,
  description,
  className,
  children,
}) => {
  return (
    <section aria-labelledby={`${title}-heading`} className={className}>
      <h2 id={`${title}-heading`} className="text-3xl font-bold tracking-tight">
        {title}
      </h2>
      <p
        className="text-sm text-muted-foreground"
        aria-describedby={`${description}-description`}
      >
        {description}
      </p>
      {children}
    </section>
  );
};
