const CIRCUMFERENCE = 2 * Math.PI * 50;

export function ReadinessWidget() {
  const score = 68;
  const autoConvertible = 61;
  const arc = (score / 100) * CIRCUMFERENCE;

  return (
    <div className="bg-white border border-neutral-200 rounded-2xl p-6 shadow-[0_8px_40px_rgba(0,0,0,0.08)] w-full max-w-[340px]">
      {/* Ring */}
      <div className="flex justify-center mb-5">
        <div className="relative w-28 h-28">
          <svg viewBox="0 0 120 120" className="w-full h-full -rotate-90" aria-hidden="true">
            <circle cx="60" cy="60" r="50" fill="none" stroke="#f5f5f5" strokeWidth="12" />
            <circle
              cx="60" cy="60" r="50"
              fill="none"
              stroke="#3B82F6"
              strokeWidth="12"
              strokeDasharray={`${arc} ${CIRCUMFERENCE}`}
              strokeLinecap="round"
            />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-[2rem] font-bold text-neutral-900 leading-none">{score}</span>
            <span className="text-[0.6rem] font-semibold tracking-[0.1em] uppercase text-neutral-500 mt-1">Readiness</span>
          </div>
        </div>
      </div>

      {/* Complexity tags */}
      <div className="flex flex-wrap gap-2 justify-center mb-5">
        {["LOD", "Custom SQL", "Parameters"].map((tag) => (
          <span
            key={tag}
            className="text-xs font-semibold bg-neutral-100 text-neutral-700 border border-neutral-200 px-3 py-1 rounded-full"
          >
            {tag}
          </span>
        ))}
      </div>

      {/* Auto-convertible bar */}
      <div>
        <div className="flex justify-between text-xs font-medium text-neutral-600 mb-1.5">
          <span>Auto-convertible</span>
          <span className="text-[#3B82F6] font-bold">{autoConvertible}%</span>
        </div>
        <div className="h-1.5 bg-neutral-100 rounded-full overflow-hidden">
          <div
            className="h-full bg-[#3B82F6] rounded-full"
            style={{ width: `${autoConvertible}%` }}
          />
        </div>
      </div>
    </div>
  );
}
