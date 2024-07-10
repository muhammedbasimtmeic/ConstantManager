import { signIn } from "@/auth";
import { Button } from "../ui/button";
import { redirect } from "next/navigation";

export const SignIn = async () => {
  return (
    <form
      action={async () => {
        "use server";
        await signIn();
      }}
    >
      <Button type="submit">Sign in</Button>
    </form>
  );
};
