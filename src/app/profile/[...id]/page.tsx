"use client";

import { api } from "@/trpc/react";
import Image from "next/image";
import { redirect, usePathname } from "next/navigation";
import { Post } from "@/app/_components/UI/Post/Post";

const Profile = () => {
  const pathname = usePathname();
  const userName = pathname.replace("/profile/", "");
  const userInfo = api.profile.getProfile.useQuery({
    name: userName,
  });

  //   if (!userInfo.data) return redirect("/");
  return (
    <main className="flex min-h-screen min-w-full flex-col items-center ">
      <div className="my-24 flex h-44 w-full items-center justify-center gap-4 bg-primary">
        <Image
          className="rounded-full"
          width={64}
          height={64}
          src={userInfo.data?.image ?? ""}
          alt=""
        />
        <div className="flex flex-col gap-2">
          <h1 className=" text-2xl font-bold text-white">
            {userInfo.data?.name}
          </h1>
          <ul className="flex gap-4 text-white">
            <li>
              Follows:{" "}
              <span className="font-bold">
                {userInfo.data?.followers.length ?? 0}
              </span>
            </li>
            <li>
              Following:{" "}
              <span className="font-bold">
                {userInfo.data?.following.length ?? 0}
              </span>
            </li>
            <li>
              Posts:{" "}
              <span className="font-bold">{userInfo.data?.posts.length}</span>
            </li>
          </ul>
        </div>
      </div>
      {userInfo.data?.posts.map((post) => <Post key={post.id} {...post} />)}
    </main>
  );
};

export default Profile;
