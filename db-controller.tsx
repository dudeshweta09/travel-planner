"use client";
import { RegisterType, LoggedInType } from "./schema";
import { TripDetails } from "@/components/addtrip";
import { Expense, Budget } from "./schema";

export default class DbController {
  existingAccount: RegisterType[] = [];
  existingTripDetails: any = [];
  existingBudget: any = [];
  existingExpense: any = [];

  constructor() {
    this.existingAccount = JSON.parse(localStorage.getItem("Trav_Register")!) || [];
    this.existingTripDetails = JSON.parse(localStorage.getItem("Exist_TripDetails")!) || [];
    this.existingBudget = JSON.parse(localStorage.getItem("Trav_Budget")!) || [];
    this.existingExpense = JSON.parse(localStorage.getItem("Trav_Expense")!)||[];
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

  getCurrentExistingBudget = ()=>{
    return this.existingBudget
  }

  getCurrentExistingExpense = ()=>{
    return this.existingExpense
  }
}
