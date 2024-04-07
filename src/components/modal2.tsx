"use client";
import { useEffect, useState } from "react";
import { Input } from "./ui/input";


export interface NameList {
  title: string;
  id: string;
}

export const existTripMates =
  JSON.parse(localStorage.getItem("Exist_Tripmates")!) || [];

export const Modal2 = ({ show, onClose }: any) => {
  const [name, setName] = useState("");
  const [mateNames, setMateNames] = useState<NameList[]>([]);

  const getTripMates = () =>{
    let tempNameList = localStorage.getItem("Exist_Trimpmate");
    if(tempNameList == null){
      setMateNames([]);
    }else{
      setMateNames(JSON.parse(tempNameList));
    }
  
  }

  useEffect(()=>{
    getTripMates();
  })

  const onAddNames = (e: any) => {
    const newName = { id: new Date().getTime().toString(), title: name };
    if (existTripMates == null) {
      localStorage.setItem("Exist_Tripmates", JSON.stringify([newName]));
    } else {
      existTripMates.push(newName);
      localStorage.setItem("Exist_Tripmates", JSON.stringify(existTripMates));
    }
    setName("");
    getTripMates();
    onClose(false);
  };

  const onKeyDown = (e: { key: string }) => {
    if (e.key == "Enter") {
      onClose(false);
    }
  };
  return (
    <div className=" absolute w-1/2 h-[10vh] z-10 transition-all duration-500">
      <div className=" w-1/2 h-[10vh] rounded-xl py-6 px-4 bg-pink-50 ">
        <Input
          onKeyDown={onKeyDown}
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-10/12"
          type="text"
        />
        <button type="button" onClick={onAddNames}>
          ADD
        </button>
      </div>
    </div>
  );
};


  

