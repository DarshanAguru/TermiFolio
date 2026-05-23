'use client';
import { useEffect, useState, Suspense } from "react";
import About from "./Components/About/About";
import HomeMain from "./Components/HomeMain/HomeMain";
import NavBar from "./Components/Navbar/NavBar";
import Contact from "./Components/Contact/Contact";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { SpeedInsights } from "@vercel/speed-insights/next"
import { Analytics } from "@vercel/analytics/react"
import { PacmanLoader } from "react-spinners";
import Skills from "./Components/Skills/Skills";
import { Loader } from "lucide-react";
import Certs from "./Components/Certifications/Certs";



export default function Home() {
  const [active, setActive] = useState("Home");
  const [clicked, setClicked] = useState(false);
  const [width, setWidth] = useState(typeof window !== "undefined" ? window.innerWidth : 400);
  

  useEffect(() => {

    
    const handleResize = () => {
      setWidth(window.innerWidth);
    };

    console.log(window.innerWidth);
     if(sessionStorage.getItem("yv8AD9Rpq@11vt46")== null)
     {

        sessionStorage.setItem("yv8AD9Rpq@11vt46", "true");
        if(width <= 600)
          {
            toast.info("Please use a larger screen (laptop, desktop, etc.) for the best experience!😉", {
              position: "top-right",
              autoClose: 6000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              theme: "dark",
              })
          }
          else{
          toast.info("You can click on the Terminal to open it and explore...", {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            theme: "dark",
            })
          }

      }
     
      
          
      

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
   
  }


  , []);

  

  
  return (
  <main style={{fontFamily: '"Ubuntu Mono", monospace'}}> 
    <Analytics/> 
    <SpeedInsights/>
    <ToastContainer/>  
    <div className="smart lg:hidden sm:hidden md:hidden"><h1 className="text-lg font-bold text-white p-2 m-2">{"I don't think there's a screen of this size.... 😉"}</h1></div>
    {(width > 300) && <div  style={{scrollbarWidth:"none"}}  className="flex flex-col overflow-x-hidden overflow-y-auto w-screen h-screen">
      <div className="w-100 h-1/6 z-50 flex">
      <NavBar clicked={clicked} setActive={setActive} setClicked={setClicked} active={active}/>
      </div>
      <div className={`w-100 lg:h-5/6 h-fit flex align-middle ${(active=='Contact')?"items-center":"items-start"} justify-center `}>
    {(active === 'Home') && <Suspense fallback={ <div className="w-full h-full fixed top-0 left-0 flex justify-center items-center align-middle backdrop-blur-2xl backdrop-brightness-50" ><PacmanLoader  color="#09dfea" /></div>}><HomeMain  /></Suspense>}
    {(active === 'Skills') && <Suspense fallback={ <div className="w-full h-full fixed top-0 left-0 flex justify-center items-center align-middle backdrop-blur-2xl backdrop-brightness-50" ><PacmanLoader  color="#09dfea" /></div>}><Skills  /></Suspense>}
    {(active === 'Certifications') && <Suspense fallback={ <div className="w-full h-full fixed top-0 left-0 flex justify-center items-center align-middle backdrop-blur-2xl backdrop-brightness-50" ><PacmanLoader  color="#09dfea" /></div>}><Certs  /></Suspense>}
    {(active=='Contact') && <Suspense fallback={ <div className="w-full h-full fixed top-0 left-0 flex justify-center items-center align-middle backdrop-blur-2xl backdrop-brightness-50"><PacmanLoader  color="#09dfea" /></div>}><Contact /></Suspense>}
    {(active=='About') && <Suspense fallback={ <div className="w-full h-full fixed top-0 left-0 flex justify-center items-center align-middle backdrop-blur-2xl backdrop-brightness-50"><PacmanLoader  color="#09dfea" /></div>}><About /></Suspense>}
    </div>
    </div>}
  </main>

    
  );
}
