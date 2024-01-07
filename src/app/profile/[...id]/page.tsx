"use client";

import { api } from "@/trpc/react";
import Image from "next/image";
import { redirect, usePathname } from "next/navigation";
import { Post } from "@/app/_components/UI/Post/Post";
import { useSession } from "next-auth/react";

const Profile = () => {
  const pathname = usePathname();
  const userName = pathname.replace("/profile/", "");
  const user = api.profile.getProfile.useQuery({
    name: userName,
  });

  const currentUser = useSession();

  const toggleFollow = api.profile.toggleFollow.useMutation();

  if (!userName) return redirect("/");
  if (currentUser.data?.user?.name == userName) return redirect("/profile");
  return (
    <main className="flex min-h-screen min-w-full flex-col items-center ">
      <div className="my-24 flex h-44 w-full items-center justify-center gap-4 bg-primary">
        <Image
          className="rounded-full"
          width={64}
          height={64}
          src={user.data?.image ?? ""}
          alt=""
        />
        <div className="flex flex-col gap-2">
          <h1 className=" text-2xl font-bold text-white">{user.data?.name}</h1>
          <ul className="flex gap-4 text-white">
            <li>
              Follows:{" "}
              <span className="font-bold">
                {user.data?.followers.length ?? 0}
              </span>
            </li>
            <li>
              Following:{" "}
              <span className="font-bold">
                {user.data?.following.length ?? 0}
              </span>
            </li>
            <li>
              Posts:{" "}
              <span className="font-bold">{user.data?.posts.length}</span>
            </li>
          </ul>
          <button
            onClick={() => {
              if (user.data?.id)
                toggleFollow.mutate({ followedId: user.data?.id });
            }}
            className="rounded-xl bg-secondary py-2 font-bold text-white"
          >
            Follow
          </button>
        </div>
      </div>
      {user.data?.posts.map((post) => <Post key={post.id} {...post} />)}
    </main>
  );
};

export default Profile;
