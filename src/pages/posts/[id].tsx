import Head from "next/head";
import clsx from "clsx";
import { useState } from "react";
import { CommentForm } from "#components/CommentForm";
import { CommentList } from "#components/CommentList";
import { Header } from "#components/Header";
import { prisma } from "#server/db/client";
import { appRouter } from "#server/router";
import { trpc } from "#utils/trpc";
import { createSSGHelpers } from '@trpc/react/ssg';
import { usePost } from "#hooks/usePost";
import { GetServerSidePropsContext, InferGetServerSidePropsType, NextPage } from "next";
import { useSession } from "next-auth/react";
import superjson from 'superjson';

const Post: NextPage<InferGetServerSidePropsType<typeof getServerSideProps>> = ({ id }) => {
  const [error, setError] = useState("");
  const { data: session } = useSession();

  const { post, rootComments } = usePost(id);

  const { invalidateQueries } = trpc.useContext();
  const createComment = trpc.useMutation(['protectedPost.addComment'], {
    async onSuccess() {
      // Refetches posts after a comment is added
      await invalidateQueries(['post.getById']);
    },
  });

  const handleCommentCreate = async (message: string) => {
    if (message.trim().length === 0) {
      setError("You need to specify a message!");
      return;
    };

    if (message.trim().length < 4) {
      setError("Message is too short!");
      return;
    };

    return await createComment.mutateAsync({
      postId: id,
      message
    }).then(() => {
      setError("");
    })
  }

  return (
    <>
      <Head>
        <title>{post.data?.title || id}</title>
        <meta name="description" content="Post" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header />
      <main className={clsx('container max-w-2xl mx-auto my-8 flex flex-col p-4 md:p-0')}>
        <h1 className="text-3xl text-black font-bold">{post.data?.title}</h1>
        <p className="text-md text-black my-4 text-justify">{post.data?.body}</p>
        <h2 className="text-xl text-black font-bold">Comments</h2>
        {session ? <CommentForm onSubmit={handleCommentCreate} loading={createComment.isLoading} error={error} /> : <div className="text-red-400 text-md font-bold mb-4">You must be logged in to leave a comment</div>}
        <CommentList comments={rootComments} />
      </main>
    </>
  )
}

export async function getServerSideProps(context: GetServerSidePropsContext<{ id: string }>) {
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

  const id = context.params?.id!;

  // Prefetch `post.byId`
  const data = await ssg.fetchQuery('post.getById', {
    id,
  });

  if (!data) {
    return {
      notFound: true,
    }
  }


  // Make sure to return { props: { trpcState: ssg.dehydrate() } }
  return {
    props: {
      trpcState: ssg.dehydrate(),
      id,
    },
  };
}

export default Post;
