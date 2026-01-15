import Image from "next/image";
import Link from "next/link";
// import React from "react";

export default function Page() {
  return (
    <main className="mx-auto w-full max-w-7xl py-10">
      <h1 className="text-5xl">About</h1>
      <Link className="block text-blue-500 hover:underline" href={"/contact"}>
        Contact
      </Link>
      <Link className="block text-blue-500 hover:underline" href={"/"}>
        Home
      </Link>
      <Image
        src={"https://i.ibb.co.com/Cp9zyp0r/sheo.jpg"}
        alt="image"
        width={512}
        height={512}
        unoptimized
      />
    </main>
  );
}
