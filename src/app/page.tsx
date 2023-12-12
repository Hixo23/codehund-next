import Link from "next/link";

import { api } from "@/trpc/server";
import { getServerAuthSession } from "@/server/auth";
import { redirect } from "next/navigation";
import { NewPostForm } from "./_components/NewPostForm/NewPostForm";

export default async function Home() {
  const session = await getServerAuthSession();

  if (!session) {
    redirect("/signup");
  }
  const allPosts = await api.post.getAll.query();

  return (
    <main className=" flex min-h-screen w-screen flex-col items-center  text-white">
      <div className="container flex flex-col items-center gap-12 px-4 py-16 ">
        {session?.user && (
          <>
            <NewPostForm session={session} />
            <div>
              {allPosts.map((post) => (
                <div>
                  <p>{post.name}</p>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </main>
  );
}
