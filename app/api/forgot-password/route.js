import { NextResponse } from 'next/server';
import connectDb from '@/db/connect';
import User from '@/app/models/User';
import jwt from "jsonwebtoken"

export async function POST(request) {
    let body=await request.json()
    console.log(body)
    console.log(body,body.email)
    const token =jwt.sign(
        { email: body.email },
    process.env.Next_PUBLIC_JWT_SECRET,
    )
    const resetlink=`http://localhost:3000/reset-password?token=${token}`
    console.log(resetlink)
    return NextResponse.json({message:"hihih",success:true})
}