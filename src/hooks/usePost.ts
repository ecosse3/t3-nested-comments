import { Comment } from "#types/comment";
import { trpc } from "#utils/trpc";
import { useMemo } from "react";

export const usePost = (id: string) => {
  const post = trpc.useQuery(['post.getById', { id }]);

  const commentsByParentId = useMemo(() => {
    if (post.data?.comments === null) return null;

    const group: { [key: string]: Comment[] } = {};

    post.data?.comments?.forEach(comment => {
      group[comment.parentId!] ||= [];
      group[comment.parentId!]?.push(comment);
    })

    return group;
  }, [post.data?.comments]);


  const getReplies = (parentId: string) => {
    return commentsByParentId?.[parentId] || [];
  }

  return {
    post,
    rootComments: commentsByParentId?.['null'] || [],
    getReplies,
  }
}
