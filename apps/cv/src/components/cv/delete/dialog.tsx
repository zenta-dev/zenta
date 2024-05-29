import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
  Button,
  TrashIcon,
} from "@packages/ui";
import { DeleteCVConfirm } from "./confirm";

export const DeleteCVDialog = ({
  id,
  title,
  className,
}: {
  id: string;
  title: string;
  className?: string;
}) => {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button className={className} variant="destructive" size="icon">
          <TrashIcon />
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            Delete "<span className="font-bold">{title}</span>"
          </AlertDialogTitle>
          <AlertDialogDescription>
            Are you sure you want to delete this CV?. This action cannot be
            undone.
          </AlertDialogDescription>

          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <DeleteCVConfirm id={id} title={title} />
          </AlertDialogFooter>
        </AlertDialogHeader>
      </AlertDialogContent>
    </AlertDialog>
  );
};
