import Link from 'next/link'
import React from 'react'
import { HomeIcon, MobileIcon, PlusIcon } from "@radix-ui/react-icons";
import UserAvatar from "@/components/useravatar";

const Header = () => {
  return (
    <header>
        <div className=" flex bg-stone-100">
          <div className=" pl-20 h-24 bg-stone-100 border-solid flex justify-start gap-8 w-4/5">
            <Link href={"/home"}>
              <img
                className=" w-32 h-24"
                src="https://i.ibb.co/WsjkGpY/travel-planner-transparent.png"
                alt="travel-planner-transparent"
              />
            </Link>
            <Link href={"/home"}>
              <HomeIcon className="text-center mt-4 w-10 size-10" />
              Home
            </Link>
            <Link href={""}>
              <MobileIcon className="mx-4 mt-4 w-10 size-10" />
              Contact-Us
            </Link>
          </div>
          <UserAvatar />
        </div>
      </header>
  )
}

export default Header
