interface Props {
  packed: number;
  total: number;
}

export default function PackingProgress({ packed, total }: Props) {
  const percentage = total === 0 ? 0 : Math.round((packed / total) * 100);

  return (
    <div className="mb-8">
      <div className="flex items-center justify-between mb-2">
        <p className="font-semibold">Packing Progress</p>

        <span className="text-sm text-slate-500">
          {packed}/{total} Packed
        </span>
      </div>

      <div className="w-full h-3 rounded-full bg-slate-200 overflow-hidden">
        <div
          className="h-full bg-blue-600 transition-all duration-500"
          style={{
            width: `${percentage}%`,
          }}
        />
      </div>

      <p className="text-sm text-slate-500 mt-2">{percentage}% Complete</p>
    </div>
  );
}
