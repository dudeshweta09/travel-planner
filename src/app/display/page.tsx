"use client";
import React, { useEffect, useState } from "react";
import { TripDetails } from "@/components/addtrip";
import { CalendarClockIcon, IndianRupeeIcon } from "lucide-react";
import { DateRange } from "react-day-picker";
import { differenceInCalendarDays } from "date-fns";
import EditBudget from "@/components/editbudget";
import AddExpense from "@/components/addexpense";
import Table from "@/components/tripitinerary";
import { NameList } from "@/components/modal2";
import Header from "@/components/header";
import DbController from "../../../db-controller";
import { useRouter } from "next/navigation";
import { Expense, Budget } from "../../../schema";
import ExpSummary from "@/components/exp-summary";
import { Progress } from "@/components/ui/progress";
import { dancingScript, playfairDisplay } from "../../../utils/fonts";


const DisplayPlanning = () => {
  const dbController = new DbController();
  const [cityName, setCityName] = useState("");
  const [countryName, setCountryName] = useState("");
  const [hotelName, setHotelName] = useState("");
  const [days, setDays] = useState(0);
  const [date, setDate] = useState<DateRange | undefined>();
  const [mates, setMates] = useState<NameList[]>([]);
  const noOfDays = [...Array(days)];
  const [budget, setBudget] = useState("0");
  const [category, setCategory] = useState("flight");
  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");
  const [balance, setBalance] = useState("");
  const [totalExpense, setTotalExpense] = useState(0);
  const [percent, setPercent] = useState(0);
  const router = useRouter();
  const expense:Array<Expense> = dbController.getCurrentExistingExpense()

   useEffect(() => {
    const currentExpense = dbController.getCurrentExistingExpense();
    const totalExpense = currentExpense.reduce((prev: any, next: any) => {
      return prev + parseFloat(next.amount);
    }, 0);
    const totalIncome = parseFloat(budget);
    const balance = totalIncome - totalExpense;
    const totalPercent = totalExpense*100/totalIncome;
      setBalance(balance.toString());
      setTotalExpense(totalExpense);
      setPercent(totalPercent);
  }, [setBalance, dbController.existingExpense, dbController.existingBudget, balance]);

  useEffect(() => {
    if (date && date.from && date.to) {
      const dayCount = differenceInCalendarDays(date.to, date.from);
      setDays(dayCount);
    }
  }, [date]);
  useEffect(() => {
    const currentBudget = dbController.getCurrentExistingBudget()
    const details = dbController.existingTripDetails?.filter((td: TripDetails) => {
      setCityName(td.citiName);
      setCountryName(td.countrieName);
      setHotelName(td.hoteLName);
      setDate(td.date);
      setMates(td.title);
    
      const getBudgetAmount = currentBudget?.filter((bg: Budget) => {
        setBudget(bg.amount);
      });
    });
  }, []);

  const updateBudget = () => {
    const newAmount = {
      amount: budget,
    };
    if (dbController.existingBudget == null) {
      localStorage.setItem("Trav_Budget", JSON.stringify([newAmount]));
    } else {
      dbController.existingBudget.push(newAmount);
      localStorage.setItem("Trav_Budget", JSON.stringify(dbController.existingBudget));
    }
  };

  const updateExpense = () => {
    const newExpense = {
      category: category,
      title: title,
      amount: amount,
    };

    if (dbController.existingExpense == null) {
      localStorage.setItem("Trav_Expense", JSON.stringify([newExpense]));
    } else {
      dbController.existingExpense.push(newExpense);
      localStorage.setItem("Trav_Expense", JSON.stringify(dbController.existingExpense));
      router.refresh()
    }
  };
  return (
    <>
    <Header/>
      <div className="h-screen pb-5 bg-stone-100">
        <div className="flex gap-6 w-9/12 mx-auto">
        <div className="w-1/2 mx-auto mt-5 bg-blue-900 rounded-lg p-6 text-white">
          <p className=" text-4xl text-center underline mt-3 font:" style={dancingScript.style}>
            Trip to {cityName} - {countryName}
          </p>
          <p className=" text-3xl text-center mt-3" style={dancingScript.style}>Hotel - {hotelName}</p>
          <div className="flex">
            <CalendarClockIcon className=" size-8 text-white" />
            <p className=" ml-3 mt-2" style={playfairDisplay.style}>No. of Days {days}</p>
          </div>
          <div className=" mt-4" style={playfairDisplay.style}>
            <p>Partner with you:</p>
            <ul>
              {mates.map((e) =>{
                return <li>{e.title}</li>
                })}
            </ul>
          </div>
        </div>
        <div className="w-1/2 mx-auto mt-5 bg-blue-900 rounded-lg p-6 text-white">
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
            <p className="xl:text-md xl:flex justify-between w-11/12 mx-auto">
              <b className="flex">
                budget: <IndianRupeeIcon />
                {budget}
              </b>
              <b className="flex">
                Balance: <IndianRupeeIcon />
                {balance}
              </b>
            </p>
            <div className="mt-3">
              <Progress value={percent} max={parseFloat(budget)} className=" h-[5px] w-11/12 mx-auto transition-all duration-500" />
            </div>
            <div className="xl: flex gap-3 mt-8 ">
              <EditBudget
                budget={budget}
                setBudget={setBudget}
                setAmount={updateBudget}
              />
              <ExpSummary data={expense}/>
            </div>
          </div>
        </div>
        </div>
        <div className="rounded-lg h-fit w-6/12 mx-auto bg-blue-300 my-4">
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
