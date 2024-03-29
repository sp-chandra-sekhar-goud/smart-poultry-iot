export default function IntervalButtons({
  selectedInterval,
  setSelectedInterval,
}) {
  return (
    <div className="grid grid-cols-3 gap-2">
      <button
        className={`px-4 py-2 rounded-md w-[25vw] md:w-[20vw] lg:w-[10vw] ${
          selectedInterval === "1min" ? "bg-yellow-500" : "bg-blue-800"
        }`}
        onClick={() => setSelectedInterval("1min")}
      >
        1 min
      </button>
      <button
        className={`px-4 py-2 rounded-md w-[25vw] md:w-[20vw] lg:w-[10vw] ${
          selectedInterval === "5mins" ? "bg-yellow-500" : "bg-blue-800"
        }`}
        onClick={() => setSelectedInterval("5mins")}
      >
        5 mins
      </button>
      <button
        className={`px-4 py-2 rounded-md w-[25vw] md:w-[20vw] lg:w-[10vw] ${
          selectedInterval === "10mins" ? "bg-yellow-500" : "bg-blue-800"
        }`}
        onClick={() => setSelectedInterval("10mins")}
      >
        10 mins
      </button>
      <button
        className={`px-4 py-2 rounded-md w-[25vw] md:w-[20vw] lg:w-[10vw] ${
          selectedInterval === "30mins" ? "bg-yellow-500" : "bg-blue-800"
        }`}
        onClick={() => setSelectedInterval("30mins")}
      >
        30 mins
      </button>
      <button
        className={`px-4 py-2 rounded-md w-[25vw] md:w-[20vw] lg:w-[10vw] ${
          selectedInterval === "1hr" ? "bg-yellow-500" : "bg-blue-800"
        }`}
        onClick={() => setSelectedInterval("1hr")}
      >
        1 hr
      </button>
      <button
        className={`px-4 py-2 rounded-md w-[25vw] md:w-[20vw] lg:w-[10vw] ${
          selectedInterval === "1day" ? "bg-yellow-500" : "bg-blue-800"
        }`}
        onClick={() => setSelectedInterval("1day")}
      >
        1 day
      </button>
    </div>
  );
}
