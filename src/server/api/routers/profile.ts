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
        followedId: z.string().min(1),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const currentUserId = ctx.session.user.id;
      const data = {
        followedId: input.followedId,
        followerId: currentUserId,
      };

      const existingFollow = await ctx.db.user.findFirst({
        where: {
          id: input.followedId,
         
        },
        include: {
          following: true,
          followers: true,
        },
      });

      console.log(existingFollow);

      await ctx.db.follow.create({
        data: {
          follower: { connect: { id: data.followerId } },
          followed: { connect: { id: data.followedId } },
        },
      });
    }),
});
