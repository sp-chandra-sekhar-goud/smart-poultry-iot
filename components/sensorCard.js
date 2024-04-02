import Image from "next/image";

export default function SensorCard({ imgName, sensorName, gases, range, accuracy, volts, power }) {
  return (
    <div className="max-w-sm rounded overflow-hidden shadow-xl">
      <div className="px-6 py-4">
        <div className="mb-4">
          <div className="w-full h-48 relative">
            <Image
              src={imgName}
              alt={sensorName}
              className="rounded-t w-full h-full object-contain"
              sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, 33vw"
            />
          </div>
          <div className="text-xl font-bold mt-2">{sensorName}</div>
        </div>
        <ul className="text-sm">
          <li><span className="font-bold">Detects:</span> {gases}</li>
          <li><span className="font-bold">Range:</span> {range}</li>
          <li><span className="font-bold">Accuracy:</span> {accuracy}</li>
          <li><span className="font-bold">Operating Voltage:</span> {volts}</li>
          <li><span className="font-bold">Power Consumption:</span> {power}</li>
        </ul>
      </div>
    </div>
  );
}
