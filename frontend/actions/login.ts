"use server";

import { signInSchema } from "@/schemas/schemas";
import * as z from "zod";
import { signIn } from "@/auth";

export const login = async (values: z.infer<typeof signInSchema>) => {
  const validatedFields = signInSchema.safeParse(values);
  if (!validatedFields.success) return { Error: "Invalid Fields!" };
  await signIn();
  return { Success: "Login success" };
};
