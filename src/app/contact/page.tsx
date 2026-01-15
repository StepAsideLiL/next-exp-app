import Link from "next/link";
// import React from "react";

export default function Page() {
  return (
    <main className="mx-auto w-full max-w-7xl py-10">
      <h1 className="text-5xl">Contact</h1>
      <Link className="block text-blue-500 hover:underline" href={"/about"}>
        About
      </Link>
      <Link className="block text-blue-500 hover:underline" href={"/"}>
        Home
      </Link>
    </main>
  );
}
