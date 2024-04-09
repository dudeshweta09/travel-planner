"use client";
import React, { useEffect, useState } from "react";
import { existTripDetails, TripDetails } from "@/components/addtrip";
import { existTripMates, NameList } from "@/components/modal2";
import { CalendarClockIcon, IndianRupeeIcon } from "lucide-react";
import { DateRange } from "react-day-picker";
import { differenceInCalendarDays } from "date-fns";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import EditBudget from "@/components/editbudget";
import AddExpense from "@/components/addexpense";
import Table from "@/components/tripitinerary";

export interface Budget {
  filter(arg0: (bg: Budget) => void): unknown;
  push(newAmount: { amount: string }): unknown;
  amount: string;
}

export interface Expense {

  reduce(arg0: (prev: any, next: any) => any, arg1: number): any;
  push(newExpense: {
    category: string;
    title: string;
    amount: string;
  }): unknown;
  category: string;
  title: string;
  amount: string;
}

export const existingBudget: Budget =
  JSON.parse(localStorage.getItem("Trav_Budget")!) || [];

export const existingExpense: Expense =
  JSON.parse(localStorage.getItem("Trav_Expense")!) || [];

const DisplayPlanning = () => {
  const [cityName, setCityName] = useState("");
  const [countryName, setCountryName] = useState("");
  const [hotelName, setHotelName] = useState("");
  const [days, setDays] = useState(0);
  const [date, setDate] = useState<DateRange | undefined>();
  const [mates, setMates] = useState("");
  const noOfDays = [...Array(days)];
  const [budget, setBudget] = useState("0");
  const [category, setCategory] = useState("");
  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");
  const [balance, setBalance] = useState("");

  useEffect(() => {
    const totalExpense = existingExpense.reduce((prev: any, next: any) => {
      return prev + parseFloat(next.amount);
    }, 0);
    const totalIncome = parseFloat(budget);
    const balance = totalIncome - totalExpense;
      setBalance(balance.toString());
  }, [balance, budget]);

  useEffect(() => {
    if (date && date.from && date.to) {
      const dayCount = differenceInCalendarDays(date.to, date.from);
      setDays(dayCount);
    }
  }, [date]);
  useEffect(() => {
    const details = existTripDetails?.filter((td: TripDetails) => {
      setCityName(td.citiName);
      setCountryName(td.countrieName);
      setHotelName(td.hoteLName);
      setDate(td.date);
      const tripMates = existTripMates?.filter((tm: NameList) => {
        setMates(tm.title);
      });
      const getBudgetAmount = existingBudget?.filter((bg: Budget) => {
        setBudget(bg.amount);
      });
    });
  }, []);

  const updateBudget = () => {
    const newAmount = {
      amount: budget,
    };
    if (existingBudget == null) {
      localStorage.setItem("Trav_Budget", JSON.stringify([newAmount]));
    } else {
      existingBudget.push(newAmount);
      localStorage.setItem("Trav_Budget", JSON.stringify(existingBudget));
    }
  };

  const updateExpense = () => {
    const newExpense = {
      category: category,
      title: title,
      amount: amount,
    };

    if (existingExpense == null) {
      localStorage.setItem("Trav_Expense", JSON.stringify([newExpense]));
    } else {
      existingExpense.push(newExpense);
      localStorage.setItem("Trav_Expense", JSON.stringify(existingExpense));
    }
  };
  return (
    <>
      <div className="h-screen pb-5 bg-stone-100">
        <div className="w-1/2 mx-auto mt-5 bg-blue-500 rounded-lg p-6 text-white">
          <p className=" text-4xl text-center underline mt-3">
            Trip to {cityName} - {countryName}
          </p>
          <p className=" text-3xl text-center mt-3">Hotel - {hotelName}</p>
          <div className="flex">
            <CalendarClockIcon className=" size-8 text-white" />
            <p className=" ml-3 mt-2">No. of Days {days}</p>
          </div>
          <div className=" mt-4">
            <p>Partner with you:</p>
            <ul>
              <li>{mates}</li>
            </ul>
          </div>
        </div>
        <div className="w-1/2 mx-auto mt-5 bg-blue-500 rounded-lg p-6 text-white">
          <div className="flex justify-between">
            <h4 className="xl:text-4xl font-serif">
              <b>Budgeting</b>
            </h4>
            <AddExpense
              setCategory={setCategory}
              title={title}
              setTitle={setTitle}
              amount={amount}
              setAmount={setAmount}
              onAddExpense={updateExpense}
            />
          </div>
          <div className="mt-5 bg-slate-300 text-black rounded-md p-4">
            <p className="text-md flex justify-between">
              <b className="flex">
                budget: <IndianRupeeIcon />
                {budget}
              </b>
              <b className="flex">
                Balance: <IndianRupeeIcon />
                {balance}
              </b>
            </p>
            <div className="flex gap-3 mt-8 ">
              <EditBudget
                budget={budget}
                setBudget={setBudget}
                setAmount={updateBudget}
              />
              <Button>View Summary</Button>
            </div>
          </div>
        </div>
        <div className="rounded-lg h-56 w-11/12 mx-auto bg-blue-300 my-4">
          <h1 className="text-4xl underline italic font-mono text-center pt-3">
            Itinerary List
          </h1>
          <Table />
        </div>
        <div></div>
      </div>
    </>
  );
};

export default DisplayPlanning;
