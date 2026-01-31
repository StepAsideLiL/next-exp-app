"use client";

import type { Editor as EditorType, JSONContent } from "@tiptap/core";
import { Placeholder } from "@tiptap/extensions";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { cva, type VariantProps } from "class-variance-authority";
import {
  Bold,
  Code,
  Italic,
  List,
  ListOrdered,
  Strikethrough,
  Underline,
} from "lucide-react";
import React from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import "./editor.css";

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
    StarterKit,
    Placeholder.configure({
      placeholder: "Write something...",
    }),
  ];
}

function EditorRoot({ children }: { children: React.ReactNode }) {
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

const editorContentStyleVariant = cva(
  "[&>.ProseMirror]:focus-visible:border-none [&>.ProseMirror]:focus-visible:shadow-none [&>.ProseMirror]:focus-visible:outline-none",
  {
    variants: {
      variant: {
        default:
          "[&_blockquote]:my-2.5 [&_blockquote]:border-muted-foreground [&_blockquote]:border-l-4 [&_blockquote]:px-5 [&_blockquote]:py-2.5 [&_code]:bg-muted [&_code]:px-1 [&_code]:font-mono [&_em]:italic [&_h1]:font-bold [&_h1]:text-6xl [&_h2]:font-semibold [&_h2]:text-4xl [&_h3]:font-semibold [&_h3]:text-3xl [&_h4]:font-semibold [&_h4]:text-2xl [&_h5]:font-semibold [&_h5]:text-xl [&_h6]:font-semibold [&_h6]:text-lg [&_hr]:border-muted-foreground [&_ol]:list-decimal [&_s]:line-through [&_strong]:font-bold [&_u]:underline [&_ul]:list-disc",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);

type EditorEditorProps = React.ComponentPropsWithRef<"div"> &
  VariantProps<typeof editorContentStyleVariant> & {
    content?: TEditorContent;
    onContentUpdate?: (content: TEditorContent) => void;
  };
function EditorEditor({
  content,
  onContentUpdate,
  className,
  variant,
  ...props
}: EditorEditorProps) {
  const { editor, currentContent, initialContent, setInitialContent } =
    useEditorContext();

  if (!editor) {
    throw new Error("Editor.Editor should be in Editor.Root");
  }

  React.useEffect(() => {
    if (content) {
      setInitialContent(content);
    }
  }, [content, setInitialContent]);

  React.useEffect(() => {
    if (onContentUpdate) {
      onContentUpdate(currentContent ? currentContent : initialContent);
    }
  }, [onContentUpdate, currentContent, initialContent]);

  return (
    <EditorContent
      editor={editor}
      className={cn(
        editorContentStyleVariant({
          variant,
          className,
        }),
      )}
      {...props}
    />
  );
}

type EditorReadOnlyProps = React.ComponentPropsWithRef<"div"> &
  VariantProps<typeof editorContentStyleVariant>;
function EditorReadOnly({ className, variant, ...props }: EditorReadOnlyProps) {
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

  return (
    <EditorContent
      editor={editor}
      className={cn(
        editorContentStyleVariant({
          variant,
          className,
        }),
      )}
      {...props}
    />
  );
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

const Root = EditorRoot;
const Editor = EditorEditor;
const ReadOnly = EditorReadOnly;
const ToggleBoldBtn = EditorToggleBoldBtn;
const ToggleItalicBtn = EditorToggleItalicBtn;
const ToggleUnderlineBtn = EditorToggleUnderlineBtn;
const ToggleStrikeBtn = EditorToggleStrikeBtn;
const ToggleCodeBtn = EditorToggleCodeBtn;
const ToggleBulletListBtn = EditorToggleBulletListBtn;
const ToggleOrderedListBtn = EditorToggleOrderedListBtn;

export {
  Root,
  Editor,
  ReadOnly,
  ToggleBoldBtn,
  ToggleItalicBtn,
  ToggleUnderlineBtn,
  ToggleStrikeBtn,
  ToggleCodeBtn,
  ToggleBulletListBtn,
  ToggleOrderedListBtn,
};
