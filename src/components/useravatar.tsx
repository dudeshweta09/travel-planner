"use client"
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar"
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover"
import { Button } from "./ui/button"
import { useEffect, useState } from "react"
import DbController from "../../db-controller"
import { RegisterType } from "../../schema"
import { useRouter } from "next/navigation"

const UserAvatar = () => {
  const dbController = new DbController();
  const router = useRouter();
  const [userName, setUserName] = useState("");
  useEffect(()=>{
    const name = dbController.existingAccount?.filter((ud: RegisterType)=>{
      setUserName(ud.firstname.toLocaleUpperCase())
    })
  })

  const handleLogout = () =>{
    dbController.onLogOut();
    router.push("/");

  }
  return (
    <div className="flex">
      <p className="mt-9">HI,{userName}</p>
    <Popover>
      <PopoverTrigger>
    <Avatar className=" ml-4">
      <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
      <AvatarFallback>CN</AvatarFallback>
    </Avatar>
    </PopoverTrigger>
    <PopoverContent>
      <Button
      onClick={handleLogout}
      className="ml-20">Logout</Button>
    </PopoverContent>
    </Popover>
    </div>
  )
}

export default UserAvatar

