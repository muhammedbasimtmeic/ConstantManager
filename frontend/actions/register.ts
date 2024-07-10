import { registerSchema } from "@/schemas/schemas";
import axios from "axios";
import * as z from "zod";

export const register = async (values: z.infer<typeof registerSchema>) => {
  const validatedFields = registerSchema.safeParse(values);

  if (!validatedFields.success) return { Error: "Invalid Fields!" };

  try {
    const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/user/register`, {
      username: validatedFields.data.name,
      email: validatedFields.data.email,
      password: validatedFields.data.password,
      image: validatedFields.data.image,
    });

    if (response.status === 201) {
      return { Success: "User created successfully" };
    } else {
      return { Error: "Failed to create user" };
    }
  } catch (error) {
    if (axios.isAxiosError(error)) {
      if (error.response?.status === 400) {
        return { Error: "User already exists with email" };
      } else if (error.response?.status === 422) {
        return { Error: "Data validation error" };
      }
      return { Error: `Error creating user: ${error.response?.data?.message || error.message}` };
    } else {
      return { Error: `Error creating user: ${error}` };
    }
  }
};
