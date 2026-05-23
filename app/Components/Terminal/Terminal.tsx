import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { Dispatch, SetStateAction } from 'react';
import { toast } from 'react-toastify';
import { processCommand, predictCommand } from '../../utils/processCommands';
import TerminalOutPut from './TerminalOutPut';
import { profileData } from '@/data/profileData';

type TerminalProps = {
  isOpen: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
};

type IOPS = {
  user: {
    command: string;
    path: string;
  };
  response: {
    resp: string;
    path: string;
  };
};

const Terminal = ({ isOpen, setOpen }: TerminalProps) => {
  const k = "6f1121ffbcf883f99f9c1a";
  const k2 = "317e55faf3d8c94203Db7e5af3e9A";

  const [terminalIOps, setTerminalIOps] = useState<Array<IOPS>>([]);
  const [hist, setHist] = useState<Array<string>>([]);
  const [index, setIndex] = useState<number>(0);
  const [times, setTimes] = useState<number>(0);
  const [command, setCommand] = useState<string>("");
  const [path, setPath] = useState<string>("/");

  const refDiv = useRef<HTMLDivElement>(null);
  const refDiv2 = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (refDiv.current) {
      refDiv.current.scrollIntoView({ behavior: "smooth", block: "end" });
    }

    if (refDiv2.current) {
      refDiv2.current.scrollIntoView({ behavior: "smooth", block: "end" });
    }
  }, [terminalIOps]);

  useEffect(() => {
    if (sessionStorage.getItem(k2) !== null && sessionStorage.getItem(k2) !== undefined) {
      const stored = sessionStorage.getItem(k2)!;
      try {
        if (stored !== "[]" && stored !== "") {
          const iops = JSON.parse(stored);
          setTerminalIOps(iops);
          setHist(iops.map((item: any) => item.user.command).filter((item: any) => item !== ""));
          setIndex(iops.length);
          setPath(iops[iops.length - 1].response.path);
        }
      } catch (e) {
        console.error("Session restore failed", e);
      }
    }
  }, []);

  const fetchCommands = useCallback((resp: any) => {
    setPath(resp.response.path);
    
    setTerminalIOps((prev) => {
      let nextOps = [...prev, resp];
      if (nextOps.length >= 15) {
        nextOps = nextOps.slice(-15);
      }
      
      if (resp.response.resp === "CLEAR") {
        nextOps = [resp];
        setHist([]);
      }
      
      sessionStorage.setItem(k2, JSON.stringify(nextOps));
      return nextOps;
    });
  }, []);

  const handleClick = useCallback(() => {
    setOpen((prev) => !prev);
    if (sessionStorage.getItem(k)) {
      if (sessionStorage.getItem(k) === "true") {
        sessionStorage.setItem(k, "false");
      } else {
        sessionStorage.setItem(k, "true");
      }
    }
  }, [setOpen]);

  const saveCommand = useCallback(async () => {
    const resp = processCommand(command, path);
    fetchCommands(resp);

    setHist((prev) => ((command !== "") ? [...prev, command] : [...prev]));

    if (command.toLowerCase() === "exit") {
      handleClick();
    }

    if (command.toLowerCase().startsWith("download ")) {
      const fileArg = command.split(" ")[1];
      if (fileArg === profileData.resumeFilename && path === "/") {
        const ele = document.createElement("a");
        ele.href = profileData.resumeUrl;
        ele.download = profileData.resumeFilename;
        ele.click();
        ele.remove();
      }
    }

    setCommand("");
  }, [command, path, fetchCommands, handleClick]);

  const handleKeyPress = useCallback((e: any) => {
    if (e.key === "Enter") {
      saveCommand();
      setTimes(0);
    } else if (e.key === "ArrowUp") {
      if (hist && hist.length > 0) {
        setCommand(hist[index] || "");
        if (index > -1) {
          setIndex(index - 1);
        }
        if (index === -1) {
          setIndex(0);
          setCommand(hist[0] || "");
        }
      }
    } else if (e.key === "ArrowDown") {
      if (hist && hist.length > 0) {
        setCommand(hist[index] || "");
        if (index < hist.length) {
          setIndex(index + 1);
        }
        if (index === hist.length) {
          setIndex(hist.length);
          setCommand("");
        }
      }
    } else if (e.key === "Tab") {
      toast.info("Ahhhh! so we have an Engineer here!😁...Anyhow please use ''Esc'' instead of ''Tab'' for same functionality😎.", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        theme: "dark"
      });
    } else if (e.key === "Escape") {
      setCommand(predictCommand(command, path, times));
      setTimes(times + 1);
    }
  }, [hist, index, command, times, path, saveCommand]);

  const memoizedOutput = useMemo(() => (
    terminalIOps.map((op, idx) => <TerminalOutPut key={idx} data={op} />)
  ), [terminalIOps]);

  const systemUser = `${profileData.username}@portfolio`;

  return (
    <div>
      {isOpen && (
        <div>
          {/* sm and md */}
          <div className='block lg:hidden'>
            <div className='fixed z-40 backdrop-blur-sm backdrop-brightness-50 top-0 left-0 w-full h-full'></div>
            <div onClick={(e) => { e.preventDefault(); e.stopPropagation(); }} className="z-40 fixed mt-6 backdrop-brightness-0 -translate-x-1/2 -translate-y-1/2 left-1/2 top-1/2 shadow-[0_0_6px_-1px_rgba(255,255,255,1)] duration-300 w-11/12 h-3/4 bg-bgTerm/80 rounded-lg mx-auto ">
              <div className="p-2 flex justify-between bg-navCol items-center rounded-t-lg">
                <div className="flex ">
                  <div onClick={(e) => { handleClick() }} className="flex w-3 h-3 bg-red-500 rounded-full cursor-pointer"></div>
                </div>
                <div className="text-sm px-2 text-gray-500">{systemUser}</div>
              </div>
              <div style={{ scrollbarWidth: "none" }} className='p-4 scroll-smooth rounded-b-lg text-xs w-100 mt-2 h-5/6 overflow-y-auto overflow-x-hidden'>
                {terminalIOps.length > 0 && memoizedOutput}
                <div ref={refDiv2} className='flex lg:flex-row flex-col text-xs'>
                  <div><span style={{ color: "#49de80" }} >{systemUser}</span>:</div>
                  <div className='flex lg:flex-row flex-col'>
                    <span style={{ color: "#60a5fa" }}>{path}</span>
                    <div className='flex'>$<div className='px-2 w-full'><input id="ipBoxMobile" style={{ background: "transparent ", border: "none", color: "white", outline: "none", boxShadow: "none", fontFamily: '"Ubuntu Mono", monospace' }} className='w-full' type="text" value={command || ""} onChange={(e) => { setCommand(e.target.value) }} onKeyDown={handleKeyPress} placeholder={`${(terminalIOps && terminalIOps.length > 0) ? "" : 'Enter your command here... (Please enter "help" for help) '}`} /></div></div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* lg */}
          <div className='hidden lg:block'>
            <div className='fixed z-40 backdrop-blur-sm backdrop-brightness-50 top-0 left-0 w-full h-full'></div>
            <div onClick={(e) => { e.preventDefault(); e.stopPropagation(); }} className="z-40 absolute backdrop-brightness-50 mt-6 -translate-x-1/2 -translate-y-1/2 left-1/2 top-1/2 shadow-[0_0_6px_-1px_rgba(255,255,255,1)] duration-300 w-5/6 h-3/4 bg-bgTerm/80 rounded-lg mx-auto ">
              <div className="p-2 flex justify-between bg-navCol items-center rounded-t-lg">
                <div className="flex space-x-2">
                  <div onClick={(e) => { handleClick() }} className="hover:border-2 hover:border-red-800 hover:border-collapse ease-out hover:ease-in duration-75 hover:cursor-pointer w-3 h-3 bg-red-500 rounded-full"></div>
                  <div onClick={(e) => toast.info("Click on 'red' bubble or enter 'exit' in terminal to close the terminal", { position: "top-right", autoClose: 2000, hideProgressBar: false, closeOnClick: true, pauseOnHover: true, draggable: true, theme: "dark" })} className="hover:border-2 hover:border-yellow-700 hover:ease-in ease-out hover:border-collapse hover:cursor-pointer w-3 h-3 bg-yellow-500 rounded-full duration-75"></div>
                  <div onClick={(e) => toast.info("Click on 'red' bubble or enter 'exit' in terminal to close the terminal", { position: "top-right", autoClose: 2000, hideProgressBar: false, closeOnClick: true, pauseOnHover: true, draggable: true, theme: "dark" })} className="hover:border-2 hover:border-green-700 hover:ease-in ease-out hover:border-collapse hover:cursor-pointer w-3 h-3 bg-green-500 rounded-full duration-75"></div>
                </div>
                <div className="px-2 text-gray-500">{systemUser}</div>
              </div>
              <div style={{ scrollbarWidth: "none" }} className='p-4 scroll-smooth rounded-b-lg w-100 mt-2 h-5/6 overflow-y-auto overflow-x-hidden'>
                {terminalIOps.length > 0 && memoizedOutput}
                <div ref={refDiv} className='flex'>
                  <span style={{ color: "#49de80" }} >{systemUser}</span>:<span style={{ color: "#60a5fa" }}>{path}</span>$<div className='px-2 w-full'><input id="ipBox" style={{ background: "transparent ", border: "none", color: "white", outline: "none", boxShadow: "none", fontFamily: '"Ubuntu Mono", monospace' }} className='w-full' type="text" value={command || ""} onChange={(e) => { setCommand(e.target.value) }} onKeyDown={handleKeyPress} placeholder={`${(terminalIOps && terminalIOps.length > 0) ? "" : 'Enter your command here... (Please enter "help" for help)'}`} /></div>
                </div>
              </div>
            </div>
          </div>

        </div>
      )}
    </div>
  );
};

export default Terminal;