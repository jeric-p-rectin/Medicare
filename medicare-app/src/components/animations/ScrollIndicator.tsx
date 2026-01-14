'use client';

export function ScrollIndicator() {
  return (
    <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-bounce">
      {/* Mouse outline */}
      <div className="w-7 h-12 rounded-full border-2 border-medicare-red relative flex justify-center">
        {/* Scroll wheel */}
        <div
          className="w-1 h-3 bg-medicare-bright-red rounded-full absolute top-2"
          style={{
            animation: 'scroll-wheel 1.5s infinite',
          }}
        />
      </div>
      {/* Arrow indicators */}
      <div className="flex flex-col items-center -mt-1">
        <svg
          className="w-4 h-4 text-medicare-red opacity-60"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 14l-7 7m0 0l-7-7m7 7V3"
          />
        </svg>
      </div>
    </div>
  );
}
