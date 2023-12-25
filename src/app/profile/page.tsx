"use client";

import { api } from "@/trpc/react";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { redirect } from "next/navigation";
import { Post } from "../_components/UI/Post/Post";

const Profile = () => {
  const { data: session, status } = useSession();
  if (status !== "authenticated" || !session.user) return redirect("/signin");
  const userPosts = api.post.getUserPosts.useQuery({ id: session.user.id });
  const userInfo = api.profile.getProfile.useQuery({ id: session.user.id });
  return (
    <main className="flex min-h-screen min-w-full flex-col items-center ">
      <div className="my-24 flex h-44 w-full items-center justify-center gap-4 bg-primary">
        <Image
          className="rounded-full"
          width={64}
          height={64}
          src={session.user.image!}
          alt=""
        />
        <div className="flex flex-col gap-2">
          <h1 className=" text-2xl font-bold text-white">
            {session.user.name}
          </h1>
          <ul className="flex gap-4 text-white">
            <li>
              Follows:{" "}
              <span className="font-bold">{userInfo.data?.follows ?? 0}</span>
            </li>
            <li>
              Following:{" "}
              <span className="font-bold">{userInfo.data?.following ?? 0}</span>
            </li>
            <li>
              Posts:{" "}
              <span className="font-bold">{userInfo.data?.posts.length}</span>
            </li>
          </ul>
        </div>
      </div>
      {userPosts.data?.map((post) => <Post key={post.id} {...post} />)}
    </main>
  );
};

export default Profile;
