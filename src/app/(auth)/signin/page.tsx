"use client";
import { signIn, useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import { FaDiscord } from "react-icons/fa";

const SignInPage = () => {
  const session = useSession();

  if (session.status == "authenticated") {
    redirect("/");
  }
  return (
    <main className="flex h-screen w-screen items-center justify-center">
      <div className="flex h-96 w-[36rem] flex-col items-center justify-between rounded-xl bg-primary/30 py-10">
        <h1 className="text-4xl font-semibold text-white">Hello!</h1>
        <div className="h-1/2">
          <button
            onClick={() => signIn("discord")}
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
