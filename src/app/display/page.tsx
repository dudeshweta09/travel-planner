"use client";
import React, { useEffect, useState } from "react";
import { existTripDetails, TripDetails } from "@/components/addtrip";
import { existTripMates, NameList } from "@/components/modal2";
import { CalendarClockIcon } from "lucide-react";
import { DateRange } from "react-day-picker";
import { differenceInCalendarDays } from "date-fns";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Modal from "@/components/modal";

const DisplayPlanning = () => {
  const [cityName, setCityName] = useState("");
  const [countryName, setCountryName] = useState("");
  const [hotelName, setHotelName] = useState("");
  const [days, setDays] = useState(0);
  const [date, setDate] = useState<DateRange | undefined>();
  const [mates, setMates] = useState("");
  const noOfDays = [...Array(days)];
  const [modalIsOpen, setModalIsOpen] = useState(false);
  let num = 1;
  useEffect(() => {
    if (date && date.from && date.to) {
      const dayCount = differenceInCalendarDays(date.to, date.from);
      setDays(dayCount);
      for (let i = 1; i <= days; i++) {
        noOfDays.push(num++);
        console.log(noOfDays);
      }
    }
  });
  useEffect(() => {
    const details = existTripDetails?.filter((td: TripDetails) => {
      setCityName(td.citiName);
      setCountryName(td.countrieName);
      setHotelName(td.hoteLName);
      setDate(td.date);

      const tripMates = existTripMates?.filter((tm: NameList) => {
        setMates(tm.title);
      });
    });
  }, []);

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
            {modalIsOpen && (
              <Modal show={modalIsOpen} onClose={setModalIsOpen} />
            )}
            <Button
              onClick={() => {
                setModalIsOpen(true);
              }}
              className=" rounded-3xl bg-red-600 hover:bg-red-700"
            >
              Add Expenses
            </Button>
          </div>
          <div className="mt-5 bg-slate-300 text-black rounded-md p-4">
            <p className="text-md">
              <b>budget:</b>
            </p>
            <div className="flex gap-3 mt-8 ">
              <Button>Edit Budget</Button>
              <Button>View Summary</Button>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4 mx-3 mt-5">
          {noOfDays.map(
            (day, index) => (
              console.log(day),
              (
                <div key={index} className=" rounded-lg h-56 bg-blue-300 my-4">
                  <p className="text-white text-2xl text-center mt-3">
                    DAY - {index}{" "}
                  </p>
                  <Input
                    className=" w-3/4 mx-auto mt-2 xl:text-lg"
                    placeholder="Make your Itinerary"
                  />
                </div>
              )
            )
          )}
        </div>
        <div></div>
      </div>
    </>
  );
};

export default DisplayPlanning;
