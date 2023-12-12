"use client";

import type { Session } from "next-auth";
import Image from "next/image";
import { useState } from "react";

export const NewPostForm = ({ session }: { session: Session }) => {
  const [inputValue, setInputValue] = useState("");

  return (
    <form className=" text-white">
      <div className="flex gap-4">
        <Image
          src={session.user.image!}
          alt="User avatar"
          width={48}
          height={48}
          className="h-12 w-12 rounded-full"
        />
        <textarea
          placeholder="Type something"
          className="rounded-xl bg-secondary p-4"
          rows={5}
          cols={64}
          onChange={(event) => setInputValue(event.target.value)}
          minLength={1}
        ></textarea>
      </div>
      <div className="my-2 flex justify-end">
        <button
          disabled={inputValue.length < 5}
          className="rounded-xl bg-primary px-4 py-2 disabled:bg-primary/50 disabled:text-white/50"
        >
          Add post
        </button>
      </div>
    </form>
  );
};
