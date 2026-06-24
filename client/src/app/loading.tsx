export default function Loading() {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center">
      <div className="h-12 w-12 rounded-full border-4 border-slate-200 border-t-blue-600 animate-spin" />

      <p className="mt-4 text-slate-500">Loading...</p>
    </div>
  );
}
