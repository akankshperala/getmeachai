"use server"
import Razorpay from "razorpay"
import Payment from "../models/Payment"
import connectDb from "@/db/connect"
import User from "../models/User"

export const initiate = async (amount, to_username, paymentform) => {
    await connectDb()
    let userf=await User.findOne({username:to_username})
    var instance = new Razorpay({ key_id:userf.razorpayid, key_secret: userf.razorpaysecret })

    let options ={
        amount:Number.parseInt(amount),
        currency:"INR"
    }
    let x= await instance.orders.create(options)
    await Payment.create({oid:x.id,amount:amount,to_user:to_username,name:paymentform.name,message:paymentform.message})
    return x
}

// success
// {
//     "id": "order_IluGWxBm9U8zJ8",
//     "entity": "order",
//     "amount": 5000,
//     "amount_paid": 0,
//     "amount_due": 5000,
//     "currency": "INR",
//     "receipt": "rcptid_11",
//     "offer_id": null,
//     "status": "created",
//     "attempts": 0,
//     "notes": [],
//     "created_at": 1642662092
// }


export const fetchuser = async (username) => {
  await connectDb();
  const user = await User.findOne({ username }).lean();

  if (!user) return null;

  return {
    ...user,
    _id: user._id.toString(),
    createdAt: user.createdAt?.toISOString(),
    updatedAt: user.updatedAt?.toISOString(),
  };
};

export const fetchpayments = async (username) => {
  await connectDb();
  const payments = await Payment.find({ to_user: username,done:true })
    .sort({ amount: -1 })
    .limit(10)
    .lean();

  return payments.map((p) => ({
    ...p,
    _id: p._id.toString(),
    createdAt: p.createdAt?.toISOString(),
    updatedAt: p.updatedAt?.toISOString(),
  }));
};

export const updateProfile = async (data, oldusername) => {
    await connectDb()
    let ndata = Object.fromEntries(data)
    if (oldusername !== ndata.username) {
        let u = await User.findOne({ username: ndata.username })
        if (u) {
            return { error: "Username already exists" }
        }   
        await User.updateOne({email: ndata.email}, ndata)
        await Payment.updateMany({to_user: oldusername}, {to_user: ndata.username})
        
    }
    else{
        await User.updateOne({email: ndata.email}, ndata)
    }


}