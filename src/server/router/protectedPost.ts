import * as trpc from "@trpc/server";
import { z } from "zod";
import { createProtectedRouter } from "./protected-router";

export const protectedPostRouter = createProtectedRouter()
  .mutation("addComment", {
    input: z.object({
      postId: z.string(),
      parentId: z.string().optional(),
      message: z.string(),
    }),
    async resolve({ input, ctx }) {
      return await ctx.prisma.comment.create({
        data: {
          postId: input.postId,
          message: input.message,
          parentId: input.parentId,
          userId: ctx.session.user.id!
        }
      }).then(comment => {
        return {
          ...comment,
          likeCount: 0,
          likedByMe: false,
        }
      })
    }
  })
  .mutation("updateComment", {
    input: z.object({
      commentId: z.string(),
      message: z.string(),
      postId: z.string(),
    }),
    async resolve({ input, ctx }) {
      const res = await ctx.prisma.comment.findUnique({
        where: { id: input.commentId },
        select: { userId: true }
      });

      if (res?.userId !== ctx.session.user.id) {
        throw new trpc.TRPCError({ code: 'UNAUTHORIZED', message: "You do not have permission to update this comment" })
      }

      return await ctx.prisma.comment.update({
        where: {
          id: input.commentId
        },
        data: {
          message: input.message,
        }
      })
    }
  })
  .mutation("deleteComment", {
    input: z.object({
      commentId: z.string(),
      postId: z.string(),
    }),
    async resolve({ input, ctx }) {
      const res = await ctx.prisma.comment.findUnique({
        where: { id: input.commentId },
        select: { userId: true }
      });

      if (res?.userId !== ctx.session.user.id) {
        throw new trpc.TRPCError({ code: 'UNAUTHORIZED', message: "You do not have permission to delete this comment" })
      }

      return await ctx.prisma.comment.delete({
        where: {
          id: input.commentId
        }
      })
    }
  })
  .mutation("toggleLike", {
    input: z.object({
      commentId: z.string(),
      postId: z.string(),
    }),
    async resolve({ input, ctx }) {
      const res = await ctx.prisma.comment.findUnique({
        where: { id: input.commentId },
        select: { userId: true }
      });

      const like = await ctx.prisma.like.findUnique({
        where: { userId_commentId: { commentId: input.commentId, userId: ctx.session.user.id! } }
      })

      if (like === null) {
        return await ctx.prisma.like.create({
          data: {
            commentId: input.commentId,
            userId: ctx.session.user.id!
          }
        }).then(() => {
          return { addLike: true }
        });
      } else {
        return await ctx.prisma.like.delete({
          where: {
            userId_commentId: {
              commentId: input.commentId,
              userId: ctx.session.user.id!
            }
          }
        }).then(() => {
          return { addLike: false }
        });
      }
    }
  });
