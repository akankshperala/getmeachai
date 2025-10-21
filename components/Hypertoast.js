'use client'
import { toast } from 'react-hot-toast'
import Lottie from 'lottie-react'
import Confetti from 'react-confetti'
// import successAnim from '@/public/toast.json'        // Use a short celebration sound
import { useEffect, useState } from 'react'

export const fireHyperToast = () => {
  toast.custom((t) => <HyperToast t={t} />, { duration: 8000 })
}
async (params) => {
    
}
const HyperToast=async({ t }) =>{
  const [showConfetti, setShowConfetti] = useState(true)
  const successAnim = await fetch('/lottie/toast.json').then(res => res.json())

  useEffect(() => {
    const timeout = setTimeout(() => setShowConfetti(false), 3000)
    return () => clearTimeout(timeout)
  }, [])

  return (
    <div className="relative w-[340px] rounded-xl bg-white/20 backdrop-blur-md border border-white/30 p-4 shadow-lg text-white text-center font-bold animate-fadeIn">
      {showConfetti && <Confetti width={340} height={200} recycle={false} />}
      <Lottie animationData={successAnim} style={{ height: 120 }} loop={false} />
      <h1 className="text-xl mt-2">🎉 Profile Updated</h1>
      <p className="text-sm">Thanks for the chai! 🍵</p>
      <button
        onClick={() => toast.dismiss(t.id)}
        className="mt-4 px-4 py-2 bg-white text-black rounded-full hover:scale-105 transition"
      >
        Nice!
      </button>
    </div>
  )
}
