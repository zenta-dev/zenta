"use client";

import { EditorContent, JSONContent, useEditor } from "@tiptap/react";
import { useEffect, useState } from "react";
import { extensions } from ".";
import { BubbleMenu } from "./BubbleMenu";
import { MenuBar } from "./MenuBar";
import "./style.css";

export const Editor = ({
  onChange,
  content,
  setWordCount,
}: {
  onChange: (content: JSONContent) => void;
  content: JSONContent;
  setWordCount: (wordCount: number) => void;
}) => {
  const [mounted, setMounted] = useState(false);
  const [words, setWords] = useState(0);

  const editor = useEditor({
    extensions,
    content: content,
    onUpdate: ({ editor }) => {
      const json = editor.getJSON();
      onChange(json);

      const words = editor.storage.characterCount.words();
      setWords(words);
      setWordCount(words);
    },
  });

  useEffect(() => {
    if (!mounted) {
      setMounted(true);
    }
  }, [mounted]);

  if (!editor || !mounted) {
    return null;
  }

  return (
    <div className="border p-2">
      {editor && <BubbleMenu editor={editor} />}
      <MenuBar editor={editor} />
      <EditorContent editor={editor} />
      {words > 0 && (
        <div className="text-right text-gray-500 text-sm">{words} words</div>
      )}
    </div>
  );
};
