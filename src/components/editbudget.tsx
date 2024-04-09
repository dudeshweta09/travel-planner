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



const EditBudget = ({ budget, setBudget, setAmount }: any) => {
    
  function handleChange(e: any) {
        setBudget(e.target.value);     
  }
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Edit Budget</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>SET BUDGET</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Input
              type="text"
              value={budget}
              onChange={handleChange}
            />
          </div>
        </div>
        <DialogFooter className="sm:justify-between">
          <Button type="button" onClick={setAmount}>Save</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default EditBudget;
