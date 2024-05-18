import { cn } from "../../index";
import { Button } from "@packages/ui";
import { TiPlus } from "react-icons/ti";

export const AddCardButton = ({
  onClick,
  className,
  name
}: {
  onClick: () => void;
  className?: string;
  name: string;
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
        <span>Add {name}</span>
      </Button>
    </div>
  );
};
