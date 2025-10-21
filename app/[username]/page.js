import PaymentPage from "@/components/PaymentPage";
import { notFound } from "next/navigation";
import User from "../models/User";
import connectDb from "@/db/connect";

import { getServerSession } from "next-auth";
import { authoptions } from "../api/auth/[...nextauth]/route";


export default async function Username({ params }) {
    const { username } = await params;
    connectDb()
    let userf=await User.findOne({username:username})
    if (!userf){
        console.log("yig")
        return notFound()
    }
    const session = await getServerSession(authoptions);
if (!session) {
    return notFound(); // or redirect('/')
}
    return (
        <>
           <PaymentPage username={username}/>
        </> 
    );
}

