import React from 'react';
import { experienceData } from '@/data/experienceData';
import { renderLogo } from '@/app/utils/imagePlaceholder';

const PrintWorkExp = () => {
  const calDuration = (from: string, to: string) => {
    let [date, month, year] = from.split(" ");
    let parsableformatFrom = `${month} ${date}, ${year} 00:00:00 GMT`;
    let duration = Date.now() - Date.parse(new Date(parsableformatFrom).toUTCString());

    if (to !== 'Present') {
      let [todate, tomonth, toyear] = to.split(" ");
      let parsableformatTo = `${tomonth} ${todate}, ${toyear} 00:00:00 GMT`;
      duration = Date.parse(new Date(parsableformatTo).toISOString()) - Date.parse(new Date(parsableformatFrom).toISOString());
    }

    let months = Math.floor(duration / (1000 * 60 * 60 * 24 * 30)) + 1;
    if (months < 12) {
      return months === 1 ? `${months} mo` : `${months} mos`;
    }

    let years = Math.floor(months / 12);
    months = months % 12;
    return (years === 1 && months === 0)
      ? `${years} yr`
      : (years > 1 && months === 0)
        ? `${years} yrs`
        : years === 1
          ? `${years} yr ${months === 1 ? `${months} mo` : `${months} mos`}`
          : `${years} yrs ${months === 1 ? `${months} mo` : `${months} mos`}`;
  };

  const printDateInMMYYYY = (dateStr: string) => {
    if (dateStr === "Present") return dateStr;
    let [date, month, year] = dateStr.split(" ");
    return `${month} ${year}`;
  };

  return (
    <div className="flex flex-col gap-1 max-h-[50vh] overflow-y-auto" style={{ scrollbarWidth: "none" }}>
      {experienceData.length > 0 && [...experienceData].reverse().map((exp, idx) => {
        return (
          <div key={idx} className="flex flex-col gap-2">
            <div className="flex gap-4 cursor-pointer">
              {renderLogo(exp.logo, exp.org, 'circle')}
              <div className='flex flex-col gap-1 w-full'>
                <div className='text-xl font-bold text-white leading-snug'>{exp.role}</div>
                <div className="text-md text-cyan-400 font-semibold flex gap-2 items-center">
                  <span>{exp.org}</span>
                  <span className="w-1.5 h-1.5 rounded-full bg-zinc-600"></span>
                  <span className="text-sm font-normal text-slate-300">{exp.type}</span>
                </div>
                <div className="flex gap-2 items-center text-xs text-slate-400 font-mono">
                  <span>{printDateInMMYYYY(exp.from)} - {printDateInMMYYYY(exp.to)}</span>
                  <span className="w-1 h-1 rounded-full bg-zinc-700"></span>
                  <span>{calDuration(exp.from, exp.to)}</span>
                </div>
                <div className="flex gap-2 items-center text-xs text-slate-400 font-mono">
                  <span>{exp.location}</span>
                  <span className="w-1 h-1 rounded-full bg-zinc-700"></span>
                  <span>{exp.locationType}</span>
                </div>
                {exp.desc && exp.desc.length > 0 && (
                  <ul className="list-disc pl-4 mt-2 text-xs font-sans text-slate-300 space-y-1">
                    {exp.desc.map((bullet, bIdx) => (
                      <li key={bIdx} dangerouslySetInnerHTML={{ __html: bullet.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') }}></li>
                    ))}
                  </ul>
                )}
              </div>
            </div>

            {idx < experienceData.length - 1 && (
              <div className="w-16 flex justify-center py-2">
                <div className="border-l border-zinc-800 h-6"></div>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default PrintWorkExp;