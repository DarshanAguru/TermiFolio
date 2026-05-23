import React from 'react';
import { skillCategories } from '@/data/skillsData';
import { getSkillIcon, getCategoryIcon } from '@/app/utils/iconDispatcher';

const Skills = () => {
  const handleSkillClick = (url: string) => {
    if (url === "#") return;
    const a = document.createElement('a');
    a.href = url;
    a.target = '_blank';
    a.click();
    a.remove();
  };

  return (
    <div style={{ fontFamily: '"Ubuntu Mono", monospace', background: "linear-gradient(135deg,rgba(255,255,255,0.05),rgba(0,0,0,0.95),rgba(255,255,255,0.05))" }} className='w-11/12 h-100 rounded-lg lg:ml-6 lg:mr-6 m-2 p-4 lg:mb-6 shadow-[0_0_6px_-1px_rgba(255,255,255,0.4)]'>
      <div className='flex text-5xl mb-6 font-bold text-white pl-4'>Skills 💡</div>
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-4 max-h-[65vh] overflow-y-auto' style={{ scrollbarWidth: "none" }}>
        {skillCategories.map((cat, idx) => (
          <div key={idx} className='bg-zinc-950/40 backdrop-blur-xl border border-zinc-800/60 rounded-xl p-5 hover:border-cyan-500/50 hover:shadow-[0_0_15px_rgba(14,165,233,0.15)] transition-all duration-300 group flex flex-col justify-between'>
            <div>
              <div className='flex items-center gap-3 mb-2'>
                <div className='text-cyan-400 group-hover:scale-110 transition-transform duration-300 flex items-center justify-center'>
                  {getCategoryIcon(cat.name)}
                </div>
                <h3 className='text-lg font-bold text-white group-hover:text-cyan-400 transition-colors'>{cat.name}</h3>
              </div>
              <p className='text-xs text-slate-400 mb-4 font-sans leading-relaxed'>{cat.description}</p>
            </div>
            <div className='grid grid-cols-2 gap-3 mt-2'>
              {cat.skills.map((skill, sIdx) => (
                <div key={sIdx} onClick={() => handleSkillClick(skill.url)} className='flex items-center gap-2 p-2 bg-zinc-900/50 border border-zinc-800/40 hover:border-cyan-500/30 rounded-lg cursor-pointer hover:bg-cyan-500/10 hover:scale-[1.03] transition-all duration-200'>
                  <div className='text-xl text-slate-300 flex items-center justify-center flex-shrink-0'>
                    {getSkillIcon(skill.name)}
                  </div>
                  <span className='text-xs font-semibold text-slate-200 tracking-tight truncate'>{skill.name}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Skills;