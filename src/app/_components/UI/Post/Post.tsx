import Image from "next/image";

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

export const Post = ({ name, createdAt, createdBy }: PostProps) => {
  return (
    <div className="items mb-12 flex w-[48rem] gap-4 rounded-xl border border-gray-400 p-6 py-6">
      <Image
        className="h-12 w-12 rounded-full"
        src={createdBy.image!}
        alt="Avatar"
        width={48}
        height={48}
      />
      <div className="flex w-full flex-col gap-4">
        <div className="flex items-center gap-4">
          <p className="font-bold">{createdBy.name}</p>
          <p className="">{new Date(createdAt).toLocaleTimeString()}</p>
        </div>
        <p className="w-full">{name}</p>
      </div>
    </div>
  );
};
