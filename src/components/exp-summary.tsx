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
import { Label } from "./ui/label";
import DbController from "../../db-controller";
import { Expense } from "../../schema";
import { useEffect, useState } from "react";
import { Trash2Icon } from "lucide-react";
import { useRouter } from "next/navigation";
import { rupee } from "@/app/display/page";


const ExpSummary = ({data}: {data: Array<Expense>}) => {
    const dbController = new DbController();
    const router = useRouter();
    const [total, setTotal] = useState(0);

    useEffect(()=>{
        const currentExpense = dbController.getCurrentExistingExpense();
    const totalExpense = currentExpense.reduce((prev: any, next: any) => {
      return prev + parseFloat(next.amount);
    }, 0);
    setTotal(totalExpense)
    })
    
   return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">View Summary</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] xl:max-w-[550px]">
        <DialogHeader>
          <DialogTitle className="text-center">Expenses Done</DialogTitle>
        </DialogHeader>
        <div className="grid gap-2 py-2">
            {data.map((e)=>(
          <div className="grid grid-cols-3 items-center gap-2">
            <Label className="pl-3 font-serif font-medium text-md">Category - {e.category}</Label>
            <Label className="pl-3 font-serif font-medium text-md">Amount - {rupee.format(e.amount)}</Label>
              <Trash2Icon onClick={
                ()=>{
                dbController.onDeleteExp(e.title,()=>{
                  router.refresh();
                })
              }
              }/>
          </div>
          ))}
        </div>
        <DialogFooter className="sm:justify-between">
            <p className=" font-serif font-medium">Total Expense - {rupee.format(total)}</p>
        </DialogFooter>
        </DialogContent>
    </Dialog>
  );
};

export default ExpSummary;
