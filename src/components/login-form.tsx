import React from "react";
import { useForm } from "react-hook-form";
import { LoggedInType, LoginSchema } from "../../schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import Link from "next/link";
import DbController from "../../db-controller";
import { useRouter } from "next/navigation";

const LoginForm = () => {
    const dbController = new DbController();
    const router = useRouter();
  const form = useForm<z.infer<typeof LoginSchema>>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });
  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit((data: LoggedInType)=>{
            dbController.onLoggIn(data,()=>{
                router.push("/create")
            })
        })}>
          <header className="w-1/2 mx-auto text-2xl underline">
            <h2 className="text-center">LogIn Now</h2>
          </header>
          <div className="w-10/12 mx-auto mt-5">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem className="mt-3">
                  <FormLabel className="xl:text-xl lg:text-lg">
                    E-mail
                  </FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      type="email"
                      placeholder="Enter your Email / Username"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem className="mt-3">
                  <FormLabel className="xl:text-xl lg:text-lg">
                    Password
                  </FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      type="password"
                      placeholder="Required Password"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="w-1/2 mx-auto">
        <Button type="submit" className="mt-8 w-3/12 ml-28">Log-In</Button><br/>
        <Link href={""} className="ml-20 mt-3 underline hover:text-blue-500">Forgot Password?</Link>
      </div>
        </form>
      </Form>
      
    </>
  );
};

export default LoginForm;
