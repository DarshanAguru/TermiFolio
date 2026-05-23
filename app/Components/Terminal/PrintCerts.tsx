import React from 'react';
import { certifications } from '@/data/certificationsData';
import { renderLogo } from '@/app/utils/imagePlaceholder';

const PrintCerts = () => {
  const handleClick = (url: string) => () => {
    if (url !== "#") {
      window.open(url, "_blank");
    } else {
      console.error("No URL provided for the certificate.");
    }
  };

  return (
    <div className="flex flex-col gap-4 max-h-[50vh] overflow-y-auto" style={{ scrollbarWidth: "none" }}>
      {certifications.length > 0 && certifications.map((cert, idx) => {
        return (
          <div key={idx}>
            <div onClick={handleClick(cert.link)} className="flex gap-4 cursor-pointer hover:bg-zinc-950/20 p-2 rounded-lg transition-colors">
              {renderLogo(cert.logo, cert.issuer, 'rounded')}
              <div className='flex flex-col gap-1 w-full'>
                <div className='text-lg font-bold text-white leading-snug'>{cert.title}</div>
                <div className="text-sm text-cyan-400 font-semibold">{cert.issuer}</div>
                <div className="text-xs text-slate-400 font-mono">
                  {cert.to ? `Validity: ${cert.from} - ${cert.to}` : `Issued: ${cert.from}`}
                </div>
                <div className="text-xs text-slate-300 mt-1 leading-normal font-sans">{cert.description}</div>
              </div>
            </div>
            {idx < certifications.length - 1 && <hr className="border-zinc-900 mt-2" />}
          </div>
        );
      })}
    </div>
  );
};

export default PrintCerts;