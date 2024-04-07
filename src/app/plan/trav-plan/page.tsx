'use client'
import { PlusIcon } from "@radix-ui/react-icons";
import EmblaCarousel from "@/components/carouselplug";
import { EmblaOptionsType } from "embla-carousel";
import { Button } from "@/components/ui/button";
import Header from "@/components/header";
import { useRouter } from "next/navigation";

const OPTIONS: EmblaOptionsType = {};
const SLIDE_COUNT = 10;
const SLIDES = Array.from(Array(SLIDE_COUNT).keys());

const TravelPlan = () => {
  const router = useRouter();
  return (
    <div className=" h-screen">
      <Header/>
            <main className="bg-stone-100 h-screen">
        <EmblaCarousel slides={SLIDES} options={OPTIONS} />
        <div className=" w-9/12 mx-auto flex justify-end">
          <Button
          onClick={()=>router.push("/plan/create")}
          className=" text-xl bg-green-500 text-black mt-6">
            <PlusIcon className=" size-7" />  Plan a new trip
          </Button>
        </div>
        <div className="w-9/12 mx-auto mt-9">
          <p className=" py-16 text-3xl">You don't plan any trip yet, Plan your trip now</p>
        </div>
      </main>
    </div>
  );
};

export default TravelPlan;
