import React, { useCallback, useEffect, useRef, useState, lazy, Suspense } from 'react';
import GraphemeSplitter from 'grapheme-splitter';
import { PacmanLoader } from 'react-spinners';
import { profileData } from '@/data/profileData';

const Typewriter = lazy(() => import('typewriter-effect'));
const Tilty = lazy(() => import('react-tilty'));
const Terminal = lazy(() => import('../Terminal/Terminal'));

/* eslint-disable */
const HomeMain = () => {
  const [clicked, setClicked] = useState(false);
  const [typeText, setTypeText] = useState(["cd home", "cd about", "cd contact"]);

  const k = "6f1121ffbcf883f99f9c1a";

  useEffect(() => {
    if (sessionStorage.getItem(k)) {
      if (sessionStorage.getItem(k) === "true") {
        setClicked(true);
      }
    } else {
      sessionStorage.setItem(k, "false");
    }
  }, []);

  const debounce = (cb: any, delay: number) => {
    const timeoutRef = useRef<NodeJS.Timeout | null>(null);

    const debouncedFunction = (...args: any[]) => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
      timeoutRef.current = setTimeout(() => {
        cb(...args);
      }, delay);
    };

    return useCallback(debouncedFunction, [cb, delay]);
  };

  const handleClick = useCallback(debounce(() => {
    setClicked((prev) => !prev);
    sessionStorage.setItem(k, !clicked ? "true" : "false");
  }, 40), [clicked]);

  const systemUser = `${profileData.username}@portfolio`;
  
  // Format dynamic typewriter strings from roles list
  const typewriterRoles = profileData.roles.map(role => `<strong>${role} 🚀</strong>`);

  return (
    <div style={{ fontFamily: '"Ubuntu Mono", monospace', background: "linear-gradient(135deg,rgba(255,255,255,0.05),rgba(0,0,0,0.95),rgba(255,255,255,0.05))" }} className='lg:p-4 lg:m-4 m-2 rounded-lg shadow-[0_0_6px_-2px_rgba(255,255,255,0.4)]'>
      
      {/* sm and md */}
      <div style={{ fontFamily: '"Ubuntu Mono", monospace' }} className="flex flex-col lg:hidden bg-white/0 backdrop-blur-lg align-middle justify-between w-100 h-100 p-1 m-1 rounded-md">
        <div className="flex-col p-2 w-full">
          <div className='flex p-1 h-full items-center'>
            <div style={{ fontFamily: '"Ubuntu Mono", monospace' }} className='text-4xl p-1'>
              <div style={{ fontFamily: '"Ubuntu Mono", monospace' }} className='mb-4 text-white'>I'm a</div>
              {clicked ? (
                <div className="text-cyan-400 font-bold">Developer 😎</div>
              ) : (
                <Suspense fallback={<span className="text-white">...</span>}>
                  <Typewriter 
                    options={{
                      strings: typewriterRoles,
                      autoStart: true,
                      loop: true,
                      delay: 50,
                      cursor: '|',
                      deleteSpeed: 'natural',
                      // @ts-ignore 
                      stringSplitter: (text) => {
                        const splitter = new GraphemeSplitter();
                        return splitter.splitGraphemes(text);
                      }
                    }}
                  />
                </Suspense>
              )}
            </div>
          </div>
          <div style={{ fontFamily: '"Ubuntu Mono", monospace' }} className='flex justify-start p-1 mt-1 mb-1 h-100'>
            <div className='p-2 flex text-justify text-slate-300 leading-relaxed'>
              {profileData.aboutParagraphs[0]}
            </div>
          </div>
        </div>
        <div className="flex p-2 mb-2 h-60 w-full justify-center items-center hover:cursor-pointer">
          <div 
            style={{ background: "rgba(27, 27, 27, 0.8)" }} 
            onMouseEnter={() => setTypeText(["click to open terminal...😊"])} 
            onMouseLeave={() => setTypeText(["cd home", "cd about", "cd contact"])} 
            onClick={handleClick}  
            className="bg-bgTerm/80 hover:shadow-[0_0_10px_-2px_rgba(255,255,255,0.8)] duration-300 w-full h-full rounded-lg mx-auto shadow-[0_0_4px_-2px_rgba(255,255,255,1)]"
          >
            <div style={{ background: "#27272a" }} className="p-2 flex justify-between backdrop-blur-md items-center rounded-t-lg">
              <div className="flex">
                <div className="w-3 h-3 bg-red-500 rounded-full"></div>
              </div>
              <div className="px-2 text-gray-500">{systemUser}</div>
            </div>
            <div className='p-4 rounded-b-lg'>
              <div style={{ scrollbarWidth: "none" }} className='overflow-x-auto flex text-xs'>
                <span style={{ color: "#49de80" }} >{systemUser}</span>:<span style={{ color: "#60a5fa" }}>~</span>$
                <div className='px-2'>
                  {clicked === false ? (
                    <Suspense fallback={<span className="text-white">...</span>}>
                      <Typewriter 
                        options={{ 
                          deleteSpeed: 'natural',  
                          autoStart: true,
                          loop: true, 
                          cursor: '|', 
                          strings: typeText,
                          delay: 50, 
                          // @ts-ignore
                          stringSplitter: (text: string): string[] => {
                            const splitter = new GraphemeSplitter();
                            return splitter.splitGraphemes(text);
                          }
                        }}
                      />
                    </Suspense>
                  ) : (
                    <span className="text-cyan-300">Terminal is open...</span>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* lg */}
      <div style={{ fontFamily: '"Ubuntu Mono", monospace' }} className='lg:flex hidden bg-white/0 backdrop-blur-lg align-middle justify-between w-100 h-100 p-20 m-2 rounded-md'>
        <div className="flex-col w-1/2">
          <div className='flex p-2 h-100 items-center'>
            <div style={{ fontFamily: '"Ubuntu Mono", monospace' }} className='text-5xl mt-2 mb-2 p-4'>
              <div style={{ fontFamily: '"Ubuntu Mono", monospace' }} className='mb-4 text-white'>I'm a</div>
              {clicked ? (
                <div className="text-cyan-400 font-bold">Developer 😎</div>
              ) : (
                <Suspense fallback={<span className="text-white">...</span>}>
                  <Typewriter 
                    options={{
                      strings: typewriterRoles,
                      autoStart: true,
                      loop: true,
                      delay: 50,
                      cursor: '|',
                      deleteSpeed: 'natural', 
                      // @ts-ignore
                      stringSplitter: (text: string): string[] => {
                        const splitter = new GraphemeSplitter();
                        return splitter.splitGraphemes(text);
                      }
                    }}
                  />
                </Suspense>
              )}
            </div>
          </div>
          <div style={{ fontFamily: '"Ubuntu Mono", monospace' }} className='flex justify-start p-2 mt-2 mb-2 h-100'>
            <div className='p-2 flex text-justify text-slate-300 text-lg leading-relaxed'>
              {profileData.aboutParagraphs[0]}
            </div>
          </div>
        </div>
        <div className="flex p-4 w-1/2 justify-center items-center hover:cursor-pointer">
          <Suspense fallback={<div className="w-full h-full fixed top-0 left-0 flex justify-center items-center align-middle backdrop-blur-2xl backdrop-brightness-50"><PacmanLoader color="#09dfea" /></div>}>
            <Tilty className='w-full h-full' max={8}>
              <div 
                style={{ background: "rgba(27, 27, 27, 0.8)" }} 
                onMouseEnter={() => setTypeText(["click to open terminal...😊"])} 
                onMouseLeave={() => setTypeText(["cd home", "cd about", "cd contact"])} 
                onClick={handleClick}  
                className="bg-bgTerm/80 hover:shadow-[0_0_10px_-2px_rgba(255,255,255,0.8)] duration-300 w-full h-full rounded-lg mx-auto shadow-[0_0_4px_-2px_rgba(255,255,255,1)]"
              >
                <div style={{ background: "#27272a" }} className="p-2 flex justify-between backdrop-blur-md items-center rounded-t-lg">
                  <div className="flex space-x-2">
                    <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                    <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  </div>
                  <div className="px-2 text-gray-500">{systemUser}</div>
                </div>
                <div className='p-4 rounded-b-lg'>
                  <div style={{ scrollbarWidth: "none" }} className='overflow-x-auto flex text-sm'>
                    <span style={{ color: "#49de80" }} >{systemUser}</span>:<span style={{ color: "#60a5fa" }}>~</span>$
                    <div className='px-2'>
                      {clicked === false ? (
                        <Suspense fallback={<span className="text-white">...</span>}>
                          <Typewriter 
                            options={{ 
                              deleteSpeed: 'natural',  
                              autoStart: true,
                              loop: true, 
                              cursor: '|', 
                              strings: typeText, 
                              delay: 50,
                              // @ts-ignore
                              stringSplitter: (text) => {
                                const splitter = new GraphemeSplitter();
                                return splitter.splitGraphemes(text);
                              }
                            }}
                          />
                        </Suspense>
                      ) : (
                        <span className="text-cyan-300">Terminal is open...</span>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </Tilty>
          </Suspense>
        </div>
      </div>
      <Suspense fallback={<div className="w-full h-full fixed top-0 left-0 flex justify-center items-center align-middle backdrop-blur-2xl backdrop-brightness-50"><PacmanLoader color="#09dfea" /></div>}>
        <Terminal isOpen={clicked} setOpen={setClicked} />
      </Suspense>
    </div>
  );
};

export default HomeMain;