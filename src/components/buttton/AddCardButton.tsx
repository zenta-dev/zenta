import { cn } from "@/lib/utils";
import { TiPlus } from "react-icons/ti";
import { Button } from "../ui/button";

export const AddCardButton = ({
  onClick,
  className,
}: {
  onClick: () => void;
  className?: string;
}) => {
  return (
    <div
      className={cn("min-h-96 flex items-center border rounded-xl", className)}
    >
      <Button
        onClick={onClick}
        variant="outline"
        type="button"
        className="mx-auto py-4 h-16 gap-2"
      >
        <TiPlus className="h-8 w-8" />
        <span>Add Founder</span>
      </Button>
    </div>
  );
};
