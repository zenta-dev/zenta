import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
  Button,
  Separator,
} from "@packages/ui";
import { CreateCVForm } from "./form";

export const CreateCVDialog = () => {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button>Create New CV</Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Create New CV</AlertDialogTitle>
          <AlertDialogDescription>
            Fill title to create new CV
          </AlertDialogDescription>
        </AlertDialogHeader>
        <Separator className="w-full" />
        <CreateCVForm />
      </AlertDialogContent>
    </AlertDialog>
  );
};
