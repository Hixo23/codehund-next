"use client";

import { api } from "@/trpc/react";
import { redirect } from "next/navigation";
import { NewPostForm } from "./_components/NewPostForm/NewPostForm";
import { Post } from "./_components/UI/Post/Post";
import { useSession } from "next-auth/react";

export default function Home() {
  const session = useSession();

  if (session.status !== "authenticated") {
    redirect("/signup");
  }
  const { data, refetch } = api.post.getAll.useQuery();
  console.log(data);

  return (
    <main className=" flex min-h-screen w-screen flex-col items-center  text-white">
      <div className="container flex flex-col items-center gap-8 px-4 py-16 ">
        {session.status == "authenticated" && data && (
          <>
            <NewPostForm refetch={refetch} session={session.data} />
            <div>
              {data.map((post) => {
                return <Post key={post.id} {...post} />;
              })}
            </div>
          </>
        )}
      </div>
    </main>
  );
}