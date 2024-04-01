import Link from "next/link";
import Image from "next/image";

import { MdSpaceDashboard } from "react-icons/md";
import { FaCircleInfo } from "react-icons/fa6";
import { IoSettingsSharp } from "react-icons/io5";

import whitetempIcon from "../public/whiteNavIcons/temp.png";
import whitehumidityIcon from "../public/whiteNavIcons/humidity.png";
import whiteammoniaIcon from "../public/whiteNavIcons/ammonia.png";
import whitelpgIcon from "../public/whiteNavIcons/lpg.png";
import whitecarbonMonoxideIcon from "../public/whiteNavIcons/carbon monoxide.png";
import whiteco2Icon from "../public/whiteNavIcons/co2.png";

import bluetempIcon from "../public/blueNavIcons/temp.png";
import bluehumidityIcon from "../public/blueNavIcons/humidity.png";
import blueammoniaIcon from "../public/blueNavIcons/ammonia.png";
import bluelpgIcon from "../public/blueNavIcons/lpg.png";
import bluecarbonMonoxideIcon from "../public/blueNavIcons/carbon monoxide.png";
import blueco2Icon from "../public/blueNavIcons/co2.png";
import { useRouter } from "next/router";

const NavLinks = () => {
  const router = useRouter();
  const { pathname } = router;

  const inactivelink = " flex gap-1 text-white items-center py-2 mb-4 ";
  const activelink =
    " flex gap-1 items-center py-2 mb-4 text-blue-800 bg-yellow-500 rounded md:bg-white  md:rounded-l-lg";

  return (
    <nav className="bg-blue-800 rounded md:rounded-none">
      <Link href={"/"} className={pathname === "/" ? activelink : inactivelink}>
        <span className="pl-1"></span>
        <MdSpaceDashboard className=" md:w-[1.5vw] h-[4vw] md:h-[1.5vw]" />
        <span className="pl-2"></span>Dashboard
      </Link>
      <Link
        href={"/temperature"}
        className={
          pathname.includes("/temperature") ? activelink : inactivelink
        }
      >
        {pathname.includes("/temperature") ? (
          <Image
            src={bluetempIcon}
            className="w-[8vw] md:w-[2.7vw] h-[8vw] md:h-[2.7vw] transform scale-150"
            alt={"temperature"}
          />
        ) : (
          <Image
            src={whitetempIcon}
            className="w-[8vw] md:w-[2.7vw] h-[8vw] md:h-[2.7vw] transform scale-150"
            alt={"temperature"}
          />
        )}
        Temperature
      </Link>
      <Link
        href={"/humidity"}
        className={pathname.includes("/humidity") ? activelink : inactivelink}
      >
        {pathname.includes("/humidity") ? (
          <Image
            src={bluehumidityIcon}
            className="w-[8vw] md:w-[2.7vw] h-[8vw] md:h-[2.7vw] transform scale-150"
            alt={"humidity"}
          />
        ) : (
          <Image
            src={whitehumidityIcon}
            className="w-[8vw] md:w-[2.7vw] h-[8vw] md:h-[2.7vw] transform scale-150"
            alt={"humidity"}
          />
        )}
        Humidity
      </Link>
      <Link
        href={"/ammonia"}
        className={pathname.includes("/ammonia") ? activelink : inactivelink}
      >
        {pathname.includes("/ammonia") ? (
          <Image
            src={blueammoniaIcon}
            className="w-[8vw] md:w-[2.7vw] h-[8vw] md:h-[2.7vw] transform scale-150"
            alt={"ammonia"}
          />
        ) : (
          <Image
            src={whiteammoniaIcon}
            className="w-[8vw] md:w-[2.7vw] h-[8vw] md:h-[2.7vw] transform scale-150"
            alt={"ammonia"}
          />
        )}
        Ammonia
      </Link>
      <Link
        href={"/lpg"}
        className={pathname.includes("/lpg") ? activelink : inactivelink}
      >
        {pathname.includes("/lpg") ? (
          <Image
            src={bluelpgIcon}
            className="w-[8vw] md:w-[2.7vw] h-[8vw] md:h-[2.7vw] transform scale-150"
            alt={"lpg"}
          />
        ) : (
          <Image
            src={whitelpgIcon}
            className="w-[8vw] md:w-[2.7vw] h-[8vw] md:h-[2.7vw] transform scale-150"
            alt={"lpg"}
          />
        )}
        LPG
      </Link>
      <Link
        href={"/carbon-monoxide"}
        className={
          pathname.includes("/carbon-monoxide") ? activelink : inactivelink
        }
      >
        {pathname.includes("/carbon-monoxide") ? (
          <Image
            src={bluecarbonMonoxideIcon}
            className="w-[8vw] md:w-[2.7vw] h-[8vw] md:h-[2.7vw] transform scale-150"
            alt={"carbon-monoxide"}
          />
        ) : (
          <Image
            src={whitecarbonMonoxideIcon}
            className="w-[8vw] md:w-[2.7vw] h-[8vw] md:h-[2.7vw] transform scale-150"
            alt={"carbon-monoxide"}
          />
        )}
        Carbon Monoxide
      </Link>
      <Link
        href={"/carbon-dioxide"}
        className={
          pathname.includes("/carbon-dioxide") ? activelink : inactivelink
        }
      >
        {pathname.includes("/carbon-dioxide") ? (
          <Image
            src={blueco2Icon}
            className="w-[8vw] md:w-[2.7vw] h-[8vw] md:h-[2.7vw] transform scale-150"
            alt={"carbon-dioxide"}
          />
        ) : (
          <Image
            src={whiteco2Icon}
            className="w-[8vw] md:w-[2.7vw] h-[8vw] md:h-[2.7vw] transform scale-150"
            alt={"carbon-dioxide"}
          />
        )}
        Carbon Dioxide
      </Link>
      <Link
        href={"/about"}
        className={pathname.includes("/about") ? activelink : inactivelink}
      >
        <span className="pl-1 mt-8"></span>
        <FaCircleInfo className=" md:w-[1.5vw] h-[4vw] md:h-[1.5vw]" />
        <span className="pl-2"></span>
        About
      </Link>
      <Link
        href={"/settings"}
        className={pathname.includes("/settings") ? activelink : inactivelink}
      >
        <span className="pl-1 mt-8"></span>
        <IoSettingsSharp className=" md:w-[1.5vw] h-[4vw] md:h-[1.5vw]" />
        <span className="pl-2"></span>
        Settings
      </Link>
    </nav>
  );
};

export default NavLinks;
