import type { NextPage } from "next";
import Head from "next/head";
import clsx from "clsx";
import superjson from 'superjson';
import { trpc } from "#utils/trpc";
import { createSSGHelpers } from '@trpc/react/ssg';
import { appRouter } from "#server/router";
import { prisma } from "#server/db/client";
import { Header } from "#components/Header";
import { HEADER_HEIGHT } from "#styles/consts";
import { PostCard } from "#components/PostCard";

const Home: NextPage = () => {
  // This query will be immediately available as it's prefetched.
  const posts = trpc.useQuery(['post.getAll']);

  return (
    <>
      <Head>
        <title>T3 Nested Comments</title>
        <meta name="description" content="Generated by create-t3-app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header />
      <main className={clsx('container max-w-3xl mx-auto flex flex-col items-center justify-center p-4 md:p-0', `min-h-[calc(100vh-${HEADER_HEIGHT}px)]`)}>
        <h1 className="text-5xl md:text-[5rem] leading-normal font-extrabold text-gray-700">
          List <span className="text-purple-300 drop-shadow-2xl">Posts</span>
        </h1>
        <div className="grid gap-3 pt-3 mt-3 text-center md:grid-rows-1 lg:w-2/3">
          {posts.data?.map((post) => (
            <PostCard
              key={post.id}
              id={post.id}
              name={post.title}
              description={`${post.body.slice(0, 50)}...`}
            />
          ))}
        </div>
      </main>
    </>
  );
};

export async function getServerSideProps() {
  const ssg = createSSGHelpers({
    router: appRouter,
    ctx: {
      req: undefined,
      res: undefined,
      prisma,
      session: undefined
    },
    transformer: superjson,
  });

  // Prefetch `post.getAll`
  await ssg.fetchQuery('post.getAll');

  return {
    props: {
      trpcState: ssg.dehydrate()
    }
  }
}

export default Home;
