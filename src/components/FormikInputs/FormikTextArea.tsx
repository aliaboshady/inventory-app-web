"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import { Bold, Italic, UnderlineIcon, List, ListOrdered } from "lucide-react";
import { Button } from "@/components/ui/button";
import { FormikValues } from "formik";
import { Label } from "../ui/label";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import TextAlign from "@tiptap/extension-text-align";

type Props = {
  formik: FormikValues;
  name: string;
  label?: string;
  placeholder?: string;
};

export default function FormikTextArea({
  formik,
  name,
  label,
  placeholder,
}: Props) {
  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        bulletList: { keepMarks: true },
        orderedList: { keepMarks: true },
      }),
      Underline,
      TextAlign.configure({
        types: ["heading", "paragraph"],
      }),
    ],
    content: formik.values[name],
    onUpdate: ({ editor }) => {
      formik.setFieldValue(name, editor.getHTML());
    },
    immediatelyRender: false,
  });

  if (!editor) return null;

  return (
    <div className="flex flex-col gap-2 relative">
      {label && <Label>{label}</Label>}

      <div className="relative border rounded-lg flex flex-col">
        {/* Toolbar */}
        <div className="flex flex-wrap items-center gap-2 border-b p-2 bg-muted flex-shrink-0">
          <Button
            type="button"
            size="sm"
            variant={editor.isActive("bold") ? "default" : "ghost"}
            onClick={() => editor.chain().focus().toggleBold().run()}
          >
            <Bold className="h-4 w-4" />
          </Button>

          <Button
            type="button"
            size="sm"
            variant={editor.isActive("italic") ? "default" : "ghost"}
            onClick={() => editor.chain().focus().toggleItalic().run()}
          >
            <Italic className="h-4 w-4" />
          </Button>

          <Button
            type="button"
            size="sm"
            variant={editor.isActive("underline") ? "default" : "ghost"}
            onClick={() => editor.chain().focus().toggleUnderline().run()}
          >
            <UnderlineIcon className="h-4 w-4" />
          </Button>

          <Button
            type="button"
            size="sm"
            variant={editor.isActive("bulletList") ? "default" : "ghost"}
            onClick={() => editor.chain().focus().toggleBulletList().run()}
          >
            <List className="h-4 w-4" />
          </Button>

          <Button
            type="button"
            size="sm"
            variant={editor.isActive("orderedList") ? "default" : "ghost"}
            onClick={() => editor.chain().focus().toggleOrderedList().run()}
          >
            <ListOrdered className="h-4 w-4" />
          </Button>
        </div>

        {/* Editor */}
        <EditorContent
          editor={editor}
          className="p-3 prose prose-sm overflow-auto"
        />

        {(!formik.values[name] || formik.values[name] === "<p></p>") && (
          <p className="absolute top-[61px] start-3 text-neutral-400 pointer-events-none">
            {placeholder}
          </p>
        )}
      </div>
    </div>
  );
}
