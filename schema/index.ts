import * as z from 'zod';

export const LoginSchema = z.object({
    email: z.string().email({
        message: "E-mail is required"
    }),
    password: z.string().min(6,{
        message: "Password must be of 6 characters long."
    })
})

export const RegisterSchema = z.object({
    firstname: z.string().min(1,{
        message: "First name to enter"
    }),
    lastname: z.string().min(1,{
        message: "Last name to enter"
    }),
    email: z.string().email({
        message: "Enter e-mail address"
    }),
    password: z.string().min(6,{
        message: "Password must be 6 characters long"
    }),
    confirmpassword: z.string().min(6,{
        message:"Password must be 6 characters long"
    })
}).refine((data)=>{
    return data.password === data.confirmpassword
},{
    message:"Password do not match",
    path:["confirmpassword"]
})

export type LoggedInType = z.infer<typeof LoginSchema>
export type RegisterType = z.infer<typeof RegisterSchema>
export type TripData = {
  [x: string]: any;
  id: number;
  date: string;
  place: string;
  time: string;
};
export interface Budget {
  filter(arg0: (bg: Budget) => void): unknown;
  push(newAmount: { amount: number }): unknown;
  amount: number;
}

export interface Expense {
  reduce(arg0: (prev: any, next: any) => any, arg1: number): any;
  push(newExpense: {
    category: string;
    title: string;
    amount: number;
  }): unknown;
  category: string;
  title: string;
  amount: number;
}

export interface RenderTrips{
    city: string,
}