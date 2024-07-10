"use client";

import { Card, CardHeader, CardTitle, CardContent, CardDescription, CardFooter } from "@/components/ui/card";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import GridPattern from "@/components/magicui/AnimatedGridPattern";
import { signInSchema } from "@/schemas/schemas";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Eye, EyeOff, KeySquare, User, UserMinus } from "lucide-react";
import { useState } from "react";
import Link from "next/link";
import profilePicPlaceHolder from "@/public/images/profile-placeholder.png";
import Image from "next/image";
import { ExclamationTriangleIcon } from "@radix-ui/react-icons";
import { login } from "@/actions/login";

interface FormMessageProps {
  message: string;
}

const FormError: React.FC<FormMessageProps> = ({ message }) => {
  if (!message) return null;
  return (
    <div className="bg-destructive/15 p-2 rounded-md flex items-center text-sm text-destructive gap-x-2">
      <ExclamationTriangleIcon className="w-4 h-4" />
      <p>{message}</p>
    </div>
  );
};

const FormSuccess: React.FC<FormMessageProps> = ({ message }) => {
  if (!message) return null;
  return (
    <div className="bg-emerald-500/15 p-2 rounded-md flex items-center text-sm text-emerald-500 gap-x-2">
      <ExclamationTriangleIcon className="w-4 h-4" />
      <p>{message}</p>
    </div>
  );
};

const LoginPage = () => {
  const form = useForm<z.infer<typeof signInSchema>>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  function onSubmit(values: z.infer<typeof signInSchema>) {
    login(values);
  }

  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="flex flex-col h-screen w-full justify-center items-center relative">
      <div className="inset-0 absolute overflow-hidden z-0 blur-sm bg-sky-200/20">
        <GridPattern className="w-[200%] skew-y-6 h-[200%]" width={55} height={55} maxOpacity={0.3} />
      </div>
      <Card className="z-10 w-[400px] space-y-5 shadow-2xl bg-gradient-to-b from-stone-100 to-stone-50">
        <CardHeader className="flex flex-col items-center justify-center space-y-2">
          <Image src={profilePicPlaceHolder} alt="@shadcn" width={80} height={80} />

          <CardTitle className="font-bond text-3xl text-zinc-800">🔐 Login</CardTitle>
          <CardTitle className="font-semibold text-sm text-zinc-500">Welcome back</CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-semibold text-zinc-700">Email</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter email" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-semibold text-zinc-700">Password</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Input className="pe-8" placeholder="Enter password" {...field} type={showPassword ? "text" : "password"} />
                        <Button
                          variant="transparent"
                          size="icon"
                          className="absolute right-1 top-1/2 -translate-y-1/2 text-zinc-500"
                          onClick={(e) => {
                            e.preventDefault();
                            setShowPassword((prev) => !prev);
                          }}
                        >
                          {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                        </Button>
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormError message="" />
              <FormSuccess message="" />
              <Button type="submit" className="w-full">
                Login
              </Button>
            </form>
          </Form>
        </CardContent>
        <CardFooter className="w-full float-end">
          <Link href="/auth/register" className="text-sm font-semibold text-zinc-500 text-center">
            Don't have an account? <span className="text-sky-600">Register here</span>
          </Link>
        </CardFooter>
      </Card>
    </div>
  );
};

export default LoginPage;
