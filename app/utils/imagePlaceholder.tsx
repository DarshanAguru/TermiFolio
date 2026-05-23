import React from 'react';
import { Layout } from 'lucide-react';

/**
 * Universal logo renderer with dynamic HSL gradient avatar fallbacks.
 */
export const renderLogo = (
  logo: string | undefined, 
  orgName: string, 
  shape: 'rounded' | 'circle' = 'rounded'
): React.ReactNode => {
  if (logo && logo !== "" && logo !== "/") {
    if (shape === 'circle') {
      return (
        <div 
          className='w-16 h-16 mt-1 rounded-full flex-shrink-0 shadow-md hover:scale-105 duration-150 ease-out border border-zinc-800' 
          style={{ 
            background: `url('${logo}')`, 
            backgroundSize: "cover", 
            backgroundPosition: "center",
            backgroundColor: "rgba(255,255,255,1)"
          }}
        ></div>
      );
    }
    return (
      <div 
        className='w-16 h-16 mt-1 rounded-lg flex-shrink-0 shadow-md hover:scale-105 duration-150 ease-out border border-zinc-800' 
        style={{ 
          background: `url('${logo}')`, 
          backgroundColor: "rgba(255,255,255,1)", 
          backgroundSize: "contain",
          backgroundRepeat: "no-repeat", 
          backgroundPosition: "center" 
        }}
      ></div>
    );
  }

  // Generate dynamic initials
  const initials = orgName 
    ? orgName.split(" ").map(n => n[0]).join("").slice(0, 2).toUpperCase() 
    : "?";

  const shapeClass = shape === 'circle' ? 'rounded-full' : 'rounded-lg';

  return (
    <div className={`w-16 h-16 mt-1 flex-shrink-0 flex items-center justify-center font-sans font-bold text-white text-xl bg-gradient-to-tr from-cyan-600 to-indigo-600 border border-zinc-700/50 shadow-md hover:scale-105 duration-150 ease-out ${shapeClass}`}>
      {initials}
    </div>
  );
};

/**
 * Renders a project image or an elegant, glowing generic terminal mock placeholder.
 */
export const renderProjectImage = (image: string | undefined, title: string): React.ReactNode => {
  if (image && image !== "" && image !== "/") {
    return (
      <img 
        src={image} 
        alt={title} 
        className="w-full h-48 object-cover rounded-xl border border-zinc-800/80 group-hover:scale-[1.02] duration-300 ease-out shadow-lg"
      />
    );
  }

  return (
    <div className="w-full h-48 rounded-xl border border-zinc-800/80 bg-zinc-950/40 flex flex-col items-center justify-center p-4 text-center group-hover:scale-[1.02] duration-300 ease-out shadow-lg relative overflow-hidden group">
      <div className="absolute inset-0 bg-gradient-to-tr from-cyan-500/5 to-indigo-500/5 opacity-0 group-hover:opacity-100 duration-500"></div>
      <Layout className="w-10 h-10 text-cyan-400/80 mb-3 group-hover:animate-bounce" />
      <div className="font-mono text-sm text-slate-300 font-bold mb-1">{title} Dashboard</div>
      <div className="text-xs text-slate-500 font-sans px-4">Placeholder interface mock. Upload your screenshot in `/public/githubProjImgs/` to display.</div>
    </div>
  );
};
