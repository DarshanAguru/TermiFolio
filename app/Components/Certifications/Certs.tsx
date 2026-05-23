import React from 'react';
import { certifications } from '@/data/certificationsData';
import { renderLogo } from '@/app/utils/imagePlaceholder';

const Certs = () => {
  const handleClick = (url: string) => () => {
    if (url !== "#") {
      window.open(url, "_blank");
    } else {
      console.error("No URL provided for the certificate.");
    }
  };

  return (
    <div style={{ fontFamily: '"Ubuntu Mono", monospace', background: "linear-gradient(135deg,rgba(255,255,255,0.05),rgba(0,0,0,0.95),rgba(255,255,255,0.05))" }} className='w-3/4 h-100 rounded-lg lg:ml-6 lg:mr-6 m-2 p-4 lg:mb-6 shadow-[0_0_6px_-1px_rgba(255,255,255,0.4)]'>
      <div className='flex text-5xl mb-6 font-bold text-white pl-4'>Certifications 🏆</div>
      <div className="flex flex-col gap-4 max-h-[65vh] overflow-y-auto pr-2" style={{ scrollbarWidth: "none" }}>
        {certifications.length > 0 && certifications.map((cert: any, idx: any) => {
          return (
            <div 
              key={idx} 
              onClick={handleClick(cert.link)} 
              className="bg-zinc-900/30 backdrop-blur-md border border-zinc-800/50 hover:border-cyan-500/40 p-4 rounded-xl flex gap-4 cursor-pointer hover:bg-cyan-500/5 hover:shadow-[0_0_10px_rgba(14,165,233,0.08)] duration-200 ease-out hover:scale-[1.01]"
            >
              {renderLogo(cert.logo, cert.issuer, 'rounded')}
              <div className='flex flex-col gap-1 w-full'>
                <div className='text-xl font-bold text-white leading-snug'>{cert.title}</div>
                <div className="text-md text-cyan-400 font-semibold">{cert.issuer}</div>
                <div className="text-xs text-slate-400 leading-normal mb-1 font-sans">{cert.description}</div>
                {cert.to ? (
                  <div className="text-xs text-slate-400 font-mono">
                    Validity: {cert.from} - {cert.to}
                  </div>
                ) : (
                  <div className="text-xs text-slate-400 font-mono">
                    Issued: {cert.from}
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Certs;
