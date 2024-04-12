"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "./ui/label";
import DbController from "../../db-controller";
import { Expense } from "../../schema";
import { useEffect, useState } from "react";



const ExpSummary = ({data}: {data: Array<Expense>}) => {
    const dbController = new DbController();
    const [total, setTotal] = useState("");

    useEffect(()=>{
        const currentExpense = dbController.getCurrentExistingExpense();
    const totalExpense = currentExpense.reduce((prev: any, next: any) => {
      return prev + parseFloat(next.amount);
    }, 0);
    setTotal(totalExpense.toString())
    })
    
   return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">View Summary</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="text-center">Expenses Done</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
            {data.map((e)=>(
          <div className="grid grid-cols-2 items-center gap-4">
            <Label className="pl-5 font-serif font-medium text-md">Category - {e.category}</Label>
            <Label className="pl-5 font-serif font-medium text-md">Amount - {e.amount}</Label>
          </div>
          ))}
        </div>
        <DialogFooter className="sm:justify-between">
            <p className=" font-serif font-medium">Total Expense - {total}</p>
        </DialogFooter>
        </DialogContent>
    </Dialog>
  );
};

export default ExpSummary;
