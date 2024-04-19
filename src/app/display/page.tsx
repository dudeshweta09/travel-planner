"use client";
import React, { useEffect, useState } from "react";
import { TripDetails } from "@/components/addtrip";
import { CalendarClockIcon, CircleArrowOutUpLeftIcon } from "lucide-react";
import { DateRange } from "react-day-picker";
import { differenceInCalendarDays } from "date-fns";
import EditBudget from "@/components/editbudget";
import AddExpense from "@/components/addexpense";
import { TripData } from "../../../schema";
import { NameList } from "@/components/modal2";
import Header from "@/components/header";
import DbController from "../../../db-controller";
import { useRouter } from "next/navigation";
import { Expense, Budget } from "../../../schema";
import ExpSummary from "@/components/exp-summary";
import { Progress } from "@/components/ui/progress";
import { dancingScript, playfairDisplay } from "../../../utils/fonts";
import AddItinerary from "@/components/addItinerary";
import DisplayItinerary from "@/components/display-itinerary";
import { format } from "date-fns";

export const rupee = new Intl.NumberFormat("en-IN", {
  style: "currency",
  currency: "INR",
});

const DisplayPlanning = () => {
  const dbController = new DbController();
  const [days, setDays] = useState(0);
  const [date, setDate] = useState<DateRange | undefined>();
  const noOfDays = [...Array(days)];
  const [budget, setBudget] = useState(0);
  const [category, setCategory] = useState("flight");
  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState(0);
  const [balance, setBalance] = useState(0);
  const [totalExpense, setTotalExpense] = useState(0);
  const [percent, setPercent] = useState(0);
  const router = useRouter();
  const expense: Array<Expense> = dbController.getCurrentExistingExpense();
  const [dates, setDates] = useState(Date);
  const [place, setPlace] = useState("");
  const [time, setTime] = useState("");
  const [tableValue, setTableValue] = useState([]);

  const onAddItinerary = () => {
    if (dates === "" && place === "" && time === "") {
      alert("empty");
      return;
    }
    const newTable: TripData = {
      id: Math.floor(Math.random() * 10000),
      date: dates,
      place: place,
      time: time,
    };
    if (dbController.existingItineraryList == null) {
      localStorage.setItem("Itinerary_List", JSON.stringify([newTable]));
    } else {
      dbController.existingItineraryList.push(...tableValue, newTable);
      localStorage.setItem(
        "Itinerary_List",
        JSON.stringify(dbController.existingItineraryList)
      );
    }
    setPlace("");
    setTime("");
    router.push("/display");
  };

  useEffect(() => {
    const currentExpense = dbController.getCurrentExistingExpense();
    const totalExpense = currentExpense.reduce((prev: any, next: any) => {
      return prev + parseFloat(next.amount);
    }, 0);
    const totalIncome = budget;
    const balance = totalIncome - totalExpense;
    const totalPercent = (totalExpense * 100) / totalIncome;
    setBalance(balance);
    setTotalExpense(totalExpense);
    setPercent(totalPercent);
  }, [
    setBalance,
    dbController.existingExpense,
    dbController.existingBudget,
    balance,
  ]);

  useEffect(() => {
    if (date && date.from && date.to) {
      const dayCount = differenceInCalendarDays(date.to, date.from);
      setDays(dayCount);
    }
  }, [date]);
  useEffect(() => {
    const currentBudget = dbController.getCurrentExistingBudget();
    const getBudgetAmount = currentBudget?.filter((bg: Budget) => {
      setBudget(bg.amount);
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
      localStorage.setItem(
        "Trav_Budget",
        JSON.stringify(dbController.existingBudget)
      );
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
      localStorage.setItem(
        "Trav_Expense",
        JSON.stringify(dbController.existingExpense)
      );
      setAmount(0), setTitle(""), router.refresh();
    }
  };

  return (
    <>
      <Header />
      <div className="h-full pb-5 bg-stone-100">
        <div className="grid grid-cols-3 gap-4 pt-5 w-9/12 mx-auto">
          {dbController.existingTripDetails.map((td: TripDetails) => (
            <div className=" bg-blue-900 rounded-lg p-6 text-white">
              <CircleArrowOutUpLeftIcon
              onClick={()=>{
                dbController.onDeleteTripData(td.citiName,()=>{
                  router.refresh();
                })
              }}
              />
              <p
                className=" text-4xl text-center underline mt-3 font:"
                style={dancingScript.style}
              >
                Trip to {td.citiName} - {td.countrieName}
              </p>
              <p
                className=" text-3xl text-center mt-3"
                style={dancingScript.style}
              >
                Hotel - {td.hoteLName}
              </p>
              <div className="flex justify-between mt-3">
            <p className="flex"> <CalendarClockIcon className=" size-8 text-white mr-3" />
              Start from:- {format(td.startDate, "PPP")}
              </p>
              <p className="flex"> <CalendarClockIcon className=" size-8 text-white mr-3" />
              Ends On:- {format(td.endDate, "PPP")}
              </p>
              </div>
              <div className=" mt-4" style={playfairDisplay.style}>
                <p>Partner with you:</p>
                <ul>
                  {td.title.map((e) => {
                    return <li>{e.title}</li>;
                  })}
                </ul>
              </div>
            </div>
          ))}
        </div>
          <div>
        <div className="mt-5 max-h-72 w-10/12 mx-auto bg-blue-900 rounded-lg p-6 text-white">
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
                budget:
                {rupee.format(budget)}
              </b>
              <b className="flex">
                Balance:
                {rupee.format(balance)}
              </b>
            </p>
            <div className="mt-3">
              <Progress
                value={percent}
                max={budget}
                className=" h-[5px] w-11/12 mx-auto transition-all duration-500"
              />
            </div>
            <div className="xl: flex gap-3 mt-8 ">
              <EditBudget
                budget={budget}
                setBudget={setBudget}
                setAmount={updateBudget}
              />
              <ExpSummary data={expense} />
            </div>
          </div>
        </div>
        <div className="rounded-lg h-fit w-10/12 mx-auto bg-blue-300 mt-3">
          <h1 className="text-4xl underline italic font-mono text-center pt-3">
            Itinerary List
          </h1>
          <div className="mt-3 mb-3">
            <AddItinerary
              dates={dates}
              setDates={setDates}
              place={place}
              setPlace={setPlace}
              time={time}
              setTime={setTime}
              onAddItinerary={onAddItinerary}
            />
          </div>
          <DisplayItinerary />
        </div>
        </div>
      </div>
    </>
  );
};

export default DisplayPlanning;
