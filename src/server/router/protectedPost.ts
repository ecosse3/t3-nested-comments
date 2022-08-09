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
