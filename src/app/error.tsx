"use client"; // Error components must be Client Components

import Link from "next/link";
import { useEffect } from "react";
import Button from "./components/Button";

export default function Error({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);
  return (
    <main className="flex w-full min-h-screen flex-auto flex-col items-center justify-center gap-6">
      <p className="text-2xl font-bold text-custom-blue lg:text-3xl">
        Page not Found
      </p>
      <Link href="/" className="w-[250px]">
        <Button color="red">Back to Main Page</Button>
      </Link>
    </main>
  );
}
