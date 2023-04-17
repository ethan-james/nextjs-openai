import { z } from "zod";
import { ChatGPTAPI } from "chatgpt";

import {
  createTRPCRouter,
  publicProcedure,
  protectedProcedure,
} from "~/server/api/trpc";

declare const process: {
  env: {
    OPENAI_API_KEY: string;
  };
};

export const chatRouter = createTRPCRouter({
  getAnswer: publicProcedure
    .input(z.object({ text: z.string() }))
    .query(async ({ input }) => {
      if (!input) return { text: "" };

      const api = new ChatGPTAPI({ apiKey: process.env.OPENAI_API_KEY });
      const response = await api.sendMessage(input.text);
      return response;
    }),

  getSecretMessage: protectedProcedure.query(() => {
    return "you can now see this secret message!";
  }),
});
