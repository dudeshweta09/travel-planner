"use client";
import React, { useEffect, useState } from "react";
import { Country, State, City } from "country-state-city";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Label } from "./ui/label";
import { DatePickerWithRange } from "./datepicker";
import { PlusIcon } from "@radix-ui/react-icons";
import { Modal2 } from "./modal2";
import { existTripMates } from "./modal2";
import TrpmateDisplay from "./trpmatedisplay";
import { DateRange } from "react-day-picker";
import { useRouter } from "next/navigation";
import { differenceInCalendarDays } from "date-fns";

export interface CountryCounts {
  name: string;
  displayValue: string;
  key: string;
}

export interface TripDetails {
  id: string;
  countrieName: string;
  citiName: string;
  hoteLName: string;
  startDate: Date;
  endDate: Date;
  days: number;
  date: Date
}

export const existTripDetails =
  JSON.parse(localStorage.getItem("Exist_TripDetails")!) || [];

const AddTrip = () => {
  const router = useRouter();
  const [countryName, setCountryName] = useState("");
  const [hotelName, setHotelName] = useState("");
  const [stateName, setStateName] = useState([]);
  const [cityName, setCityName] = useState("");
  const [isTripMateClicked, setIsTripMateClicked] = useState(false);
  const [date, setDate] = useState<DateRange | undefined>();
  
  const countryList: Array<CountryCounts> = Country.getAllCountries().map(
    (cn) => ({
      name: cn.name,
      key: cn.isoCode,
      displayValue: `${cn.name} - ${cn.isoCode}`,
    })
  );

  const stateList: Array<CountryCounts> = State.getStatesOfCountry(
    countryName
  ).map((state) => ({
    name: state.name,
    displayValue: state.name,
    key: state.isoCode,
  }));

  const cityList: Array<CountryCounts> = City.getCitiesOfState(
    countryName,
    stateName.toString()
  ).map((state) => ({
    name: state.name,
    displayValue: state.name,
    key: state.stateCode,
  }));

  const onCityChange = (e: any) => {
    setCityName(e.target.value);
  };

  const onStateChange = (e: any) => {
    setStateName(e.target.value);
  };

  const onCountryChange = (e: any) => {
    setCountryName(e.target.value);
  };

  const addTripMate = () => {
    setIsTripMateClicked(true);
  };

  const onAddTrip = () => {
    const newTrip = {
      id: new Date().getTime().toString,
      countrieName: countryName,
      citiName: cityName,
      hoteLName: hotelName,
      startDate: date?.from,
      endDate: date?.to,
      date: date
    };
    if (existTripDetails == null) {
      localStorage.setItem("Exist_TripDetails", JSON.stringify([newTrip]));
    } else {
      existTripDetails.push(newTrip);
      localStorage.setItem(
        "Exist_TripDetails",
        JSON.stringify(existTripDetails)
      );
    }
    router.push("/");
  };

  return (
    <>
      <form onSubmit={onAddTrip}>
        <div className=" py-5 mt-5 xl:w-8/12 h-[80vh] mx-auto border rounded-md bg-stone-100">
          <div className=" w-1/2 mx-auto mt-4">
            <h1 className=" text-center text-3xl">Plan your trip</h1>
          </div>
          <div className="flex gap-5 mt-4 justify-center mx-auto">
            <Label className="text-lg">
              Select Country <br />
              <select
                required
                onChange={onCountryChange}
                className="max-w-44 xl:h-10 text-lg border rounded-md"
              >
                {countryList.map((name, index) => {
                  return (
                    <option key={index} value={name.key}>
                      {name.displayValue}
                    </option>
                  );
                })}
              </select>
            </Label>
            <Label className="text-lg">
              Select State
              <br />
              <select
                required
                onChange={onStateChange}
                className="h-10 border rounded-md min-w-32 max-w-44"
              >
                {stateList.map((name, index) => {
                  return (
                    <option key={index} value={name.key}>
                      {name.displayValue}
                    </option>
                  );
                })}
              </select>
            </Label>
            <Label className="text-lg">
              Select City
              <br />
              <select
                required
                onChange={onCityChange}
                className="h-10 border rounded-md min-w-32 max-w-44"
              >
                {cityList.map((name, index) => {
                  return (
                    <option key={index} value={name.displayValue}>
                      {name.displayValue}
                    </option>
                  );
                })}
              </select>
            </Label>
          </div>
          <div className="w-5/12 mt-3 mx-auto">
            <Label className="text-lg">
              Hotel Name
              <br />
              <Input
                required
                type="text"
                value={hotelName}
                onChange={(e) => setHotelName(e.target.value)}
              />
            </Label>
          </div>
          <div className="w-5/12 mt-3 mx-auto">
            <Label className="text-lg">
              {" "}
              Select Date <br />
              <DatePickerWithRange date={date} setDate={setDate} />
            </Label>
          </div>
          <div className="w-5/12 mt-3 mx-auto">
            <Label
              onClick={addTripMate}
              className="text-lg flex hover:underline hover:text-blue-400"
            >
              <PlusIcon className=" size-6" /> Add Tripmates <br />
            </Label>
            {isTripMateClicked && (
              <Modal2
                show={isTripMateClicked}
                onClose={setIsTripMateClicked}
              ></Modal2>
            )}
            <section>
              {existTripMates.map((tm: any) => {
                return <TrpmateDisplay name={tm.title} />;
              })}
            </section>
          </div>
          <div className="w-1/2 mx-auto mt-10 flex justify-center">
            <Button
              type="submit"
              className=" bg-red-500 rounded-3xl h-16 w-44 hover:bg-green-200 hover:text-black xl:text-xl"
            >
              Start Planning
            </Button>
          </div>
        </div>
      </form>
    </>
  );
};

export default AddTrip;
