"use client";
import { Button } from "./ui/button";
import { Cross1Icon } from "@radix-ui/react-icons";

const Modal = ({ show, onClose, children }: any) => {
  return (
    <div
    style={{
        transform: show ? "translateX-[0%]" : "translateX-[-200%]",
    }}
    className=" absolute top-3 left-0 w-full h-full z-10 transition-all duration-500">
      <div className="container max-w-xl mx-auto h-[70vh] rounded-2xl py-6 px-4 bg-pink-100 ">
        <Button
        onClick={()=>{
            onClose(false);
        }}
        className=" rounded-full text-black bg-white hover:bg-red-300">
            <Cross1Icon/>
        </Button>
        {children}
      </div>
    </div>
  );
};

export default Modal;
