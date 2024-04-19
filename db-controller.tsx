"use client";
import { RegisterType, LoggedInType } from "./schema";
import { TripDetails } from "@/components/addtrip";
import { Expense, Budget, TripData } from "./schema";

export default class DbController {
  existingAccount: RegisterType[] = [];
  existingTripDetails: any = [];
  existingBudget: any = [];
  existingExpense: any = [];
  existingItineraryList: TripData[] = [];

  constructor() {
    this.existingAccount = JSON.parse(localStorage.getItem("Trav_Register")!) || [];
    this.existingTripDetails = JSON.parse(localStorage.getItem("Exist_TripDetails")!) || [];
    this.existingBudget = JSON.parse(localStorage.getItem("Trav_Budget")!) || [];
    this.existingExpense = JSON.parse(localStorage.getItem("Trav_Expense")!)||[];
    this.existingItineraryList = JSON.parse(localStorage.getItem("Itinerary_List")!) || [];
  }

  

  onRegisteration = (register: RegisterType, callBack: () => void) => {
    if (this.existingAccount) {
      const accValue = Object.values(this.existingAccount);
      for (const id of accValue) {
        if (id.email == register.email) {
          return alert("account already exist");
        }
      }
    }
    this.existingAccount.push(register);
    localStorage.setItem("Trav_Register", JSON.stringify(this.existingAccount));
    callBack(); 
  };

  onLoggIn = (login: LoggedInType, callBack: ()=>void)=>{
    const loggIn = this.existingAccount?.filter((ud:RegisterType)=>{
        return ud.email === login.email && ud.password === login.password;
    })?.length > 0;
    if(loggIn){
        localStorage.setItem("Trav_LoggIN_Key",JSON.stringify(true))
    }else{
        alert ("Invalid Credentials")
    }
    callBack();
  }

  onLogOut = ()=>{
    localStorage.setItem("Trav_LoggIN_Key",JSON.stringify(false))
  }

  onDeleteExp = (title: string, callBack: ()=>void)=>{
    let expData = JSON.parse(localStorage.getItem("Trav_Expense")!||"[]")
    this.existingExpense = expData.filter((ep:Expense)=>{
      return ep.title !== title
    })
    localStorage.setItem("Trav_Expense",JSON.stringify(this.existingExpense))
    callBack();
  }

  onDeleteItinerary = (place: string, callBack:()=>void)=>{
    let itinerary = JSON.parse(localStorage.getItem("Itinerary_List")!||"[]")
    this.existingItineraryList = itinerary.filter((i:TripData)=>{
      return i.place !== place
    })
    localStorage.setItem("Itinerary_List",JSON.stringify(this.existingItineraryList))
    callBack();
  }

  onDeleteTripData = (city: string, callBack:()=>void)=>{
    let trip = JSON.parse(localStorage.getItem("Exist_TripDetails")!||"[]")
    this.existingTripDetails = trip.filter((td:TripDetails)=>{
      return td.citiName !== city
    })
    localStorage.setItem("Exist_TripDetails",JSON.stringify(this.existingTripDetails))
    callBack();
  }
  

  getCurrentExistingBudget = ()=>{
    return this.existingBudget
  }

  getCurrentExistingExpense = ()=>{
    return this.existingExpense
  }
}
