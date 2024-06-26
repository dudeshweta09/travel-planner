"use client";
import { PlusIcon } from "@radix-ui/react-icons";
import EmblaCarousel from "@/components/carouselplug";
import { EmblaOptionsType } from "embla-carousel";
import { Button } from "@/components/ui/button";
import { Country } from "country-state-city";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Modal from "./modal";
import AddTrip from "./addtrip";
import { CountryCounts } from "./addtrip";
import { Label } from "@radix-ui/react-label";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import DbController from "../../db-controller";
import Map2 from "./reactmap";
import SearchForm from "./searchbox";
import "mapbox-gl/dist/mapbox-gl.css";

interface ILocationProps{
  places:"",
  longitude: number,
  latitude: number,
}

const TravelPlan = () => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [countryName, setCountryName] = useState("");
  const [holidayList, setHolidayList] = useState([]);
  const [location, setLocation] = useState<ILocationProps>({
        places:"",
        longitude:0,
        latitude:0,
    })
  const values = Object.values(holidayList);
  const router = useRouter();
  const dbController = new DbController();

  const OPTIONS: EmblaOptionsType = {};
  const SLIDE_COUNT = dbController.existingTripDetails.length;
  const SLIDES = Array.from(Array(SLIDE_COUNT).keys());

  // const handleFormSubmit=(event:any)=>{
  //   if(location.places){
  //     console.log(location);
  //   }
  // }
  // const updateCoordinates = (latitude: any,longitude: any) =>{
  //   setLocation({...location, latitude, longitude})
  // }
  useEffect(() => {
    fetch(`https://date.nager.at/api/v3/publicholidays/2024/${countryName}`,{
      next:{
        revalidate: 0
      }
    })
      .then((response) => {
        if(response.status===200){
          return response.json();
        }else{
          return [];
        }
      })
      .then((data: any) => {
        setHolidayList(data);
      });
  },[countryName,holidayList]);

  const countryList: Array<CountryCounts> = Country.getAllCountries().map(
    (cn) => ({
      name: cn.name,
      key: cn.isoCode,
      displayValue: `${cn.name} - ${cn.isoCode}`,
    })
  );

  const onCountryChange = (e: any) => {
    setCountryName(e.target.value);
  };

  return (
    <div className=" h-full bg-stone-100">
      <main className="bg-stone-100 h-fit">
        <EmblaCarousel slides={SLIDES} options={OPTIONS} />
        <div className=" w-9/12 mx-auto flex justify-end">
          {modalIsOpen && (
            <Modal show={modalIsOpen} onClose={setModalIsOpen}>
              <AddTrip />
            </Modal>
          )}
          <Button
            onClick={() => setModalIsOpen(true)}
            className=" text-xl bg-green-500 text-black mt-6"
          >
            <PlusIcon className=" size-7" /> Plan a new trip
          </Button>
        </div>
        <div>
          <div className="w-1/2 mx-auto">
            <Label className="text-lg ml-16 font-bold font-mono">
              Plan your holidays as per the public holidayList...
              <br />
              <select
                required
                onChange={onCountryChange}
                className="max-w-44 xl:h-10 text-lg border rounded-md ml-16"
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
          </div>
          <div className="w-1/2 mx-auto">
            <Table>
              <TableCaption>Public Holidays List</TableCaption>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[100px]">Date</TableHead>
                  <TableHead>Name</TableHead>
                  <TableHead>Local Name</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {values.length > 0 &&
                  values.map((m: any) => (
                    <TableRow>
                      <TableCell>{m.date}</TableCell>
                      <TableCell>{m.name}</TableCell>
                      <TableCell>{m.localName}</TableCell>
                    </TableRow>
                  ))}
                  {values.length === 0 && (
                    <TableRow>
                      
                    </TableRow>
                  )}
              </TableBody>
            </Table>
          </div>
        </div>
      </main>
      <div className="flex pt-5 pb-5">
        <Map2 />
      </div>
    </div>
  );
};

export default TravelPlan;
