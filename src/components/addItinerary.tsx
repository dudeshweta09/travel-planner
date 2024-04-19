import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { PlusIcon } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

const AddItinerary = ({dates, setDates, place, setPlace, time, setTime, onAddItinerary}:any) => {
  
  return (
    <Popover>
      <PopoverTrigger asChild className=" md:rounded-full">
        <Button variant="outline" className="md:rounded-full ml-6">
          <PlusIcon />
          Add Itnerary
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80">
        <div className="grid gap-4">
          <div className="space-y-2">
            <h4 className="font-medium leading-none">Itinerary</h4>
            <p className="text-sm text-muted-foreground">
              Add list to make travel easy..
            </p>
          </div>
          <div className="grid gap-2">
            <div className="flex items-center gap-6">
              <Label htmlFor="date">Date</Label>
              <Input
                id="date"
                type="date"
                value={dates}
                onChange={(e) => {
                  setDates(e.target.value);
                }}
                required
              />
            </div>
            <div className="flex items-center gap-6">
              <Label htmlFor="place">Place</Label>
              <Input
                id="place"
                type="text"
                value={place}
                onChange={(e) => {
                  setPlace(e.target.value);
                }}
                required
                placeholder="write to remeber"
                className="col-span-1 w-1/2 ml-7 h-8"
              />
            </div>
            <div className="flex items-center gap-6">
              <Label htmlFor="time">Time</Label>
              <Input
                type="time"
                id="time"
                value={time}
                required
                onChange={(e) => setTime(e.target.value)}
                placeholder=""
                className="col-span-1 w-1/2 ml-1 h-8"
              />
            </div>
            <div className=" w-1/2 mx-auto">
              <Button onClick={onAddItinerary}>Add</Button>
            </div>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default AddItinerary;
