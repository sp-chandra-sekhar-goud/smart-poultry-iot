import Link from "next/link";
import Image from "next/image";
import { MdOutlineMonitorHeart, MdSpaceDashboard } from "react-icons/md";
import { FaCircleInfo } from "react-icons/fa6";
import { IoClose, IoSettingsSharp } from "react-icons/io5";
import { GrMenu } from "react-icons/gr";
import { useRouter } from "next/router";

import whitetempIcon from "../public/whiteNavIcons/temp.png";
import whitehumidityIcon from "../public/whiteNavIcons/humidity.png";
import whiteammoniaIcon from "../public/whiteNavIcons/ammonia.png";
import whitepropaneIcon from "../public/whiteNavIcons/propane.png";
import whitebutaneIcon from "../public/whiteNavIcons/butane.png";
import whitecarbonMonoxideIcon from "../public/whiteNavIcons/carbon monoxide.png";
import whiteco2Icon from "../public/whiteNavIcons/co2.png";

import bluetempIcon from "../public/blueNavIcons/temp.png";
import bluehumidityIcon from "../public/blueNavIcons/humidity.png";
import blueammoniaIcon from "../public/blueNavIcons/ammonia.png";
import bluepropaneIcon from "../public/blueNavIcons/propane.png";
import bluebutaneIcon from "../public/blueNavIcons/butane.png";
import bluecarbonMonoxideIcon from "../public/blueNavIcons/carbon monoxide.png";
import blueco2Icon from "../public/blueNavIcons/co2.png";
import { useState } from "react";

export default function Nav() {
  const inactivelink = " flex gap-1 text-white items-center p-2 mb-1 ";
  const activelink = " flex gap-1 items-center p-1 mb-1 text-blue-800 bg-white rounded-l-lg";

  const [isNavOpen, setIsNavOpen] = useState(false);
  const router = useRouter();
  const { pathname } = router;
  const NavLinks = () => {
    return <nav>
    <Link
      href={"/"}
      className={pathname === "/" ? activelink : inactivelink}
    >
      <MdSpaceDashboard className="w-[2vw] h-[2vw] m-2" />
      Dashboard
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
          className="w-[3.5vw] h-[3.5vw] transform scale-150"
          alt={"temperature"}
        />
      ) : (
        <Image
          src={whitetempIcon}
          className="w-[3.5vw] h-[3.5vw] transform scale-150"
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
          className="w-[3.5vw] h-[3.5vw] transform scale-150"
          alt={"humidity"}
        />
      ) : (
        <Image
          src={whitehumidityIcon}
          className="w-[3.5vw] h-[3.5vw] transform scale-150"
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
          className="w-[3.5vw] h-[3.5vw] transform scale-150"
          alt={"ammonia"}
        />
      ) : (
        <Image
          src={whiteammoniaIcon}
          className="w-[3.5vw] h-[3.5vw] transform scale-150"
          alt={"ammonia"}
        />
      )}
      Ammonia
    </Link>
    <Link
      href={"/butane"}
      className={pathname.includes("/butane") ? activelink : inactivelink}
    >
      {pathname.includes("/butane") ? (
        <Image
          src={bluebutaneIcon}
          className="w-[3.5vw] h-[3.5vw] transform scale-150"
          alt={"butane"}
        />
      ) : (
        <Image
          src={whitebutaneIcon}
          className="w-[3.5vw] h-[3.5vw] transform scale-150"
          alt={"butane"}
        />
      )}
      Butane
    </Link>
    <Link
      href={"/propane"}
      className={pathname.includes("/propane") ? activelink : inactivelink}
    >
      {pathname.includes("/propane") ? (
        <Image
          src={bluepropaneIcon}
          className="w-[3.5vw] h-[3.5vw] transform scale-150"
          alt={"propane"}
        />
      ) : (
        <Image
          src={whitepropaneIcon}
          className="w-[3.5vw] h-[3.5vw] transform scale-150"
          alt={"propane"}
        />
      )}
      Propane
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
          className="w-[3.5vw] h-[3.5vw] transform scale-150"
          alt={"carbon-monoxide"}
        />
      ) : (
        <Image
          src={whitecarbonMonoxideIcon}
          className="w-[3.5vw] h-[3.5vw] transform scale-150"
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
          className="w-[3.5vw] h-[3.5vw] transform scale-150"
          alt={"carbon-dioxide"}
        />
      ) : (
        <Image
          src={whiteco2Icon}
          className="w-[3.5vw] h-[3.5vw] transform scale-150"
          alt={"carbon-dioxide"}
        />
      )}
      Carbon Dioxide
    </Link>
    <Link
      href={"/about"}
      className={pathname.includes("/about") ? activelink : inactivelink}
    >
      <FaCircleInfo  className="w-[2vw] h-[2vw] m-2" />
      About
    </Link>
    <Link
      href={"/settings"}
      className={pathname.includes("/settings") ? activelink : inactivelink}
    >
      <IoSettingsSharp className="w-[2vw] h-[2vw] m-2" />
      Settings
    </Link>
  </nav>
  }

  return (
    <>
    <aside className="text-white lg:p-4 mt-2 ml-2 ">
      <a href="/" className={`${inactivelink} flex justify-between pr-6`}>
        <div className="flex items-center gap-2">
        <MdOutlineMonitorHeart className="text-[6vw] md:text-[3vw] lg:text-[1.5vw]" />
        <h1>Air Quality Monitoring</h1>
        </div>
        <div className="block md:hidden">
        {isNavOpen ? <IoClose className="text-[6vw] font-bold" onClick={() => setIsNavOpen(false)}/> : <GrMenu className="text-[6vw] font-bold" onClick={() => setIsNavOpen(true)}/>}
        </div>
      </a>
      <div className="hidden md:block"> <NavLinks/> </div>
    </aside>
    <div className=" lg:hidden">
      {isNavOpen && <NavLinks/>}
    </div>
    </>
  );
}
