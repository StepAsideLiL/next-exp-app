"use client";

import dynamic from "next/dynamic";

const Client = dynamic(() => import("./_client"), { ssr: false });

export default function Page() {
  return (
    <main className="mx-auto w-full max-w-7xl py-10">
      <Client />
    </main>
  );
}
