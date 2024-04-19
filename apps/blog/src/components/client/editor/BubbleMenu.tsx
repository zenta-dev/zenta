import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  CodeIcon,
  FontBoldIcon,
  StrikethroughIcon,
} from "@radix-ui/react-icons";
import { Editor, BubbleMenu as TiptapBubbleMenu } from "@tiptap/react";
import { FaSubscript, FaSuperscript, FaUnderline } from "react-icons/fa6";

const highlightColors = {
  yellow: "#FFEB3B",
  green: "#CDDC39",
  blue: "#2196F3",
  red: "#F44336",
  purple: "#9C27B0",
  gray: "#9E9E9E",
  pink: "#E91E63",
  orange: "#FF9800",
  teal: "#009688",
  cyan: "#00BCD4",
};

export const BubbleMenu = ({ editor }: { editor: Editor | null }) => {
  function variant(type: string, extra?: any) {
    return editor?.isActive(type, extra) ? "default" : "ghost";
  }

  if (!editor) {
    return null;
  }

  return (
    <TiptapBubbleMenu
      editor={editor}
      tippyOptions={{ duration: 100 }}
      className="bg-neutral-900 rounded p-2"
    >
      {/* Bold */}
      <Button
        onClick={() => editor.chain().focus().toggleBold().run()}
        variant={variant("bold", { level: 1 })}
        type="button"
        className="hover:bg-neutral-700 bg-neutral-800"
      >
        <FontBoldIcon />
      </Button>

      {/* Italic */}
      <Button
        onClick={() => editor.chain().focus().toggleItalic().run()}
        variant={variant("italic")}
        type="button"
        className="hover:bg-neutral-700 bg-neutral-800"
      >
        <span className="italic">I</span>
      </Button>

      {/* Highlight */}
      <Popover>
        <PopoverTrigger>
          <Button type="button" className="hover:bg-neutral-700 bg-neutral-800">
            <span className="bg-yellow-300 text-neutral-900">H</span>
          </Button>
        </PopoverTrigger>
        <PopoverContent className="grid grid-cols-3 gap-1">
          {Object.entries(highlightColors).map(([color, value]) => (
            <Button
              key={color}
              onClick={() =>
                editor.chain().focus().toggleHighlight({ color: value }).run()
              }
              variant={variant("highlight", { color: value })}
              type="button"
              className={`hover:bg-neutral-700 bg-neutral-800`}
              style={{ backgroundColor: value }}
            >
              <span className={`bg-${color}-300 text-neutral-900`}>
                {color[0].toUpperCase()}
              </span>
            </Button>
          ))}
        </PopoverContent>
      </Popover>

      {/* Strike */}
      <Button
        onClick={() => editor.chain().focus().toggleStrike().run()}
        variant={variant("strike")}
        type="button"
        className="hover:bg-neutral-700 bg-neutral-800"
      >
        <StrikethroughIcon />
      </Button>

      {/* Subscript */}
      <Button
        onClick={() => editor.chain().focus().toggleSubscript().run()}
        variant={variant("subscript")}
        type="button"
        className="hover:bg-neutral-700 bg-neutral-800"
      >
        <FaSubscript />
      </Button>

      {/* Superscript */}
      <Button
        onClick={() => editor.chain().focus().toggleSuperscript().run()}
        variant={variant("superscript")}
        type="button"
        className="hover:bg-neutral-700 bg-neutral-800"
      >
        <FaSuperscript />
      </Button>

      {/* UnderLine */}
      <Button
        onClick={() => editor.chain().focus().toggleUnderline().run()}
        variant={variant("underline")}
        type="button"
        className="hover:bg-neutral-700 bg-neutral-800"
      >
        <FaUnderline />
      </Button>

      {/* Link */}
      <Popover>
        <PopoverTrigger>
          <Button type="button" className="hover:bg-neutral-700 bg-neutral-800">
            <span className="underline text-white">L</span>
          </Button>
        </PopoverTrigger>
        <PopoverContent>
          <Input
            placeholder="https://example.com"
            className="w-48"
            type="url"
            onKeyUp={(e) => {
              if (e.key === "Enter") {
                const url = e.currentTarget.value;
                if (
                  !url ||
                  !url.includes("http") ||
                  url === "" ||
                  url === " "
                ) {
                  editor
                    .chain()
                    .focus()
                    .extendMarkRange("link")
                    .unsetLink()
                    .run();

                  return;
                }

                editor
                  .chain()
                  .focus()
                  .extendMarkRange("link")
                  .setLink({ href: url })
                  .run();
              }
            }}
          />
        </PopoverContent>
      </Popover>

      {/* Code */}
      <Button
        onClick={() => editor.chain().focus().toggleCode().run()}
        variant={variant("code")}
        type="button"
        className="hover:bg-neutral-700 bg-neutral-800"
      >
        <CodeIcon />
      </Button>
    </TiptapBubbleMenu>
  );
};
