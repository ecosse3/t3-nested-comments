// src/server/router/index.ts
import { createRouter } from "./context";
import superjson from "superjson";

import { postRouter } from "./post";

export const appRouter = createRouter()
  .transformer(superjson)
  .merge("post.", postRouter)

// export type definition of API
export type AppRouter = typeof appRouter;
