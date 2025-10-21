'use client'

import { useRef, useState, useEffect } from 'react';
import { signIn, useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';

export default function SignupLogin() {
    const { data: session } = useSession();
    const ref = useRef();
    const ref2 = useRef();
    const router = useRouter()
    const [isLogin, setIsLogin] = useState(false);

    // Controlled form states
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [username, setUsername] = useState("");
    const [profilepic, setProfilepic] = useState("");
    const [coverpic, setCoverpic] = useState("");
    const [razorpayid, setRazorpayid] = useState("");
    const [razorpaysecret, setRazorpaysecret] = useState("");

    // Pre-fill session data if available
    useEffect(() => {
        if (session?.user) {
            setEmail(session.user.email || "");
            setUsername(session.user.username || "");
            setProfilepic(session.user.profilepic || "");
        }
    }, [session]);

    const handleClick = () => {
        setIsLogin(!isLogin);
    };
    const handleforgot = async () => {
        const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        const raw = JSON.stringify({
            "email": email
        });

        const requestOptions = {
            method: "POST",
            headers: myHeaders,
            body: raw,
            redirect: "follow"
        };

        let response = await fetch("http://localhost:3000/api/forgot-password", requestOptions)
        const res = await response.json()
        console.log("forgot", res)
        if (res.success) {
            toast.success("Verification mail is sent")
        }
    }
    const handleSubmit = async (e) => {
        e.preventDefault(); // Prevent page reload
        let userData = {};
        if (isLogin) {
            userData = {
                email,
                password
            };
        }
        else {
            userData = {
                email,
                password,
                username,
                profilepic,
                coverpic,
                razorpayid,
                razorpaysecret,
            };
        }

        try {
            const res = await fetch("/api/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(userData),
            });

            const result = await res.json();
            console.log(isLogin)
            if (isLogin) {
                const rest = await signIn("credentials", {
                    redirect: false,
                    email,
                    password,
                })
                console.log(rest,"rr")
                if (rest?.ok) {
                    router.push("/dashboard");
                } else {
                    console.error("Login failed");
                }
            } else {
                if (res?.ok) {
                    router.push("/dashboard");
                }
                else {
                    console.log("signup failed")
                }
            }

            console.log(result);
        } catch (err) {
            console.error("Error submitting form:", err);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center text-white ">
            <div ref={ref2} className="w-full max-w-md p-8 bg-[#494D5F] shadow-lg rounded-lg">
                <h2 className="text-2xl font-semibold text-center mb-6">
                    {isLogin ? 'Login' : 'Sign Up'}
                </h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="block mb-1 font-medium">Email</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                            placeholder="Enter your email"
                        />
                    </div>
                    <div className="mb-6">
                        <label className="block mb-1 font-medium">Password</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                            placeholder="Enter your password"
                        />
                    </div>

                    {!isLogin && (
                        <>
                            <div className="mb-4">
                                <label className="block mb-1 font-medium">Username</label>
                                <input
                                    type="text"
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                    className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                                    placeholder="Enter your username"
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block mb-1 font-medium">Profile pic</label>
                                <input
                                    type="text"
                                    value={profilepic}
                                    onChange={(e) => setProfilepic(e.target.value)}
                                    className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                                    placeholder="Profile pic URL"
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block mb-1 font-medium">Cover pic</label>
                                <input
                                    type="text"
                                    value={coverpic}
                                    onChange={(e) => setCoverpic(e.target.value)}
                                    className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                                    placeholder="Cover pic URL"
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block mb-1 font-medium">Razorpay ID</label>
                                <input
                                    type="text"
                                    value={razorpayid}
                                    onChange={(e) => setRazorpayid(e.target.value)}
                                    className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                                    placeholder="Razorpay ID"
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block mb-1 font-medium">Razorpay Secret</label>
                                <input
                                    type="text"
                                    value={razorpaysecret}
                                    onChange={(e) => setRazorpaysecret(e.target.value)}
                                    className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                                    placeholder="Razorpay Secret"
                                />
                            </div>
                        </>
                    )}
                    <button
                        type="submit"
                        className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition"
                    >
                        {isLogin ? 'Login' : 'Register'}
                    </button>
                </form>
                <p className="mt-4 text-sm text-center text-gray-100">
                    {isLogin ? "Don't have an account?" : 'Already have an account?'}{' '}
                    <button
                        ref={ref}
                        className="text-blue-500 hover:underline"
                        onClick={handleClick}
                    >
                        {isLogin ? 'Sign up' : 'Login'}
                    </button>
                </p>
                {isLogin && <div className='flex justify-center items-center '>Forgot your password?
                    <button disabled={!email} onClick={handleforgot} className=' text-blue-600 disabled:text-gray-300 disabled:cursor-auto cursor-pointer'>click here</button>
                </div>}
            </div>
            <style>
                {`
                    .p3d {
                    transform-style: preserve-3d;
                    perspective: 1000px;
                    transform: rotateY(180deg);
                    }
                `}
            </style>

        </div>

    );
}
