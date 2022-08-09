import Link from "next/link";

type PostCardProps = {
  id: string;
  name: string;
  description: string;
};

export const PostCard = ({
  id,
  name,
  description,
}: PostCardProps) => {
  return (
    <Link href={`/posts/${id}`}>
      <section className="flex flex-col justify-center p-5 duration-500 border-2 border-gray-500 rounded shadow-xl motion-safe:hover:scale-105 cursor-pointer hover:bg-purple-100">
        <h2 className="text-lg text-gray-700">{name}</h2>
        <p className="text-sm text-gray-600">{description}</p>
      </section>
    </Link>
  );
};

