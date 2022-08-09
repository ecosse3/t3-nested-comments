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
