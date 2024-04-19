"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { CodeIcon } from "@radix-ui/react-icons";
import { Editor } from "@tiptap/react";
import { CldUploadWidget } from "next-cloudinary";
import { ChangeEvent, useEffect, useState } from "react";
import { AiOutlineOrderedList } from "react-icons/ai";
import {
  CiImageOn,
  CiTextAlignCenter,
  CiTextAlignJustify,
  CiTextAlignLeft,
  CiTextAlignRight,
} from "react-icons/ci";
import { FaParagraph, FaTable, FaYoutube } from "react-icons/fa6";
import { MdHorizontalRule, MdOutlineInsertPageBreak } from "react-icons/md";
import { PiListBullets, PiQuotesDuotone } from "react-icons/pi";
import { RiTaskLine } from "react-icons/ri";
import { Modal } from "../modal";

export const MenuBar = ({ editor }: { editor: Editor | null }) => {
  const [isMounted, setIsMounted] = useState(false);
  const [ytopen, seYtOpen] = useState(false);
  const [ytUrl, setYtUrl] = useState<string | null>(null);
  const [ytError, setYtError] = useState<string | null>(null);
  const [cldOpen, setCldOpen] = useState(false);
  const [cldAttrs, setCldAttrs] = useState<any>({});

  useEffect(() => {
    if (editor && !isMounted) {
      setIsMounted(true);
    }
  }, [editor, isMounted]);

  if (!isMounted || !editor) {
    return null;
  }

  const preset = process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET || "";

  const onImgUpload = (attr: any) => {
    const url = attr.src;
    const title = attr.title;
    const alt = attr.alt;
    console.log(attr);
    if (url) {
      editor
        ?.chain()
        .focus()
        .setImage({ src: url, title: title, alt: alt })
        .run();
    }
  };

  const onConfirm = () => {
    if (ytUrl) {
      editor?.chain().focus().setYoutubeVideo({ src: ytUrl }).run();
    }
    seYtOpen(false);
  };

  function updateYTUrl(e: ChangeEvent<HTMLInputElement>) {
    const url = e.target.value;

    if (!url) {
      setYtError("Please enter a valid URL.");
    } else if (!url.includes("youtube.co") && !url.includes("youtu.be")) {
      setYtError("Please enter a valid Youtube URL.");
    } else {
      setYtError(null);
    }

    setYtUrl(url);
  }

  function variant(type: string, extra?: any) {
    return editor?.isActive(type, extra) ? "default" : "ghost";
  }

  return (
    <section className="border flex gap-1 flex-wrap">
      {/* Heading 1 */}
      <Button
        onClick={() =>
          editor?.chain().focus().toggleHeading({ level: 1 }).run()
        }
        variant={variant("heading", { level: 1 })}
        type="button"
      >
        H1
      </Button>
      {/* Heading 2 */}
      <Button
        onClick={() =>
          editor?.chain().focus().toggleHeading({ level: 2 }).run()
        }
        variant={variant("heading", { level: 2 })}
        type="button"
      >
        H2
      </Button>
      {/* Heading 3 */}
      <Button
        onClick={() =>
          editor?.chain().focus().toggleHeading({ level: 3 }).run()
        }
        variant={variant("heading", { level: 3 })}
        type="button"
      >
        H3
      </Button>
      {/* Paragraph */}
      <Button
        onClick={() => editor?.chain().focus().setParagraph().run()}
        variant={variant("paragraph")}
        type="button"
      >
        <FaParagraph />
      </Button>
      {/* Text Align Popover */}
      <Popover>
        <PopoverTrigger role="button" type="button">
          {editor?.isActive({ textAlign: "left" }) && (
            <Button role="button" type="button" variant="ghost">
              <CiTextAlignLeft />
            </Button>
          )}
          {editor?.isActive({ textAlign: "center" }) && (
            <Button role="button" type="button" variant="ghost">
              <CiTextAlignCenter />
            </Button>
          )}
          {editor?.isActive({ textAlign: "right" }) && (
            <Button role="button" type="button" variant="ghost">
              <CiTextAlignRight />
            </Button>
          )}
          {editor?.isActive({ textAlign: "justify" }) && (
            <Button role="button" type="button" variant="ghost">
              <CiTextAlignJustify />
            </Button>
          )}
        </PopoverTrigger>
        <PopoverContent>
          <Button
            onClick={() => editor?.chain().focus().setTextAlign("left").run()}
            variant={
              editor?.isActive({ textAlign: "left" }) ? "default" : "ghost"
            }
            type="button"
          >
            <CiTextAlignLeft />
          </Button>
          <Button
            onClick={() => editor?.chain().focus().setTextAlign("center").run()}
            variant={
              editor?.isActive({ textAlign: "center" }) ? "default" : "ghost"
            }
            type="button"
          >
            <CiTextAlignCenter />
          </Button>
          <Button
            onClick={() => editor?.chain().focus().setTextAlign("right").run()}
            variant={
              editor?.isActive({ textAlign: "right" }) ? "default" : "ghost"
            }
            type="button"
          >
            <CiTextAlignRight />
          </Button>
          <Button
            onClick={() =>
              editor?.chain().focus().setTextAlign("justify").run()
            }
            variant={
              editor?.isActive({ textAlign: "justify" }) ? "default" : "ghost"
            }
            type="button"
          >
            <CiTextAlignJustify />
          </Button>
        </PopoverContent>
      </Popover>
      {/* Block Qoute */}
      <Button
        onClick={() => editor?.chain().focus().toggleBlockquote().run()}
        variant={variant("blockqoute")}
        type="button"
      >
        <PiQuotesDuotone />
      </Button>
      {/* Task List */}
      <Button
        onClick={() => editor?.chain().focus().toggleTaskList().run()}
        variant={variant("tasklist")}
        type="button"
      >
        <RiTaskLine />
      </Button>
      {/* Code Block */}
      <Button
        onClick={() => editor?.chain().focus().toggleCodeBlock().run()}
        variant={variant("codeBlock")}
        type="button"
      >
        <CodeIcon />
      </Button>
      {/* Hard Break */}
      <Button
        onClick={() => editor?.chain().focus().setHardBreak().run()}
        variant={variant("hardbreak")}
        type="button"
      >
        <MdOutlineInsertPageBreak />
      </Button>
      {/* Horizontal Rule */}
      <Button
        onClick={() => editor?.chain().focus().setHorizontalRule().run()}
        variant={variant("horizontalRule")}
        type="button"
      >
        <MdHorizontalRule />
      </Button>
      {/* Image */}
      <Modal
        title="Specify Image Details"
        description="Specify the details of the image you want to embed."
        isOpen={cldOpen}
        onClose={() => setCldOpen(false)}
      >
        <Input
          placeholder="Image Name"
          className="mt-2"
          onChange={(e) => {
            setCldAttrs({ ...cldAttrs, title: e.target.value });
          }}
        />

        <Input
          placeholder="Image alt text"
          className="mt-2"
          onChange={(e) => {
            setCldAttrs({ ...cldAttrs, alt: e.target.value });
          }}
        />
        <div className="pt-6 space-x-2 flex items-center justify-end w-full">
          <Button variant="outline" onClick={() => setCldOpen(false)}>
            Cancel
          </Button>
          <Button
            onClick={() => {
              onImgUpload(cldAttrs);
              setCldOpen(false);
            }}
          >
            Continue
          </Button>
        </div>
      </Modal>
      <CldUploadWidget
        onSuccess={(result: any) => {
          if (result.info.secure_url) {
            setCldOpen(true);
            setCldAttrs({ src: result.info.secure_url });
          }
          // onImgUpload(result);
        }}
        uploadPreset={preset}
        signatureEndpoint="/api/sign-cloudinary-params"
        options={{
          sources: ["local", "url", "unsplash"],
          multiple: false,
          maxFiles: 1,
        }}
      >
        {({ open }) => {
          const onClick = () => {
            open();
          };

          return (
            <Button type="button" variant={variant("image")} onClick={onClick}>
              <CiImageOn />
            </Button>
          );
        }}
      </CldUploadWidget>
      {/* Bullet List */}
      <Button
        onClick={() => editor?.chain().focus().toggleBulletList().run()}
        variant={variant("bulletList")}
        type="button"
      >
        <PiListBullets />
      </Button>
      {/* Ordered List */}
      <Button
        onClick={() => editor?.chain().focus().toggleOrderedList().run()}
        variant={variant("orderedList")}
        type="button"
      >
        <AiOutlineOrderedList />
      </Button>
      {/* Table */}
      <Button
        onClick={() =>
          editor
            ?.chain()
            .focus()
            .insertTable({ rows: 3, cols: 3, withHeaderRow: true })
            .run()
        }
        variant={variant("table")}
        type="button"
      >
        <FaTable />
      </Button>
      <Button
        variant={variant("youtube")}
        type="button"
        onClick={() => seYtOpen(true)}
      >
        <FaYoutube />
      </Button>
      <Modal
        title="Insert Youtube Video"
        description="Paste the URL of the video you want to embed."
        isOpen={ytopen}
        onClose={() => seYtOpen(false)}
      >
        <Input
          placeholder="Youtube URL"
          // value={ytUrl || ""}
          onChange={updateYTUrl}
        />
        {ytError && <p className="text-red-500">{ytError}</p>}
        <div className="pt-6 space-x-2 flex items-center justify-end w-full">
          <Button variant="outline" onClick={() => seYtOpen(true)}>
            Cancel
          </Button>
          <Button onClick={onConfirm}>Continue</Button>
        </div>
      </Modal>
    </section>
  );
};
