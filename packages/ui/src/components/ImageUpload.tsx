"use client";

import { Button } from "@packages/ui";
import { PersonIcon } from "@radix-ui/react-icons";
import { CldUploadWidget } from "next-cloudinary";
import Image from "next/image";
import { useEffect, useState } from "react";
import { FaRegTrashCan } from "react-icons/fa6";
import { TiPlus } from "react-icons/ti";
import { cn } from "../index";

interface ImageUploadProps {
  preset: string;
  disabled?: boolean;
  onChange: (value: string) => void;
  onRemove: (value: string) => void;
  value: string[] | string | undefined;
  multiple?: boolean;
  maxFiles?: number;
  className?: string;
}

export const ImageUpload: React.FC<ImageUploadProps> = ({
  preset,
  disabled,
  onChange,
  onRemove,
  value,
  multiple = true,
  maxFiles = 5,
  className,
}) => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const onUpload = (result: any) => {
    onChange(result.info.secure_url);
  };

  if (!isMounted) {
    return null;
  }

  return (
    <div className={cn("mx-auto flex flex-col items-center", className)}>
      <div className="mb-4 flex items-center gap-4">
        {value === undefined ? (
          <div className="flex items-center rounded-xl border p-4 ">
            <PersonIcon className="h-32 w-32 text-gray-400" />
          </div>
        ) : Array.isArray(value) ? (
          value.map((url) => (
            <div
              key={url}
              className="relative h-[200px] w-[200px] overflow-hidden rounded-md"
            >
              <div className="absolute right-2 top-2 z-10">
                <Button
                  type="button"
                  onClick={() => onRemove(url)}
                  variant="destructive"
                  size="sm"
                >
                  <FaRegTrashCan className="h-4 w-4" />
                </Button>
              </div>
              <Image
                fill
                className="object-cover"
                alt="Image"
                src={url}
                sizes="200px"
                priority
              />
            </div>
          ))
        ) : (
          <div className="relative h-[200px] w-[200px] overflow-hidden rounded-md">
            {value && (
              <div className="absolute right-2 top-2 z-10">
                <Button
                  type="button"
                  onClick={() => onRemove(value || "")}
                  variant="destructive"
                  size="sm"
                >
                  <FaRegTrashCan className="h-4 w-4" />
                </Button>
              </div>
            )}
            <Image
              fill
              className="object-cover"
              alt="Image"
              src={value || "https://via.placeholder.com/200"}
              sizes="200px"
              priority
            />
          </div>
        )}
      </div>
      <CldUploadWidget
        onSuccess={onUpload}
        uploadPreset={preset}
        signatureEndpoint="/api/sign-cloudinary-params"
        options={{
          sources: ["local", "url", "unsplash"],
          multiple: multiple,
          maxFiles: maxFiles,
          cropping: true,
          croppingShowBackButton: true,
        }}
      >
        {({ open }) => {
          const onClick = () => {
            open();
          };

          return (
            <Button
              type="button"
              disabled={disabled}
              variant="secondary"
              onClick={onClick}
              className="mx-auto flex"
            >
              <TiPlus className="mr-2 h-4 w-4" />
              Upload an Image
            </Button>
          );
        }}
      </CldUploadWidget>
    </div>
  );
};
