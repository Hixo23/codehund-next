"use client";

import Link from "next/link";
import { FaHome, FaSearch } from "react-icons/fa";
import { DropdownMenu } from "@radix-ui/themes";
import { signIn, signOut, useSession } from "next-auth/react";
import Image from "next/image";
export const Navbar = () => {
  const { data: session, status } = useSession();
  return (
    <header className="sticky top-0 flex h-16 w-screen items-center justify-around backdrop-blur-xl">
      <nav className="flex gap-4 text-2xl text-gray-300">
        <Link href="/">
          <FaHome />
        </Link>
        <Link href="/">
          <FaSearch />
        </Link>
      </nav>
      {status === "authenticated" && session.user.image ? (
        <DropdownMenu.Root>
          <DropdownMenu.Trigger>
            <Image
              src={session.user.image}
              width={48}
              height={48}
              alt="User avatar"
              className="rounded-full"
            />
          </DropdownMenu.Trigger>
          <DropdownMenu.Content className="relative">
            <DropdownMenu.Item
              onClick={() => signOut()}
              className=" absolute -left-5 select-none rounded-xl bg-primary px-4 py-2 transition-colors duration-100 hover:bg-primary/90 hover:outline-none"
            >
              Wyloguj
            </DropdownMenu.Item>
          </DropdownMenu.Content>
        </DropdownMenu.Root>
      ) : (
        <button onClick={() => signIn("discord")} className="text-white">
          Login{" "}
        </button>
      )}
    </header>
  );
};
