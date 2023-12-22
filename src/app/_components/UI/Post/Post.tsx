"use client";

import Image from "next/image";
import { formatDistanceToNow } from "date-fns";
import { useSession } from "next-auth/react";
import { api } from "@/trpc/react";
import { FaTrash } from "react-icons/fa";
import { toast } from "sonner";
import { cn } from "@/utils/cn";

type PostProps = {
  createdBy: {
    id: string;
    name: string | null;
    email: string | null;
    emailVerified: Date | null;
    image: string | null;
  };
  id: number;
  name: string;
  createdAt: Date;
  updatedAt: Date;
  createdById: string;
  key: number;
};

export const Post = ({ name, createdAt, createdBy, id }: PostProps) => {
  const { data: session } = useSession();
  const isCurrentUserPost = session?.user.id === createdBy.id;
  const deletePost = api.post.delete.useMutation({
    onSuccess: () => toast("Your post has been successfully deleted"),
  });

  const addLikeMutation = api.likes.toggleLike.useMutation();
  const likes = api.likes.getLikes.useQuery({ id: id });

  const handleDelete = () => {
    deletePost.mutate({ id: id });
  };

  const handleLike = () => {
    if (!session?.user) return;
    addLikeMutation.mutate({ postId: id });
  };

  console.log(likes.data);

  return (
    <div className="items mb-12 flex gap-4 rounded-xl border border-primary p-6 py-6 md:w-[48rem]">
      <Image
        className="h-12 w-12 rounded-full"
        src={createdBy.image!}
        alt="Avatar"
        width={48}
        height={48}
      />
      <div className="relative flex w-full flex-col gap-4">
        {isCurrentUserPost && (
          <button className="absolute right-0" onClick={handleDelete}>
            <FaTrash />
          </button>
        )}
        <div className="flex items-center gap-4">
          <p className="font-bold">{createdBy.name}</p>
          <p className="text-sm">
            {formatDistanceToNow(new Date(createdAt)).replace("about", "")} ago
          </p>
        </div>
        <p className="w-full">{name}</p>
        <button
          className={cn(
            "flex w-16 items-center justify-center gap-2 rounded-xl border-2 border-primary py-2",
            likes.data?.some((like) => like.likedBy.id === session?.user.id) &&
              "bg-primary",
          )}
          rounded-xl
          onClick={handleLike}
        >
          👍
          <span>{likes.data?.length}</span>
        </button>
      </div>
    </div>
  );
};
