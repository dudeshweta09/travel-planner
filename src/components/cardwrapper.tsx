"use client";
import {
  Card,
  CardContent,
  CardHeader,
} from "@/components/ui/card";
import React from "react";
import AuthHeader from "./authheader";

interface CardWrapperProps {
  label: string;
  title: string;
  children: React.ReactNode;
}
const CardWrapper = ({
  label,
  title,
  children,
}: CardWrapperProps) => {
  return (
    <Card className="text-black xl:W-1/4 md:w-1/2 mt-5 shadow-md mx-auto bg-stone-100">
      <CardHeader>
        <AuthHeader label={label} title={title} />
      </CardHeader>
      <CardContent>{children}</CardContent>
    </Card>
  );
};

export default CardWrapper;
