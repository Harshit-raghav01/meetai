import { z } from 'zod';
import { baseProcedure, createTRPCRouter } from '../init';
 
export const appRouter = createTRPCRouter({
  test: baseProcedure
    .input(
      z.object({
        name: z.string(),
        age: z.number()
      }),
    )
    .query((out) => {
      return {
        data: {
          name : out.input.name,
          age : out.input.age
        },
      };
    }),
});
 
// export type definition of API
export type AppRouter = typeof appRouter;