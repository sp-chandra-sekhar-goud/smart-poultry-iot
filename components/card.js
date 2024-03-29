import Image from "next/image";
import Link from "next/link";

export default function Card({ imgPath, title, data, unit, path }) {
  const occurrences = data.length;
  const sum = data.reduce(
    (accumulator, currentValue) => accumulator + +currentValue,
    0
  );
  const average = occurrences > 0 ? sum / occurrences : 0;

  return (
    <div className="w-[90vw] md:w-[25vw] lg:w-[20vw] bg-white rounded-lg shadow-lg p-4 px-8 m-4 border-2 border-gray-300">
      <Link href={path}>
        <div className=" flex flex-col items-center justify-center">
          <Image src={imgPath} width={100} height={100} alt={title} />
        </div>
        <div className="text-center">
          <h4 className="text-lg font-semibold">{title}</h4>
          <h1 className="mt-1 text-2xl font-bold">{average.toFixed(2)}</h1>
          <p className="text-sm text-gray-900">{unit}</p>
        </div>
      </Link>
    </div>
  );
}
