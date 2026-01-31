"use client";

import * as Editor from "@/components/editor/editor";

export default function Page() {
  return (
    <main className="mx-auto w-full max-w-7xl py-10">
      <Editor.Root>
        <Editor.Editor
          content={"<h1>Hello, Editor!</h1>"}
          className="border p-2"
          onContentUpdate={(e) => {
            console.log(e);
          }}
        />
      </Editor.Root>
    </main>
  );
}
