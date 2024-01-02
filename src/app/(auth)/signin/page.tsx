"use client";
import { signIn, useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import { FaDiscord } from "react-icons/fa";

const SignInPage = () => {
  const session = useSession();

  if (session.status == "authenticated") {
    redirect("/");
  }

  const handleLogin = async () => {
    await signIn("discord");
  };
  return (
    <main className="flex h-screen w-screen items-center justify-center">
      <div className="flex h-96 flex-col items-center justify-between rounded-xl bg-primary/30 px-4 py-10 md:w-1/3">
        <div className="text-center">
          <h1 className="text-4xl font-semibold text-white">Hello!</h1>
          <p className=" text-gray-500">
            You need to be logged in to use codehund.
          </p>
        </div>
        <div className="h-1/2">
          <button
            onClick={handleLogin}
            className="flex items-center gap-2 rounded-xl bg-purple-600 px-4 py-2 text-lg  font-medium text-white transition-colors duration-100 hover:bg-purple-600/60"
          >
            <FaDiscord size={24} />
            <span>Login with discord</span>
          </button>
        </div>
      </div>
    </main>
  );
};

export default SignInPage;
