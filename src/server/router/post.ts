import { createRouter } from "./context";
import { z } from "zod";

export const postRouter = createRouter()
  .query("getAll", {
    async resolve({ ctx }) {
      return await ctx.prisma.post.findMany();
    },
  })
  .query("getById", {
    input: z.object({
      id: z.string()
    }),
    async resolve({ input, ctx }) {
      return await ctx.prisma.post.findUnique({
        where: {
          id: input.id
        },
        select: {
          title: true,
          body: true,
          comments: {
            orderBy: {
              createdAt: 'desc'
            },
            select: {
              id: true,
              message: true,
              parentId: true,
              createdAt: true,
              user: {
                select: {
                  id: true,
                  name: true
                }
              }

            }
          }
        }
      });
    },
  })
