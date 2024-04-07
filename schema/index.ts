import * as z from 'zod';

export const AddPlanSchema = z.object({
    selectcountry: z.string().min(1,{
        message: "select your country"
    }),
    selectstate: z.string().min(1,{
        message: "select your state"
    }),
    selectcity: z.string().min(1,{
        message: "select your city"
    }),
    hotelname: z.string().min(1,{
        message: "Enter your hotel's name"
    }),
    date: z.string().datetime()
})