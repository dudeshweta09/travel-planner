"use client";
import BgImage from "@/components/bgimage";
import LoginForm from "@/components/login-form";
import Modal from "@/components/modal";
import SignUpForm from "@/components/signup-form";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import React, { useState } from "react";

const HomeMain = () => {
  const [modalIsLoginOpen, setModalIsLoginOpen] = useState(false);
  const [modalIsSignUpOpen, setModalIsSignUpOpen] = useState(false);
  return (
    <div className=" h-screen">
      <div className=" py-5 flex justify-between max-w-[140vh] mx-auto">
        <Link href={"/home"}>
            <img className="w-36" src="https://i.ibb.co/WsjkGpY/travel-planner-transparent.png"
             alt="travel-planner-transparent"/>
        </Link>
        {modalIsLoginOpen && <Modal show={modalIsLoginOpen} onClose={setModalIsLoginOpen}>
          <LoginForm/>
          </Modal>}
          {modalIsSignUpOpen && <Modal show={modalIsSignUpOpen} onClose={setModalIsSignUpOpen}>
          <SignUpForm />
          </Modal>}
        <div className="flex gap-3 pt-14 pr-9">
        <Button
        className=" bg-amber-50 text-black border hover:bg-green-50"
          onClick={() => {
            setModalIsLoginOpen(true);
          }}
        >
          Login
        </Button>
        <Button
        onClick={()=>{
          setModalIsSignUpOpen(true);
        }}
        >
          SignUp
        </Button>
        </div>
      </div>
      <div className=" w-1/2 mx-auto text-center">
        <BgImage/>
        <p className=" text-3xl"><b>Make your travelling experience best with us.</b></p>
      </div>
    </div>
  );
};

export default HomeMain;
