import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <>
    <div className="flex justify-center items-center flex-col gap-4 text-white h-[44vh] ">
      <div className="font-bold text-5xl flex gap-2 justify-center items-center">Buy Me a Chai <span><img width={88} src="/tea.gif" alt="" /></span></div>
      <p>A Crowdfunding platform for creators. Get funded by your fans and followers. Start now!</p>
      <div>
        <Link href={"/login"}>
        <button type="button" className="text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">Start Here</button>
        </Link>
        <Link href={"/about"}>
        <button type="button" className="text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">Read More</button>
        </Link>

      </div>
    </div>
      <div className="bg-white h-1 opacity-10"></div>
      <div className="text-white container mx-auto py-32 pt-14">
        <h1 className="font-bold text-center text-3xl mb-14">Your Fans can buy you a Chai</h1>
        <div className="flex justify-around gap-5">
          <div className="item space-y-3 flex flex-col items-center justify-center">
            <img className=" bg-slate-400 rounded-full p-2 text-black" width={88} src="/man.gif" alt="" />
            <p className="font-bold">Fans want to help</p>
            <p className=" text-center"> Your fans are available for you to help you</p>
          </div>
          <div className="item space-y-3 flex flex-col items-center justify-center">
            <img className=" bg-slate-400 rounded-full p-2 text-black" width={88} src="/coin.gif" alt="" />
            <p className="font-bold">Fans want to help</p>
            <p className=" text-center"> Your fans are available for you to help you</p>
          </div>
          <div className="item space-y-3 flex flex-col items-center justify-center">
            <img className=" bg-slate-400 rounded-full p-2 text-black" width={88} src="/group.gif" alt="" />
            <p className="font-bold">Fans want to help</p>
            <p className=" text-center"> Your fans are available for you to help you</p>
          </div>
        </div>
      </div>
      
      <div className="bg-white h-1 opacity-10"></div>
      <div className="text-white container mx-auto py-32 pt-14 flex flex-col items-center justify-center">
        <h1 className="font-bold text-center text-3xl mb-14">Lear more about us</h1>
        <iframe width="560" height="315" src="https://www.youtube.com/embed/nuVv0ZWUfs4?si=6fLdp0BsWqoi_sTz" title="YouTube video player" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen></iframe>
      </div>
    </>
  );

}
