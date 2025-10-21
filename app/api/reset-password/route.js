import { NextResponse } from 'next/server';
import connectDb from '@/db/connect';
import User from '@/app/models/User';
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"

export async function POST(request) {
    let body=await request.json()
    console.log(body,"body")
    const {token,password}=body
    const decoded = jwt.verify(token, process.env.NEXT_PUBLIC_JWT_SECRET);
    const hashedpassword=await bcrypt.hash(password,10)
    let email=decoded.email
    await connectDb()
    const updatedUser = await User.findOneAndUpdate(
      { email },
      { password: hashedpassword },
      { new: true } // return updated doc (optional)
    );
    console.log(updatedUser,email,decoded,password,token)
    if (updatedUser) {
        console.log("success")
    return NextResponse.json({message:"password Reseted Successfully",success:true})}
    else{
        console.log("errorrr")
        return NextResponse.json({message:"some error occured",success:false})
    }
}
