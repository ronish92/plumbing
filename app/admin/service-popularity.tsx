import { useMemo } from 'react';

type ServicePopularity = {
  name: string;
  bookings: number;
  color: string;
};

interface DonutChartProps {
  data: ServicePopularity[];
}

export function ServicePopularityDonut({
  data,
}: DonutChartProps) {
  const totalBookings = useMemo(
    () => data.reduce((total, item) => total + item.bookings, 0),
    [data]
  );

  let currentAngle = -90;

  const radius = 70;
  const circumference = 2 * Math.PI * radius;

  return (
    <div className="rounded-xl sm:rounded-2xl bg-white p-3 sm:p-5 shadow-sm">
      
      {/* Header */}
      <div className="mb-5 flex items-center justify-between">
        <div>
          <h2 className="text-sm sm:text-base font-semibold text-black">
            Service Popularity
          </h2>
          <p className="text-xs text-gray-500 mt-1">
            Based on total client bookings
          </p>
        </div>
      </div>

      {/* Donut */}
      <div className="relative mx-auto aspect-square w-full max-w-70">
        <svg
          viewBox="0 0 200 200"
          className="h-full w-full -rotate-90"
        >
          {data.map((item) => {
            const percentage =
              totalBookings > 0
                ? item.bookings / totalBookings
                : 0;

            const strokeLength =
              percentage * circumference;

            const gap = 4;

            const dashLength = Math.max(
              strokeLength - gap,
              0
            );

            const dashOffset =
              circumference -
              (currentAngle / 360) * circumference;

            currentAngle += percentage * 360;

            return (
              <circle
                key={item.name}
                cx="100"
                cy="100"
                r={radius}
                fill="transparent"
                stroke={item.color}
                strokeWidth="22"
                strokeDasharray={`${dashLength} ${circumference}`}
                strokeDashoffset={dashOffset}
                strokeLinecap="butt"
              />
            );
          })}
        </svg>

        {/* Center */}
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-3xl font-bold text-black">
            {totalBookings.toLocaleString()}
          </span>

          <span className="text-xs text-gray-500">
            Total Bookings
          </span>
        </div>
      </div>

      {/* Legend */}
      <div className="mt-6 space-y-3">
        {data.map((item) => {
          const percentage =
            totalBookings > 0
              ? (item.bookings / totalBookings) * 100
              : 0;

          return (
            <div
              key={item.name}
              className="flex items-center justify-between gap-3"
            >
              <div className="flex min-w-0 items-center gap-2">
                <span
                  className="h-2.5 w-2.5 shrink-0 rounded-full"
                  style={{
                    backgroundColor: item.color,
                  }}
                />

                <span className="truncate text-sm text-gray-700">
                  {item.name}
                </span>
              </div>

              <div className="flex shrink-0 items-center gap-3">
                <span className="text-sm font-semibold text-black">
                  {item.bookings}
                </span>

                <span className="w-11 text-right text-xs text-gray-500">
                  {percentage.toFixed(1)}%
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}