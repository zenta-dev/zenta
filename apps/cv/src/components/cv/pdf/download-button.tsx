"use client";

import { CVSchemaValue } from "@/schemas/cv";
import { Button, DownloadIcon } from "@packages/ui";
import { cn, RawUserMetaData } from "@packages/utils";

export const DownloadButton = ({
  className,
  initialData,
}: {
  className?: string;
  initialData?: CVSchemaValue & {
    user: {
      raw_user_meta_data: RawUserMetaData;
    };
  };
}) => {
  return (
    <Button className={cn(className)}>
      <DownloadIcon />
      Download PDF
    </Button>
  );
};
