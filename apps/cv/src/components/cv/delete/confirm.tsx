"use client";

import { api } from "@/trpc/react";
import { Button, toast } from "@packages/ui";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export const DeleteCVConfirm = ({
  id,
  title,
  className,
}: {
  id: string;
  title: string;
  className?: string;
}) => {
  const router = useRouter();
  const cvTRPC = api.cv.delete.useMutation();
  const { isSuccess, isPending, isError, error } = cvTRPC;

  useEffect(() => {
    toast.dismiss();
    if (isSuccess) {
      toast.success(`"${title}" deleted successfully`);
      router.refresh();
    }
    if (isError) {
      toast.error(error.message || `Failed to delete "${title}"`);
    }
    if (isPending) {
      toast.loading(`Deleting "${title}"...`);
    }
  }, [isSuccess, isPending, isError]);

  const handleDelete = async () => {
    await cvTRPC.mutateAsync({
      id,
    });
  };

  return (
    <Button variant="destructive" onClick={handleDelete}>
      Delete
    </Button>
  );
};
