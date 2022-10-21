import { z } from 'zod';
import { publicProcedure, router } from '../trcp';
export const appRouter = router({
  'get-pokemon-by-id': publicProcedure
    .input(
      z.object({
        id: z.number(),
      }),
    )
    .query(async ({ input }) => {
      const requset = await fetch(
        `https://pokeapi.co/api/v2/pokemon/${input.id}`,
      );
      const pokemon = await requset.json();

      return {
        name: pokemon.name,
        photo: pokemon.sprites.front_default,
      };
    }),
});
// export type definition of API
export type AppRouter = typeof appRouter;
