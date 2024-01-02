import * as z from "zod";
import { createTRPCRouter, protectedProcedure } from "../trpc";

export const likesRouter = createTRPCRouter({
  getLikes: protectedProcedure
    .input(z.object({ id: z.number().min(1) }))
    .query(async ({ ctx, input }) => {
      const likes = await ctx.db.like.findMany({
        where: { postId: input.id },
        include: {
          likedBy: true,
        },
      });

      return likes ?? [];
    }),
  toggleLike: protectedProcedure
    .input(z.object({ postId: z.number().min(1) }))
    .mutation(async ({ ctx, input }) => {
      const currentUserId = ctx.session.user.id;
      const existingLike = await ctx.db.like.findFirst({
        where: {
          postId: input.postId,
          likedBy: { id: currentUserId },
        },
      });

      if (existingLike) {
        return await ctx.db.like.delete({
          where: {
            likedBy: {
              id: currentUserId,
            },
            postId: input.postId,
            id: existingLike.id,
          },
        });
      } else {
        return await ctx.db.like.create({
          data: {
            postId: input.postId,
            likedBy: { connect: { id: ctx.session.user.id } },
          },
        });
      }
    }),
});
