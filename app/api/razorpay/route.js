import { NextResponse } from "next/server";
import { validatePaymentVerification } from "razorpay/dist/utils/razorpay-utils";
import Payment from "@/app/models/Payment";
import Razorpay from "razorpay";
import connectDb from "@/db/connect";
import User from "@/app/models/User";
import toast from "react-hot-toast";
// import { useSession } from "next-auth/react";

//VERIFYING PAYMENT
export const POST=async(req)=>{
    // const {data:session}=useSession()
    await connectDb()
    let body =await req.formData()
    body=Object.fromEntries(body)
    console.log(body)
//   OUTPUT  {
//   razorpay_order_id: "order_xyz123",
//   razorpay_payment_id: "pay_abc456",
//   razorpay_signature: "sig_def789"
// }
    let p =await Payment.findOne({oid:body.razorpay_order_id})
    if (!p){
        return  NextResponse.json({success:false,message:"Order Id not found"})
    }
    let userf=await User.findOne({username:p.to_user})
    let xx=validatePaymentVerification({"order_id":body.razorpay_order_id,"payment_id":body.razorpay_payment_id},body.razorpay_signature,userf.razorpaysecret)
    if(xx){
        const updatedPayment=await Payment.findOneAndUpdate({oid:body.razorpay_order_id},{done:true},{new:true})
        return NextResponse.redirect(`http://localhost:3000/${updatedPayment.to_user}?paymentdone=true`)
    }
    else{
        return NextResponse.json({success:false,message:"Payment Verification failed"})
    }
}