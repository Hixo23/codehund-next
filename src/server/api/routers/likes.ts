import * as z from "zod";
import { createTRPCRouter, protectedProcedure } from "../trpc";

export const likesRouter = createTRPCRouter({
  getLikes: protectedProcedure
    .input(z.object({ id: z.number().min(1) }))
    .query(async ({ ctx, input }) => {
      const likes = await ctx.db.likes.findMany({
        where: { postId: input.id },
        include: {
          likedBy: true,
        },
      });

      return likes;
    }),
  toggleLike: protectedProcedure
    .input(z.object({ postId: z.number().min(1) }))
    .mutation(async ({ ctx, input }) => {
      const existingLike = await ctx.db.likes.findFirst({
        where: {
          postId: input.postId,
          likedBy: { id: ctx.session.user.id },
        },
      });

      if (existingLike) {
        return await ctx.db.likes.delete({
          where: {
            likedBy: {
              id: ctx.session.user.id,
            },
            postId: input.postId,
            id: existingLike.id,
          },
        });
      } else {
        return await ctx.db.likes.create({
          data: {
            postId: input.postId,
            likedBy: { connect: { id: ctx.session.user.id } },
          },
        });
      }
    }),
});
