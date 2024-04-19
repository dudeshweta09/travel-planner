import React from 'react'
import { TripData } from '../../schema'
import { Trash2Icon } from 'lucide-react'
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import DbController from '../../db-controller'
import { useRouter } from 'next/navigation'
import {  format } from "date-fns"

const DisplayItinerary = () => {
    const dbController = new DbController();
    const router = useRouter();

  return (
    <Table>
  <TableCaption>A list of your recent Itinerary.</TableCaption>
  <TableHeader>
    <TableRow>
      <TableHead>Date</TableHead>
      <TableHead>Place</TableHead>
      <TableHead>Time</TableHead>
    </TableRow>
  </TableHeader>
  <TableBody>
         {dbController.existingItineraryList.map((e:TripData)=>(
        <TableRow>
        <TableCell>{format(e.date,"PPP")}</TableCell>
        <TableCell>{e.place}</TableCell>
        <TableCell>{e.time}</TableCell>
        <TableCell>
        <Trash2Icon onClick={()=>{
            dbController.onDeleteItinerary(e.place,()=>{
                router.refresh();
            })
        }}/>
        </TableCell>
        </TableRow>
      ))}
    
  </TableBody>
</Table>
  )
}

export default DisplayItinerary
