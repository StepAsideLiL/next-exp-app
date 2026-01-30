import Link from "next/link";

export default function Page() {
  return (
    <main className="mx-auto w-full max-w-7xl py-10">
      <h1 className="text-5xl">Home Page</h1>
      <Link href="/about" className="hover:underline">
        About
      </Link>
    </main>
  );
}
