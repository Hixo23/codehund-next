import { z } from "zod";
import { createTRPCRouter, protectedProcedure, publicProcedure } from "../trpc";

export const profileRouter = createTRPCRouter({
  getProfile: publicProcedure
    .input(z.object({ name: z.string().min(1) }))
    .query(async ({ ctx, input }) => {
      return await ctx.db.user.findFirst({
        where: {
          name: input.name,
        },
        include: {
          posts: { include: { createdBy: true } },
          followers: true,
          following: true,
        },
      });
    }),
  toggleFollow: protectedProcedure
    .input(
      z.object({
        followerId: z.string().min(1),
        followedId: z.string().min(1),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const currentUserId = ctx.session.user.id;

      const existingFollow = await ctx.db.user.findFirst({
        where: {
          id: input.followedId,
          followers: { some: { followerId: currentUserId } },
        },
      });

      const data = {
        followedId: input.followedId,
        followerId: currentUserId,
      };

      if (!existingFollow) {
        await ctx.db.user.update({
          where: {
            id: data.followedId,
          },
          data: {
            followersCount: { increment: 1 },
          },
        });

        await ctx.db.user.update({
          where: {
            id: data.followerId,
          },
          data: {
            followingCount: { increment: 1 },
          },
        });
      }
    }),
});
