export default function TripDetailsSkeleton() {
  return (
    <div className="max-w-6xl mx-auto px-6 py-10 animate-pulse">
      <div className="h-12 w-64 bg-slate-200 rounded mb-4" />

      <div className="h-5 w-40 bg-slate-200 rounded mb-10" />

      <div className="space-y-6">
        {[1, 2, 3].map((item) => (
          <div key={item} className="border rounded-3xl p-6">
            <div className="h-6 w-24 bg-slate-200 rounded mb-4" />

            <div className="space-y-3">
              <div className="h-4 bg-slate-200 rounded" />
              <div className="h-4 bg-slate-200 rounded" />
              <div className="h-4 bg-slate-200 rounded" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
