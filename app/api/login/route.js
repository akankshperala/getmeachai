import { NextResponse } from 'next/server';
import connectDb from '@/db/connect';
import User from '@/app/models/User';
import bcrypt from "bcrypt"

export async function POST(request) {
  try {
    await connectDb();
    const body = await request.json();

    const exUser = await User.findOne({email:body.email});
    console.log(exUser)
    const hashedpassword=await bcrypt.hash(body.password,10)
    let newUser;
    if (!exUser){

      newUser = await User.create({...body,password:hashedpassword});
    }
    if(exUser){
       return NextResponse.json(
      { message: 'User already exists', user: exUser },
      { status: 201 }
    );
    }

    return NextResponse.json(
      { message: 'User created successfully', user: newUser},
      { status: 201 }
    );
  } catch (error) {
    console.error("Error creating user:", error);

    return NextResponse.json(
      { message: 'Failed to create user', error: error.message},
      { status: 500 }
    );
  }
}
