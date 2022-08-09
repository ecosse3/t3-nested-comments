// src/server/router/index.ts
import { createRouter } from "./context";
import superjson from "superjson";

import { postRouter } from "./post";
import { protectedPostRouter } from "./protectedPost";

export const appRouter = createRouter()
  .transformer(superjson)
  .merge("post.", postRouter)
  .merge("protectedPost.", protectedPostRouter)

// export type definition of API
export type AppRouter = typeof appRouter;
