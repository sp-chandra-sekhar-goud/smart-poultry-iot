import { MdOutlineMonitorHeart, MdSpaceDashboard } from "react-icons/md";
import { FaCircleInfo } from "react-icons/fa6";
import { IoClose, IoSettingsSharp } from "react-icons/io5";
import { GrMenu } from "react-icons/gr";
import { useRouter } from "next/router";

import { useState } from "react";
import NavLinks from "./NavLinks";

function Nav() {
  const inactivelink = " flex gap-1 text-white items-center py-2 mb-4 ";
  const activelink = " flex gap-1 items-center py-2 mb-4 text-blue-800 bg-white rounded-l-lg";

  const [isNavOpen, setIsNavOpen] = useState(false);
  const router = useRouter();
  const { pathname } = router;
  

  return (
    <>
    <aside className="z-6 text-white lg:p-4 mt-2 ml-2 ">
      <a href="/" className={`${inactivelink} flex justify-between pr-6 `}>
        <div className="flex items-center gap-2">
        <MdOutlineMonitorHeart className="text-[6vw] md:text-[3vw] lg:text-[1.5vw]" />
        <h1>Air Quality Monitoring</h1>
        </div>
        {/* <div className="block md:hidden">
        {isNavOpen ? <IoClose className="text-[6vw] font-bold" onClick={() => setIsNavOpen(false)}/> : <GrMenu className="text-[6vw] font-bold" onClick={() => setIsNavOpen(true)}/>}
        </div> */}
      </a>
      <div className="hidden md:block"> <NavLinks/> </div>
    </aside>
    </>
  );
}

export default Nav;

