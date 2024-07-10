"use client";

import { Card, CardHeader, CardTitle, CardContent, CardDescription, CardFooter } from "@/components/ui/card";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import GridPattern from "@/components/magicui/AnimatedGridPattern";
import { registerSchema, signInSchema } from "@/schemas/schemas";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Eye, EyeOff, SquareCheck } from "lucide-react";
import { useState, useTransition } from "react";
import Link from "next/link";
import profilePicPlaceHolder from "@/public/images/profile-placeholder.png";
import Image from "next/image";
import { register } from "@/actions/register";
import { LOGIN_ROUTE } from "@/routes";
import { useRouter } from "next/navigation";
import { ExclamationTriangleIcon } from "@radix-ui/react-icons";

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
      <SquareCheck className="w-4 h-4" />
      <p>{message}</p>
    </div>
  );
};

const RegisterPage = () => {
  const router = useRouter();
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");
  const [isPending, startTransistion] = useTransition();

  const form = useForm<z.infer<typeof registerSchema>>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
      image: "",
    },
  });

  const onSubmit = (values: z.infer<typeof registerSchema>) => {
    startTransistion(() => {
      register(values).then((data) => {
        setError(data.Error);
        setSuccess(data.Success);
        if (data.Success) {
          setTimeout(() => {
            form.reset();
            router.push(LOGIN_ROUTE);
          }, 3000);
        }
      });
    });
  };

  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="flex flex-col h-screen w-full justify-center items-center relative">
      <div className="inset-0 absolute overflow-hidden z-0 blur-sm bg-sky-200/20">
        <GridPattern className="w-[200%] skew-y-6 h-[200%]" width={55} height={55} maxOpacity={0.3} />
      </div>
      <Card className="z-10 w-[400px] space-y-5 shadow-2xl bg-gradient-to-b from-stone-100 to-stone-50">
        <CardHeader className="flex flex-col items-center justify-center space-y-2">
          <Image src={profilePicPlaceHolder} alt="@shadcn" width={80} height={80} className="mb-2" />
          <CardTitle className="font-bond text-3xl text-zinc-800"> Register</CardTitle>
          <CardTitle className="font-semibold text-sm text-zinc-500">Create your new account here</CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-semibold text-zinc-700">Username</FormLabel>
                    <FormControl>
                      <Input placeholder="Username " {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-semibold text-zinc-700">Email</FormLabel>
                    <FormControl>
                      <Input placeholder="Email Address" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="space-y-2">
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="font-semibold text-zinc-700">Password</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Input className="pe-8" placeholder="Password" {...field} type={showPassword ? "text" : "password"} />
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

                <FormField
                  control={form.control}
                  name="confirmPassword"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <div className="relative">
                          <Input className="pe-8" placeholder="Confirm password" {...field} type={showPassword ? "text" : "password"} />
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
              </div>

              <FormField
                control={form.control}
                name="image"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-semibold text-zinc-700">Profile Picture</FormLabel>
                    <FormControl>
                      <Input className="" placeholder="Image URL" {...field} type="url" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormError message={error as string} />
              <FormSuccess message={success as string} />

              <div className="space-y-2 pt-2">
                <Button type="submit" className="w-full" disabled={isPending}>
                  {isPending ? "Registering User..." : "Create Account"}
                </Button>
                <Button
                  type="reset"
                  className="w-full"
                  variant="outline"
                  disabled={isPending}
                  onClick={(e) => {
                    e.preventDefault(), form.reset(), setSuccess(""), setError("");
                  }}
                >
                  Reset
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
        <CardFooter className="w-full float-end">
          <Link href="/auth/login" className="text-sm font-semibold text-zinc-500 text-center">
            Already a Member? <span className="text-sky-600">Login</span>
          </Link>
        </CardFooter>
      </Card>
    </div>
  );
};

export default RegisterPage;
