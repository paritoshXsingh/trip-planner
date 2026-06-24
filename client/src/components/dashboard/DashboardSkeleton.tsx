export default function DashboardSkeleton() {
  return (
    <div className="max-w-7xl mx-auto px-6 py-10 animate-pulse">
      <div className="flex justify-between items-center mb-10">
        <div>
          <div className="h-10 w-52 bg-slate-200 rounded" />

          <div className="h-4 w-80 bg-slate-200 rounded mt-3" />
        </div>

        <div className="h-10 w-32 bg-slate-200 rounded-xl" />
      </div>

      <div className="grid md:grid-cols-3 gap-4 mb-10">
        {[1, 2, 3].map((item) => (
          <div key={item} className="h-32 rounded-3xl bg-slate-200" />
        ))}
      </div>

      <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
        {[1, 2, 3, 4, 5, 6].map((item) => (
          <div key={item} className="rounded-3xl border p-6">
            <div className="h-6 w-32 bg-slate-200 rounded mb-4" />

            <div className="h-4 w-24 bg-slate-200 rounded mb-8" />

            <div className="h-10 bg-slate-200 rounded-xl" />
          </div>
        ))}
      </div>
    </div>
  );
}
