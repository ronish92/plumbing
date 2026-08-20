import Link from "next/link";

export default function TickerBanner() {
  const tickerText =
    "🚨 24/7 Emergency Plumbing Available Now — Current Wait Time: Under 45 Mins • ❄️ Protect your pipes! Save $50 on Winterization Inspections • ⭐ 500+ Five-Star Local Reviews •";

  return (
    <div className="w-[95%] max-w-7xl mx-auto overflow-hidden bg-yellow-400 text-black py-2 border-b border-yellow-500 font-medium text-sm select-none">
      <Link
        href="/book-now"
        className="block cursor-pointer hover:text-neutral-800 transition-colors"
      >
        {/* One horizontally moving track */}
        <div className="flex w-max animate-ticker">
          {/* First copy */}
          <div className="shrink-0 whitespace-nowrap pr-12">
            {tickerText}
          </div>

          {/* Second copy */}
          <div
            aria-hidden="true"
            className="shrink-0 whitespace-nowrap pr-12"
          >
            {tickerText}
          </div>
        </div>
      </Link>
    </div>
  );
}