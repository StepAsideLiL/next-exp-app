import Link from "next/link";

export default async function Page() {
  await new Promise((resolve) => setTimeout(resolve, 2000));

  return (
    <main className="mx-auto w-full max-w-7xl py-10">
      <h1 className="text-5xl">About Page</h1>
      <Link href="/" className="hover:underline">
        Home
      </Link>
    </main>
  );
}
