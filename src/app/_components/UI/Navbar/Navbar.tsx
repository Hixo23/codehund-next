"use client";

import Link from "next/link";
import { FaHome, FaSearch } from "react-icons/fa";
import { DropdownMenu } from "@radix-ui/themes";
import { signIn, signOut, useSession } from "next-auth/react";
import Image from "next/image";
import { useRouter } from "next/navigation";
export const Navbar = () => {
  const { data: session, status } = useSession();

  const router = useRouter();

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
      {status === "authenticated" && session.user.image && (
        <DropdownMenu.Root>
          <DropdownMenu.Trigger className="flex items-center justify-center">
            <Image
              src={session.user.image}
              width={48}
              height={48}
              alt="User avatar"
              className="select-none rounded-full"
            />
          </DropdownMenu.Trigger>
          <DropdownMenu.Content className="relative mr-96 flex flex-col gap-12">
            <DropdownMenu.Item
              onClick={() => router.push("/profile")}
              className=" flex select-none items-center justify-center rounded-xl bg-primary px-4 py-2 transition-colors duration-100 hover:bg-primary/90 hover:outline-none"
            >
              Profile
            </DropdownMenu.Item>
            <DropdownMenu.Item
              onClick={() => signOut()}
              className=" my-4 flex select-none items-center justify-center rounded-xl bg-primary px-4 py-2 transition-colors duration-100 hover:bg-primary/90 hover:outline-none"
            >
              Logout
            </DropdownMenu.Item>
          </DropdownMenu.Content>
        </DropdownMenu.Root>
      )}
    </header>
  );
};
