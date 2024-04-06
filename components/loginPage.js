"use client";
import { signIn } from "next-auth/react";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { FcGoogle } from "react-icons/fc";
import { FaArrowRight } from "react-icons/fa6";

export const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const session = useSession();
  const status = session.status;
  const router = useRouter();

  useEffect(() => {
    if (status == "authenticated") {
      router.push("/");
    }
  }, [status]);

  const handleSignInWithEmailAndPassword = async (e) => {
    e.preventDefault();
    console.log(email, password);
    // await signIn("emailAndPassword", { email, password });
  };

  return (
    <div className="flex flex-col items-center justify-center md:flex-row bg-blue-800 min-h-screen">
      <div className="w-[35vw] bg-white h-fit px-6 py-8 rounded shadow-lg">
        <h1>Welcome !!!</h1>
        <form onSubmit={handleSignInWithEmailAndPassword}>
          <div className="mt-2">
            <label htmlFor="email" className="block text-gray-900">
              Email:
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className=" w-full p-3 mt-2 ring-1 ring-inset ring-gray-300 border-1 rounded"
            />
          </div>

          <div className="mt-2">
            <label htmlFor="password" className="block text-gray-900">
              Password:
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full p-3 mt-2 ring-1 ring-inset ring-gray-300 border-1 rounded"
            />
          </div>

          <button
            type="submit"
            className="w-full my-3 mt-4 flex gap-2 items-center justify-center text-white bg-gray-800 px-4 py-3 rounded-md"
          >
            Login
            <FaArrowRight />
          </button>
        </form>
        <div className="flex ">
          <div className="w-full flex items-center mt-4">
            <span className="w-full h-[3px] border-t border-gray-300"></span>
            <h2 className="mx-2 text-gray-700">or</h2>
            <span className="w-full h-[2px] border-t border-gray-300"></span>
          </div>
        </div>
        <button
          onClick={() => signIn("google")}
          className="w-full my-3 mt-6 flex gap-2 items-center text-white bg-gray-800 px-4 py-3 rounded-md"
        >
          <FcGoogle /> Continue with Google
        </button>
      </div>
    </div>
  );
};

