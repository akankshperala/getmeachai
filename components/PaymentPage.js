"use client"
import React, { useEffect, useRef, useState } from 'react'
import Script from 'next/script'
import { fetchpayments, fetchuser, initiate } from '@/app/actions/useractions'
import { useSession } from 'next-auth/react'


const PaymentPage = ({ username }) => {
    const { data: session } = useSession()
    const ref=useRef()
    const [paymentform, setPaymentform] = useState({
        name: '',
        amount: '',
        // email: '',
        message: ''
    })
    const [currentuser, setCurrentuser] = useState({})
    const [Payments, setPayments] = useState([])
    const [mounted, setMounted] = useState(false)
    useEffect(() => {
    getData()
    setMounted(true)
    }, [])


    const getData=async (params) => {
        let u =await fetchuser(username)
        setCurrentuser(u)
        let dbpayments =await fetchpayments(username)
        setPayments(dbpayments)
    }
    
    const handlechange = (e) => {
        setPaymentform({ ...paymentform, [e.target.name]: e.target.value })
    }
    const pay = async (amount) => {
        let a = await initiate(amount, username, paymentform)
        let orderId = a.id
        var options = {
            "key": currentuser.razorpayid, // Enter the Key ID generated from the Dashboard
            "amount": amount, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
            "currency": "INR",
            "name": "Get Me a Chai", //your business name
            "description": "Test Transaction",
            "image": "https://example.com/your_logo",
            "order_id": orderId, //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
            "callback_url": "http://localhost:3000/api/razorpay",
            "prefill": { //We recommend using the prefill parameter to auto-fill customer's contact information especially their phone number
                "name": "Gaurav Kumar", //your customer's name
                "email": "gaurav.kumar@example.com",
                "contact": "9000090000" //Provide the customer's phone number for better conversion rates 
            },
            "notes": {
                "address": "Razorpay Corporate Office"
            },
            "theme": {
                "color": "#3399cc"
            }
        }
        var rzp1 = new Razorpay(options);
        rzp1.open();
    }
    if (!mounted) return null // ⛔ Prevents SSR mismatch
    return (
        <>
            <Script src="https://checkout.razorpay.com/v1/checkout.js"></Script>

            <div className='cover text-white w-full bg-red-50 relative'>
                <img className="object-cover w-full h-[350]" src={currentuser.coverpic} alt="" />
                <div className=" w-full bg-transparent  absolute -bottom-15 flex justify-center items-center">
                    <div className="border-2 border-black rounded-full">
                        <img width={130} height={130} className="rounded-full" src={currentuser.profilepic} alt="" />
                    </div>
                </div>
            </div>
            <div className="info flex flex-col justify-center items-center gap-2 mt-18">
                <div className="font-bold text-lg">@{username}</div>
                <div className="text-gray-400 text-center">
                    Creating Animated art for VTT's
                </div>
                <div className="text-gray-400 text-center">
                    {Payments.length} Payments . {currentuser.username} has raised ₹{Payments.reduce((a,b)=>a+b.amount/100,0)}
                </div>
                <div className="payment flex gap-3 w-[80%] mt-11">
                    <div className="supporters w-1/2 bg-slate-900  rounded-lg text-white p-10">
                        <h2 className="text-2xl font-bold my-5">Top 10 Supporters</h2>
                        <ul className="mx-4 text-lg">
                            {Payments.map((p,i)=>{
                                return <li key={i} className="my-4 flex gap-2  items-center">
                                <img width={33} src="/avatar.gif" alt="" />
                                <span>
                                    {p.name} donated <span className="font-bold">₹{p.amount/100}</span> with a message "{p.message}"
                                </span>
                            </li>
                            })}
                        </ul>
                    </div>
                    <div className="makePayment w-1/2  bg-slate-900 rounded-lg text-white p-10">
                        <h2 className="text-2xl font-bold my-5">Make a Payment</h2>
                        <div className="flex gap-2 flex-col">
                            <input name='name' onChange={(e) => { handlechange(e) }} value={paymentform.name} type="text" className="w-full p-3 rounded-lg bg-slate-800" placeholder="Enter Name" />
                            <input name='message' onChange={(e) => { handlechange(e) }} value={paymentform.message} type="text" className="w-full p-3 rounded-lg bg-slate-800" placeholder="Enter Message" />
                            <input name='amount' ref={ref} onChange={(e) => { handlechange(e) }} value={paymentform.amount} type="text" className="w-full p-3 rounded-lg bg-slate-800" placeholder="Enter Amount" />
                            <button type="button" className="disabled:cursor-not-allowed text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2  disabled:from-slate-600 disabled:to-slate-700" disabled={!paymentform.name || paymentform.name.length < 3 || !paymentform.amount || !paymentform.message}
                            onClick={() => { pay(parseFloat(ref.current.value)*100) }}>Pay</button>

                        </div>
                        <div className="flex mt-5 gap-2">
                            <button className="cursor-pointer bg-slate-800 p-3 rounded-lg disabled:cursor-not-allowed " disabled={!paymentform.name || paymentform.name.length < 3 || !paymentform.message} onClick={() => { pay(1000) }}>Pay ₹10</button>
                            <button className="cursor-pointer bg-slate-800 p-3 rounded-lg disabled:cursor-not-allowed " disabled={!paymentform.name || paymentform.name.length < 3 || !paymentform.message} onClick={() => { pay(2000) }}>Pay ₹20</button>
                            <button className="cursor-pointer bg-slate-800 p-3 rounded-lg disabled:cursor-not-allowed  " disabled={!paymentform.name || paymentform.name.length < 3 || !paymentform.message} onClick={() => { pay(3000) }}>Pay ₹30</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default PaymentPage
