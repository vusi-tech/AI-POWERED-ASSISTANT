export function Loader({ label = 'AI is thinking...' }: { label?: string }) {
  return (
    <div className="flex flex-col items-center justify-center py-12 gap-4">
      <div className="relative">
        <div className="w-12 h-12 rounded-full border-4 border-slate-200"></div>
        <div className="absolute top-0 left-0 w-12 h-12 rounded-full border-4 border-brand-600 border-t-transparent animate-spin"></div>
      </div>
      <p className="text-sm text-slate-500 font-medium animate-pulse-soft">{label}</p>
    </div>
  );
}

export function ShimmerLines({ lines = 4 }: { lines?: number }) {
  return (
    <div className="space-y-3 py-4">
      {Array.from({ length: lines }).map((_, i) => (
        <div
          key={i}
          className="shimmer-bg animate-shimmer rounded-md h-4"
          style={{ width: `${100 - i * 12}%` }}
        />
      ))}
    </div>
  );
}
