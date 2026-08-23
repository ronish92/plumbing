import Link from "next/link";

export default function TickerBanner() {
  const tickerText =
    "कुनै पनि सेवा छिटो र सुरक्षित बुकिङको लागि हामीलाई कल गर्नुहोस्  एक क्लिकमै हाम्रो सेवा बुक गर्नुहोस्, हाम्रा प्रतिनिधिहरू तुरुँतै तपाईंसहाँ आइपुग्नेछन्।";

  return (
    <div className="w-[95%] max-w-7xl mb-10 mx-auto overflow-hidden bg-orange-400/90 text-black py-2 border-b border-white font-medium text-sm select-none">
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