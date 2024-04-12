import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { RegisterSchema, RegisterType } from "../../schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "./ui/form";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import DbController from "../../db-controller";
import { useRouter } from "next/navigation";

const SignUpForm = () => {
  const dbController = new DbController();
  const router = useRouter();
  const form = useForm<z.infer<typeof RegisterSchema>>({
    resolver: zodResolver(RegisterSchema),
    defaultValues: {
      firstname: "",
      lastname: "",
      email: "",
      password: "",
      confirmpassword: "",
    },
  });
  return (
    <>
    <Form {...form}>
      <form onSubmit={form.handleSubmit((data: RegisterType)=>{
        dbController.onRegisteration(data,()=>{
        })
      })}>
        <header className="w-1/2 mx-auto text-2xl underline">
          <h2 className="text-center">Sign Up</h2>
        </header>
        <div>
          <FormField
          control={form.control}
          name="firstname"
          render={({field})=>(
            <FormItem>
              <FormLabel className="xl:text-lg lg:text-lg">First Name</FormLabel>
              <FormControl>
                <Input
                {...field}
                type="text"
                placeholder="eg: john"
                />
              </FormControl>
              <FormMessage/>
            </FormItem>
          )}
          />
          <FormField
          control={form.control}
          name="lastname"
          render={({field})=>(
            <FormItem>
              <FormLabel className="xl:text-lg lg:text-lg">Last Name</FormLabel>
              <FormControl>
                <Input
                {...field}
                type="text"
                placeholder="eg: doe"
                />
              </FormControl>
              <FormMessage/>
            </FormItem>
          )}
          />
          <FormField
          control={form.control}
          name="email"
          render={({field})=>(
            <FormItem>
              <FormLabel className="xl:text-lg lg:text-lg">E-mail</FormLabel>
              <FormControl>
                <Input
                {...field}
                type="email"
                placeholder="example@gmail.com"
                />
              </FormControl>
              <FormMessage/>
            </FormItem>
          )}
          />
          <FormField
          control={form.control}
          name="password"
          render={({field})=>(
            <FormItem>
              <FormLabel className="xl:text-lg lg:text-lg">Password</FormLabel>
              <FormControl>
                <Input
                {...field}
                type="password"
                placeholder="XXXXXX"
                />
              </FormControl>
              <FormMessage/>
            </FormItem>
          )}
          />
          <FormField
          control={form.control}
          name="confirmpassword"
          render={({field})=>(
            <FormItem>
              <FormLabel className="xl:text-lg lg:text-lg">Confirm Password</FormLabel>
              <FormControl>
                <Input
                {...field}
                type="password"
                placeholder="XXXXXX"
                />
              </FormControl>
              <FormMessage/>
            </FormItem>
          )}
          />
        </div>
        <Button type="submit" className="mt-5 w-full">Register</Button>
      </form>
    </Form>
    </>
  );
};

export default SignUpForm;
