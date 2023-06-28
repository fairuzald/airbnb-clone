"use client"
import Link from "next/link";
import Button from "./components/Button";

const ErrorState = () => {
  return (
    <main className="flex w-full min-h-screen flex-auto flex-col items-center justify-center gap-6">
      <p className="text-2xl font-bold text-custom-blue lg:text-3xl">
        Something went error
      </p>
      <Link href="/" className="w-[250px]">
        <Button color="red">Back to Main Page</Button>
      </Link>
    </main>
  );
};

export default ErrorState;
