"use client";

import * as Editor from "@/components/editor/editor";

export default function Page() {
  return (
    <main className="mx-auto w-full max-w-7xl py-10">
      <Editor.Provider
        content={`<h1>The Complete Guide to Modern Web Development</h1><p><strong><em><s><u>Web development has evolved significantly over the past decade</u></s></em></strong>. What once required multiple tools and complex setups can now be accomplished with modern frameworks and libraries that prioritize developer experience.</p><h2>Getting Started</h2><p><code>Before diving into</code> the technical details, it's important to understand the foundational concepts that make modern web development possible.</p><blockquote><p>"The best code is no code at all. Every new line of code you willingly bring into the world is code that has to be debugged, code that has to be read and understood." - Jeff Atwood</p></blockquote><p>This philosophy guides much of modern development practices, emphasizing simplicity and maintainability over complexity.</p><hr><h2>Key Technologies</h2><p>Here are the essential technologies every web developer should be familiar with:</p><ul><li><p>HTML5 and semantic markup</p></li><li><p>CSS3 with modern layout techniques</p><ul><li><p>Flexbox for one-dimensional layouts</p></li><li><p>Grid for two-dimensional layouts</p></li><li><p>Custom properties (CSS variables)</p></li></ul></li><li><p>JavaScript (ES6+)</p></li><li><p>TypeScript for type safety</p></li></ul><h3>Framework Comparison</h3><p>Choosing the right framework depends on your project requirements:</p><ol><li><p>React - Component-based UI library</p></li><li><p>Vue - Progressive framework</p></li><li><p>Angular - Full-featured platform</p></li><li><p>Svelte - Compile-time framework</p></li></ol><hr><h2>Best Practices</h2><p>Following established best practices ensures your code remains maintainable and scalable.</p><blockquote><p>Always write code as if the person who ends up maintaining it is a violent psychopath who knows where you live.</p></blockquote><h3>Code Organization</h3><p>A well-organized codebase is crucial for long-term project success. Consider these principles:</p><ul><li><p>Separation of concerns</p></li><li><p>DRY (Don't Repeat Yourself)</p></li><li><p>KISS (Keep It Simple, Stupid)</p></li></ul><p>By following these guidelines, you'll create applications that are easier to maintain, test, and extend over time.</p>`}
        onUpdate={(e) => {
          console.log(e);
        }}
      >
        <Editor.Box className="p-2" />
      </Editor.Provider>
    </main>
  );
}
