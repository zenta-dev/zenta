import { cn } from "@/lib/utils";

export const Separator = ({
  orientation = "horizontal",
  className,
  ...props
}: {
  orientation?: "horizontal" | "vertical";
  className?: string;
}) => {
  return (
    <hr
      role="separator"
      aria-orientation="horizontal"
      className={cn(
        "shrink-0 bg-border mx-auto",
        orientation === "horizontal" ? "h-[1px] w-full" : "h-full w-[1px]",
        className
      )}
      {...props}
    />
  );
};
