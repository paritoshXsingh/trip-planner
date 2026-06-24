import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center px-6 text-center">
      <h1 className="text-7xl font-bold text-blue-600">404</h1>

      <h2 className="text-3xl font-bold mt-4">Page Not Found</h2>

      <p className="text-slate-500 mt-3 max-w-md">
        The page you are looking for does not exist or may have been moved.
      </p>

      <Link
        href="/"
        className="
          mt-8
          px-6
          py-3
          rounded-xl
          bg-blue-600
          text-white
          hover:bg-blue-700
          transition
        "
      >
        Back to Home
      </Link>
    </div>
  );
}
