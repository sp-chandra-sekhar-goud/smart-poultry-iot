import Nav from "./Nav";
// import { useSession } from "next-auth/react";
// import { useEffect } from "react";
// import { useRouter } from "next/router";
export default function Layout({ children }) {
  // const session = useSession();
  // const status = session.status;
  // const router = useRouter();

  // useEffect(() => {
  //   if (status == "unauthenticated") {
  //     router.push("./login");
  //   }
  //   else{
  //     router.push("/");
  //   }
    
  // }, [status]);
  return (
    <div className="flex flex-col md:flex-row bg-blue-800 min-h-screen">
      <Nav />
      <div className="h-screen overflow-auto flex-grow bg-white p-2 md:p-4  md:mr-2 rounded-lg">
        {children}
      </div>
    </div>
  );
}
