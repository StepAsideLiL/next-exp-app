"use client";

import type { Editor as EditorType, JSONContent } from "@tiptap/core";
import { TextStyleKit } from "@tiptap/extension-text-style";
import { Placeholder } from "@tiptap/extensions";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import {
  Bold,
  Code,
  GripVertical,
  Italic,
  List,
  ListOrdered,
  Strikethrough,
  Underline,
} from "lucide-react";
import React, { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import "./editor.css";
import DragHandle from "@tiptap/extension-drag-handle-react";

type TEditorContent = JSONContent | string;
type EditorContextProps = {
  editor: EditorType | null;
  initialContent: TEditorContent;
  setInitialContent: React.Dispatch<React.SetStateAction<string | JSONContent>>;
  currentContent: TEditorContent;
};
const EditorContext = React.createContext<EditorContextProps>({
  editor: null,
  initialContent: "",
  setInitialContent: (content: TEditorContent) => content,
  currentContent: "",
});
export function useEditorContext() {
  const ctx = React.use(EditorContext);
  return ctx;
}

function getExtensions() {
  return [
    StarterKit.configure({
      heading: {
        HTMLAttributes: {
          className: "hello",
        },
      },
    }),
    Placeholder.configure({
      placeholder: "Write something...",
    }),
    TextStyleKit,
  ];
}

function EditorProvider({ children }: { children: React.ReactNode }) {
  const [initialContent, setInitialContent] =
    React.useState<TEditorContent>("");
  const [currentContent, setCurrentContent] =
    React.useState<TEditorContent>("");

  const editor = useEditor(
    {
      extensions: getExtensions(),
      immediatelyRender: false,
      content: initialContent,
      onUpdate: async ({ editor }) => {
        setCurrentContent(editor.getJSON());
      },
    },
    [initialContent],
  );

  if (!editor) {
    return null;
  }

  const value = {
    editor,
    initialContent,
    setInitialContent,
    currentContent,
  };

  return <EditorContext value={value}>{children}</EditorContext>;
}

type EditorBoxProps = React.ComponentPropsWithRef<"div"> & {
  content?: TEditorContent;
  onContentUpdate?: (eidtor: EditorType) => void;
};
function EditorBox({
  content,
  onContentUpdate,
  className,
  ...props
}: EditorBoxProps) {
  const { editor, setInitialContent } = useEditorContext();

  if (!editor) {
    throw new Error("Editor.Box should be in Editor.Root");
  }

  useEffect(() => {
    if (content) {
      setInitialContent(content);
    }
  }, [content, setInitialContent]);

  useEffect(() => {
    editor.on("update", ({ editor }) => {
      if (onContentUpdate) {
        onContentUpdate(editor);
      }
    });
  }, [onContentUpdate, editor]);

  return (
    <>
      <DragHandle
        editor={editor}
        // nested={{ edgeDetection: { threshold: -16 } }}
      >
        <GripVertical className="cursor-pointer" />
      </DragHandle>
      <EditorContent editor={editor} className={cn(className)} {...props} />
    </>
  );
}

type EditorReadOnlyProps = React.ComponentPropsWithRef<"div">;
function EditorReadOnly({ className, ...props }: EditorReadOnlyProps) {
  const ctx = useEditorContext();

  if (!ctx || !ctx.editor) {
    throw new Error("Editor.ReadOnly should be in Editor.Root");
  }

  const editor = useEditor(
    {
      extensions: getExtensions(),
      immediatelyRender: false,
      content:
        typeof ctx.currentContent === "string"
          ? ctx.initialContent
          : ctx.currentContent,
      editable: false,
    },
    [ctx],
  );

  if (editor === null) {
    return <div className="text-destructive">Editor failed to initiate</div>;
  }

  return <EditorContent editor={editor} className={cn(className)} {...props} />;
}

// ========================
// ==== Toggle Buttons ====
// ========================
type EditorToggleBoldBtnProps = React.ComponentPropsWithRef<"button">;
function EditorToggleBoldBtn(props: EditorToggleBoldBtnProps) {
  const { editor } = useEditorContext();

  if (!editor) {
    throw new Error("Editor.ToggleBoldBtn should be in Editor.Root");
  }

  return (
    <Button
      variant={editor.isActive("bold") ? "default" : "outline"}
      size={"icon-sm"}
      className={cn("cursor-pointer", props.className)}
      onClick={() => {
        editor.chain().focus().toggleBold().run();
      }}
      {...props}
    >
      <Bold className="size-4" />
    </Button>
  );
}

type EditorToggleItalicBtnProps = React.ComponentPropsWithRef<"button">;
function EditorToggleItalicBtn(props: EditorToggleItalicBtnProps) {
  const { editor } = useEditorContext();

  if (!editor) {
    throw new Error("Editor.ToggleItalicBtn should be in Editor.Root");
  }

  return (
    <Button
      variant={editor.isActive("italic") ? "default" : "outline"}
      size={"icon-sm"}
      className={cn("cursor-pointer", props.className)}
      onClick={() => {
        editor.chain().focus().toggleItalic().run();
      }}
      {...props}
    >
      <Italic className="size-4" />
    </Button>
  );
}

type EditorToggleUnderlineBtnProps = React.ComponentPropsWithRef<"button">;
function EditorToggleUnderlineBtn(props: EditorToggleUnderlineBtnProps) {
  const { editor } = useEditorContext();

  if (!editor) {
    throw new Error("Editor.ToggleUnderlineBtn should be in Editor.Root");
  }

  return (
    <Button
      variant={editor.isActive("underline") ? "default" : "outline"}
      size={"icon-sm"}
      className={cn("cursor-pointer", props.className)}
      onClick={() => {
        editor.chain().focus().toggleUnderline().run();
      }}
      {...props}
    >
      <Underline className="size-4" />
    </Button>
  );
}

type EditorToggleStrikeBtnProps = React.ComponentPropsWithRef<"button">;
function EditorToggleStrikeBtn(props: EditorToggleStrikeBtnProps) {
  const { editor } = useEditorContext();

  if (!editor) {
    throw new Error("Editor.ToggleStrikeBtn should be in Editor.Root");
  }

  return (
    <Button
      variant={editor.isActive("strike") ? "default" : "outline"}
      size={"icon-sm"}
      className={cn("cursor-pointer", props.className)}
      onClick={() => {
        editor.chain().focus().toggleStrike().run();
      }}
      {...props}
    >
      <Strikethrough className="size-4" />
    </Button>
  );
}

type EditorToggleCodeBtnProps = React.ComponentPropsWithRef<"button">;
function EditorToggleCodeBtn(props: EditorToggleCodeBtnProps) {
  const { editor } = useEditorContext();

  if (!editor) {
    throw new Error("Editor.ToggleCodeBtn should be in Editor.Root");
  }

  return (
    <Button
      variant={editor.isActive("code") ? "default" : "outline"}
      size={"icon-sm"}
      className={cn("cursor-pointer", props.className)}
      onClick={() => {
        editor.chain().focus().toggleCode().run();
      }}
      {...props}
    >
      <Code className="size-4" />
    </Button>
  );
}

type EditorToggleBulletListBtnProps = React.ComponentPropsWithRef<"button">;
function EditorToggleBulletListBtn(props: EditorToggleBulletListBtnProps) {
  const { editor } = useEditorContext();

  if (!editor) {
    throw new Error("Editor.ToggleBulletListBtn should be in Editor.Root");
  }

  return (
    <Button
      variant={editor.isActive("bulletList") ? "default" : "outline"}
      size={"icon-sm"}
      className={cn("cursor-pointer", props.className)}
      onClick={() => {
        editor.chain().focus().toggleBulletList().run();
      }}
      {...props}
    >
      <List className="size-4" />
    </Button>
  );
}

type EditorToggleOrderedListBtnProps = React.ComponentPropsWithRef<"button">;
function EditorToggleOrderedListBtn(props: EditorToggleOrderedListBtnProps) {
  const { editor } = useEditorContext();

  if (!editor) {
    throw new Error("Editor.ToggleOrderedListBtn should be in Editor.Root");
  }

  return (
    <Button
      variant={editor.isActive("orderedList") ? "default" : "outline"}
      size={"icon-sm"}
      className={cn("cursor-pointer", props.className)}
      onClick={() => {
        editor.chain().focus().toggleOrderedList().run();
      }}
      {...props}
    >
      <ListOrdered className="size-4" />
    </Button>
  );
}

export {
  EditorProvider as Provider,
  EditorBox as Box,
  EditorReadOnly as ReadOnly,
  EditorToggleBoldBtn as ToggleBoldBtn,
  EditorToggleItalicBtn as ToggleItalicBtn,
  EditorToggleUnderlineBtn as ToggleUnderlineBtn,
  EditorToggleStrikeBtn as ToggleStrikeBtn,
  EditorToggleCodeBtn as ToggleCodeBtn,
  EditorToggleBulletListBtn as ToggleBulletListBtn,
  EditorToggleOrderedListBtn as ToggleOrderedListBtn,
};
