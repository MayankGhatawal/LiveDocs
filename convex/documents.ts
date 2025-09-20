import { mutation, query } from "./_generated/server";

import { v } from "convex/values";
export const create = mutation({
args: { title: v.optional(v.string()) },
handler: async () => {},
}) ;

export const get = query({
  handler: async (ctx) => {
    return await ctx.db.query("documents").collect();
  },
});