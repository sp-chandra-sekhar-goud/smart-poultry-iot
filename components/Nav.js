import { MdOutlineMonitorHeart, MdSpaceDashboard } from "react-icons/md";
import { useRouter } from "next/router";

import NavLinks from "./NavLinks";

function Nav() {
  const inactivelink = " flex gap-1 text-white items-center py-2 mb-4 ";

  const router = useRouter();
  

  return (
    <>
    <aside className="z-6 text-white px-2 lg:p-4 mt-2 ml-2 ">
      <a href="/" className={`${inactivelink} flex justify-between pr-6 `}>
        <div className="flex items-center gap-2">
        <MdOutlineMonitorHeart className="text-[6vw] md:text-[3vw] lg:text-[1.5vw]" />
        <h1>CPMS</h1>
        </div>
      </a>
      <div className="hidden md:block"> <NavLinks/> </div>
    </aside>
    </>
  );
}

export default Nav;

