import{ useRef,  Dispatch, SetStateAction } from 'react'
import { Menu } from "lucide-react"
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import { profileData } from '@/data/profileData'


type NavBarProps = {
    setClicked: Dispatch<SetStateAction<boolean>>;
    active: string;
    clicked: boolean;
    setActive: Dispatch<SetStateAction<string>>;
}

const NavBar = ({setClicked, active,clicked, setActive}: NavBarProps)=> {
    gsap.registerPlugin(useGSAP);

    const container = useRef<HTMLDivElement>(null);
    const { contextSafe } = useGSAP({ scope: container });

    const onClickMenuBtn = contextSafe(()=>{        
        let anim = gsap.timeline(
            {

                repeat: 0,
                defaults: { duration: 0.8, ease: "powerIn" }
        }
        );
        
        anim.fromTo('#animateDiv', {opacity:0, height:0} , {opacity:1,height:"auto"})
        .fromTo('#lOne' , {opacity:0, y:-20}, {opacity:1, y:0}, "<")
        .fromTo('#lTwo' , {opacity:0, y:-60}, {opacity:1, y:0}, "<")
        .fromTo('#lThree' , {opacity:0, y:-100}, {opacity:1, y:0}, "<")
       
        
        if(clicked === true)
        {
            anim.play();
        }
        setClicked(prev=>!prev);
    });

  return (
    <div ref={container}  className='w-100 h-100'>
    <nav className=" fixed w-full h-100 flex z-50 navBig lg:flex sm:hidden md:hidden ease-out hover:ease-in duration-150 shadow-[0_0_4px_-1px_rgba(255,255,255,1)] hover:shadow-[0_0_8px_-1px_rgba(255,255,255,0.6)] bg-navCol hover:cursor-default justify-between px-16 py-6 items-center">
    <h1 style={{fontFamily: '"Ubuntu Mono", monospace'}} className="text-xl text-slate-100 font-semibold hover:cursor-pointer hover:tracking-widest hover:ease-in ease-out  duration-150">{profileData.title}</h1>
      <div className="flex items-center">
        <ul className="flex items-center space-x-6">
          <li  onClick={(e)=>{setActive('Home')}}  className={`   rounded-md shadow-white backdrop-blur-md   p-1 px-2   hover:cursor-pointer ${(active=='Home')?'shadow-[0_3px_4px_-2px_rgba(255,255,255,0.8)] font-bold text-black scale-125  bg-white ':' hover:shadow-[0_3px_4px_-2px_rgba(255,255,255,0.2)] font-semibold text-slate-100  hover:ease-in ease-out hover:scale-125  duration-75'}`}>Home</li>
          <li  onClick={(e)=>{setActive('Skills')}}  className={`   rounded-md shadow-white backdrop-blur-md   p-1 px-2   hover:cursor-pointer ${(active=='Skills')?'shadow-[0_3px_4px_-2px_rgba(255,255,255,0.8)] font-bold text-black scale-125  bg-white ':' hover:shadow-[0_3px_4px_-2px_rgba(255,255,255,0.2)] font-semibold text-slate-100  hover:ease-in ease-out hover:scale-125  duration-75'}`}>Skills</li>
          <li  onClick={(e)=>{setActive('Certifications')}}  className={`   rounded-md shadow-white backdrop-blur-md   p-1 px-2   hover:cursor-pointer ${(active=='Certifications')?'shadow-[0_3px_4px_-2px_rgba(255,255,255,0.8)] font-bold text-black scale-125  bg-white ':' hover:shadow-[0_3px_4px_-2px_rgba(255,255,255,0.2)] font-semibold text-slate-100  hover:ease-in ease-out hover:scale-125  duration-75'}`}>Certifications</li>
          <li onClick={(e)=>{setActive('About')}}  className={` rounded-md shadow-white backdrop-blur-md   p-1 px-2  hover:cursor-pointer ${(active=='About')?'shadow-[0_3px_4px_-2px_rgba(255,255,255,0.8)] font-bold text-black scale-125  bg-white':'hover:shadow-[0_3px_4px_-2px_rgba(255,255,255,0.2)] font-semibold text-slate-100   hover:ease-in ease-out hover:scale-125  duration-75'} `}>About</li>
          <li onClick={(e)=>{setActive('Contact')}}  className={` rounded-md shadow-white backdrop-blur-md   p-1 px-2 hover:cursor-pointer  ${(active=='Contact')?'shadow-[0_3px_4px_-2px_rgba(255,255,255,0.8)] font-bold text-black scale-125  bg-white':'hover:shadow-[0_3px_4px_-2px_rgba(255,255,255,0.2)] font-semibold text-slate-100   hover:ease-in ease-out hover:scale-125  duration-75'} `}>Contact</li>
        </ul>
      </div>
    </nav >
    <div  className="navSmall z-50 sm:flex md:flex lg:hidden ease-out hover:ease-in duration-150 shadow-[0_0_4px_-1px_rgba(255,255,255,1)] hover:shadow-[0_0_8px_-1px_rgba(255,255,255,0.6)] bg-navCol hover:cursor-default justify-between px-5 py-6 items-center w-screen">
      <h1 style={{fontFamily: '"Ubuntu Mono", monospace'}} className="text-xl text-slate-100 font-semibold hover:cursor-pointer hover:tracking-widest hover:ease-in ease-out  duration-150">{profileData.title}</h1>
      <div className='w-100 h-100'>
      <Menu className={` w-100 h-100 cursor-pointer rounded-md scale-125 px-1 py-1 ${clicked?"shadow-[0_3px_4px_-2px_rgba(255,255,255,0.8)]":"font-bold hover:shadow-[0_3px_4px_-2px_rgba(255,255,255,0.2)]"}`} onClick={(e)=>{e.preventDefault(); onClickMenuBtn()}}/>
      </div>
    </div>
      
      <div id="animateDiv" className={` ${(clicked)?"":"hidden"} z-50 flex flex-col w-100 bg-navCol  w-100 shadow-[0_2px_4px_-2px_rgba(255,255,255,0.6)] `}>
        <ul  className="flex flex-col py-1 z-50 w-100">
          <li      onClick={(e)=>{setActive('Home')}} id="lOne" className={`z-50 ${(clicked)?"":"hidden"} text-center  text-lg py-2  hover:cursor-pointer ${(active=='Home')?'shadow-[0_0_8px_-4px_rgba(255,255,255,1)] font-bold text-black text-xl bg-white':'hover:shadow-[0_0_6px_-4px_rgba(255,255,255,1)] font-semibold text-slate-100  hover:ease-in ease-out hover:text-xl   duration-75'}`}>Home</li>
          {/* <li      onClick={(e)=>{setActive('Skills')}} id="lOne" className={`z-50 ${(clicked)?"":"hidden"} text-center  text-lg py-2  hover:cursor-pointer ${(active=='Skills')?'shadow-[0_0_8px_-4px_rgba(255,255,255,1)] font-bold text-black text-xl bg-white':'hover:shadow-[0_0_6px_-4px_rgba(255,255,255,1)] font-semibold text-slate-100  hover:ease-in ease-out hover:text-xl   duration-75'}`}>Skills</li>
          <li      onClick={(e)=>{setActive('Certifications')}} id="lOne" className={`z-50 ${(clicked)?"":"hidden"} text-center  text-lg py-2  hover:cursor-pointer ${(active=='Certifications')?'shadow-[0_0_8px_-4px_rgba(255,255,255,1)] font-bold text-black text-xl bg-white':'hover:shadow-[0_0_6px_-4px_rgba(255,255,255,1)] font-semibold text-slate-100  hover:ease-in ease-out hover:text-xl   duration-75'}`}>Certifications</li> */}
          <li     onClick={(e)=>{setActive('About')}}  id="lThree" className={`z-50 ${(clicked)?"":"hidden"}  text-center py-2 text-lg hover:cursor-pointer ${(active=='About')?'font-bold text-black  shadow-[0_0_8px_-4px_rgba(255,255,255,1)] text-xl bg-white':'hover:shadow-[0_0_6px_-4px_rgba(255,255,255,1)] font-semibold text-slate-100   hover:ease-in ease-out hover:text-xl duration-75 '} `}>About</li>
          <li       onClick={(e)=>{setActive('Contact')}} id="lTwo" className={`z-50 ${(clicked)?"":"hidden"} text-center   text-lg py-2 hover:cursor-pointer  ${(active=='Contact')?'font-bold shadow-[0_0_8px_-4px_rgba(255,255,255,1)] text-black  text-xl bg-white':'hover:shadow-[0_0_6px_-4px_rgba(255,255,255,1)] font-semibold text-slate-100   hover:ease-in ease-out hover:text-xl duration-75'} `}>Contact</li>
        </ul> 
      </div>
    
      </div>
  )
}

export default NavBar