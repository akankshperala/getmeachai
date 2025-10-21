"use client";
import { useState } from "react";
import { useSearchParams } from "next/navigation";
import toast from "react-hot-toast";

export default function ResetPasswordForm() {
    const [password, setPassword] = useState("");
    const params = useSearchParams();
    console.log("reset")

    const handleReset = async (e) => {
        e.preventDefault();
        const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        const token = params.get("token");
        console.log(token,"token")
        const raw = JSON.stringify({
            "token": token,
            "password": password
        });

        const requestOptions = {
            method: "POST",
            headers: myHeaders,
            body: raw,
            redirect: "follow"
        };

        let response=await fetch("http://localhost:3000/api/reset-password", requestOptions)
            const res =await response.json()
            console.log("sdfghj")
            console.log(res,"resetfront")
            if(res.success){
                toast.success(res.message)
            }
            else{
                toast.error(res.message)
            }
            setPassword("")
    };

    return (
        <div className="w-full flex justify-center items-center min-h-screen text-black" style={{
            backgroundImage: `url("https://media.istockphoto.com/id/1456504340/photo/reset-password-concept-lock-icon-security-code-showing-on-change-password-page-while-business.jpg?s=2048x2048&w=is&k=20&c=Vq3RQi1IPnIKF8rRrDrhTkVuQmLUcZL-oEJNo4F6cWI=")`,
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center"
        }}>
            <form onSubmit={handleReset} className="flex flex-col p-20 backdrop-blur-lg">
                <h1 className="text-2xl font-bold text-white">Reset Password</h1>
                <input className="flex my-5 bg-white p-4 " value={password}
                    type="password"
                    placeholder="Enter New password"
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                <button type="submit" className="disabled:cursor-not-allowed text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2  disabled:from-slate-600 disabled:to-slate-700" disabled={!password}>Reset Password</button>
            </form>
        </div>
    );
}
