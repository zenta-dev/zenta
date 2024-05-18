export * from "./Editor";

import { Blockquote } from "@tiptap/extension-blockquote";
import { Bold } from "@tiptap/extension-bold";
import { BubbleMenu } from "@tiptap/extension-bubble-menu";
import { BulletList } from "@tiptap/extension-bullet-list";
import { CharacterCount } from "@tiptap/extension-character-count";
import { Code } from "@tiptap/extension-code";
import { CodeBlockLowlight } from "@tiptap/extension-code-block-lowlight";
import { Document } from "@tiptap/extension-document";
import { Dropcursor } from "@tiptap/extension-dropcursor";
import { Gapcursor } from "@tiptap/extension-gapcursor";
import { HardBreak } from "@tiptap/extension-hard-break";
import { Heading } from "@tiptap/extension-heading";
import { Highlight } from "@tiptap/extension-highlight";
import { History } from "@tiptap/extension-history";
import { HorizontalRule } from "@tiptap/extension-horizontal-rule";
import { Image } from "@tiptap/extension-image";
import { Italic } from "@tiptap/extension-italic";
import { Link } from "@tiptap/extension-link";
import { ListItem } from "@tiptap/extension-list-item";
import { OrderedList } from "@tiptap/extension-ordered-list";
import { Paragraph } from "@tiptap/extension-paragraph";
import { Placeholder } from "@tiptap/extension-placeholder";
import { Strike } from "@tiptap/extension-strike";
import { Subscript } from "@tiptap/extension-subscript";
import { Superscript } from "@tiptap/extension-superscript";
import { Table } from "@tiptap/extension-table";
import { TableCell } from "@tiptap/extension-table-cell";
import { TableHeader } from "@tiptap/extension-table-header";
import { TableRow } from "@tiptap/extension-table-row";
import { TaskItem } from "@tiptap/extension-task-item";
import { TaskList } from "@tiptap/extension-task-list";
import { Text } from "@tiptap/extension-text";
import { TextAlign } from "@tiptap/extension-text-align";
import { Typography } from "@tiptap/extension-typography";
import { Underline } from "@tiptap/extension-underline";
import { Youtube } from "@tiptap/extension-youtube";
import { Extensions } from "@tiptap/react";
import cpp from "highlight.js/lib/languages/cpp";
import csharp from "highlight.js/lib/languages/csharp";
import css from "highlight.js/lib/languages/css";
import dart from "highlight.js/lib/languages/dart";
import java from "highlight.js/lib/languages/java";
import javascript from "highlight.js/lib/languages/javascript";
import json from "highlight.js/lib/languages/json";
import kotlin from "highlight.js/lib/languages/kotlin";
import markdown from "highlight.js/lib/languages/markdown";
import php from "highlight.js/lib/languages/php";
import plaintext from "highlight.js/lib/languages/plaintext";
import python from "highlight.js/lib/languages/python";
import rust from "highlight.js/lib/languages/rust";
import shell from "highlight.js/lib/languages/shell";
import sql from "highlight.js/lib/languages/sql";
import typescript from "highlight.js/lib/languages/typescript";
import xml from "highlight.js/lib/languages/xml";
import yaml from "highlight.js/lib/languages/yaml";
import { all, createLowlight } from "lowlight";

const lowlight = createLowlight(all);
lowlight.register({
  xml,
  typescript,
  cpp,
  java,
  python,
  csharp,
  php,
  css,
  javascript,
  json,
  markdown,
  plaintext,
  shell,
  sql,
  yaml,
  dart,
  kotlin,
  rust,
});

export const extensions: Extensions = [
  Document,
  Text,
  Heading.configure({
    levels: [1, 2, 3],
  }),
  Blockquote.configure({
    HTMLAttributes: {
      class: "border-l-4 border-gray-600 italic my-4 pl-4 py-2",
    },
  }),
  TaskList.configure({}),
  TaskItem.configure({
    nested: true,
  }),
  CodeBlockLowlight.configure({
    // defaultLanguage: "plaintext",
    languageClassPrefix: "language-",
    lowlight,
  }),
  HardBreak.configure({}),
  HorizontalRule.configure({
    // HTMLAttributes: {
    //   class: "my-custom-class",
    // },
  }),
  Dropcursor,
  Image,
  BulletList.configure({
    HTMLAttributes: {
      class: "list-disc ml-4",
    },
  }),
  OrderedList,
  ListItem,
  Paragraph.configure({}),
  Table.configure({
    resizable: true,
  }),
  TableRow,
  TableHeader,
  TableCell,
  Youtube,
  Gapcursor,
  Placeholder.configure({
    placeholder: "Write something.",
  }),
  TextAlign.configure({
    types: ["heading", "paragraph"],
  }),
  Typography,
  CharacterCount,
  BubbleMenu,
  Bold,
  Code,
  Highlight.configure({ multicolor: true }),
  Italic,
  Link.configure({
    HTMLAttributes: {
      rel: "noopener noreferrer",
      target: null,
    },
    protocols: ["ftp", "mailto"],
    autolink: false,
  }),
  Strike,
  Subscript,
  Superscript,
  Underline,
  History,
] as const;
