import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { PlusIcon } from "lucide-react"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"


const AddExpense = ({setCategory, title, setTitle, amount, setAmount, onAddExpense}:any) =>{
  return (
    <Popover>
      <PopoverTrigger asChild className=" bg-red-500">
        <Button variant="outline"><PlusIcon/>Add Expense</Button>
      </PopoverTrigger>
      <PopoverContent className="w-80">
        <div className="grid gap-4">
          <div className="space-y-2">
            <h4 className="font-medium leading-none">Expenses</h4>
            <p className="text-sm text-muted-foreground">
              Record all your expenses.
            </p>
          </div>
          <div className="grid gap-2">
            <div className="flex items-center gap-6">
              <Label htmlFor="category">Category</Label>
              <select id="category" onChange={(e)=>{setCategory(e.target.value)}} className=" w-1/2">
                <option value="flight">Flight</option>
                <option value="hotel">Hotel</option>
                <option value="car">Car</option>
                <option value="restraunt">Restraunt</option>
              </select>
            </div>
            <div className="flex items-center gap-6">
              <Label htmlFor="title">Title</Label>
              <Input
                id="title"
                type="text"
                value={title}
                onChange={(e)=>{setTitle(e.target.value)}}
                placeholder="write to remeber"
                className="col-span-2 h-8"
              />
            </div>
            <div className="flex items-center gap-6">
              <Label htmlFor="amount">Amount</Label>
              <Input
              type="text"
                id="amount"
                value={amount}
                onChange={(e)=>setAmount(e.target.value)}
                placeholder="enter the amount"
                className="col-span-2 h-8"
              />
            </div>
            <div className=" w-1/2 mx-auto">
              <Button onClick={onAddExpense}>Add</Button>
            </div>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  )
}

export default AddExpense
