import React from 'react';
import { Github, ExternalLink, Cpu, CheckCircle2, Terminal, Code2 } from 'lucide-react';
import { toast } from 'react-toastify';

type ProjectReadmeProps = {
  data: {
    name: string;
    file: string;
    desc: string;
    summary: string;
    challenges: string[];
    link: string;
    liveLink?: string;
    techs: string[];
  };
};

const PrintProjectReadme = ({ data }: ProjectReadmeProps) => {
  const handleLinkClick = (url: string) => {
    if (url === '#' || !url) return;
    const a = document.createElement('a');
    a.href = url;
    a.target = '_blank';
    a.click();
    a.remove();
  };

  const handleCopy = () => {
    window.navigator.clipboard.writeText(data.link);
    toast.success('Repository link copied to clipboard! 📋', {
      position: 'top-right',
      autoClose: 2000,
      theme: 'dark',
    });
  };

  // Generate deterministic pastel border/bg colors based on tech string length
  const getTechColorClass = (tech: string) => {
    const sum = tech.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
    const variants = [
      'bg-cyan-500/10 border-cyan-500/30 text-cyan-300 hover:border-cyan-400',
      'bg-indigo-500/10 border-indigo-500/30 text-indigo-300 hover:border-indigo-400',
      'bg-emerald-500/10 border-emerald-500/30 text-emerald-300 hover:border-emerald-400',
      'bg-purple-500/10 border-purple-500/30 text-purple-300 hover:border-purple-400',
      'bg-pink-500/10 border-pink-500/30 text-pink-300 hover:border-pink-400',
    ];
    return variants[sum % variants.length];
  };

  return (
    <div 
      className="w-full flex flex-col gap-6 font-sans text-slate-300 animate-fade-in max-h-[58vh] overflow-y-auto p-6 bg-zinc-950/30 border border-zinc-800/60 rounded-2xl shadow-[0_8px_32px_rgba(0,0,0,0.5)] backdrop-blur-md" 
      style={{ scrollbarWidth: 'none' }}
    >
      
      {/* Readme Header */}
      <div className="flex flex-col gap-2">
        <div className="flex items-center gap-3">
          <h1 className="text-4xl font-extrabold text-white tracking-tight font-mono">
            {data.name.split('_').join(' ')}
          </h1>
          <span className="text-[10px] px-2 py-0.5 font-mono font-bold bg-zinc-900 border border-zinc-800 text-zinc-400 rounded-md select-none uppercase tracking-wider">
            {data.file}
          </span>
        </div>
        <p className="text-sm italic text-slate-400 leading-relaxed font-sans max-w-2xl border-l-2 border-zinc-700 pl-3">
          {data.summary}
        </p>
      </div>

      <hr className="border-zinc-800 w-full" />

      {/* Architectural Deep-Dive Section */}
      <div className="flex flex-col gap-3">
        <div className="flex items-center gap-2 text-white font-mono text-lg font-bold">
          <Cpu className="w-5 h-5 text-cyan-400" />
          <span>System Architecture & About</span>
        </div>
        <div className="p-4 bg-zinc-950/40 border border-zinc-900 rounded-xl leading-relaxed text-justify text-sm text-slate-300 font-sans shadow-[inset_0_1px_1px_rgba(255,255,255,0.05)]">
          {data.desc}
        </div>
      </div>

      {/* Technologies Section */}
      <div className="flex flex-col gap-3">
        <div className="flex items-center gap-2 text-white font-mono text-lg font-bold">
          <Code2 className="w-5 h-5 text-indigo-400" />
          <span>Tech Stack</span>
        </div>
        <div className="flex flex-wrap gap-2.5">
          {data.techs.map((tech, idx) => (
            <span
              key={`${tech}-${idx}`}
              className={`text-xs px-3 py-1.5 font-mono border rounded-lg cursor-default transition-all duration-300 ${getTechColorClass(tech)}`}
            >
              {tech}
            </span>
          ))}
        </div>
      </div>

      {/* Engineering Challenges */}
      {data.challenges && data.challenges.length > 0 && (
        <div className="flex flex-col gap-3">
          <div className="flex items-center gap-2 text-white font-mono text-lg font-bold">
            <Terminal className="w-5 h-5 text-emerald-400" />
            <span>Key Engineering Challenges</span>
          </div>
          <div className="flex flex-col gap-3">
            {data.challenges.map((challenge, idx) => (
              <div
                key={idx}
                className="flex gap-3.5 p-3.5 bg-zinc-950/20 border-l-2 border-emerald-500/50 border-y border-r border-zinc-900 rounded-r-xl items-start font-sans text-sm hover:bg-zinc-950/40 transition-all duration-300"
              >
                <CheckCircle2 className="w-5 h-5 text-emerald-400/80 flex-shrink-0 mt-0.5" />
                <span className="leading-relaxed text-slate-300">{challenge}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Quick Launch & Repository Links */}
      <div className="flex flex-col gap-3">
        <div className="flex items-center gap-2 text-white font-mono text-lg font-bold">
          <ExternalLink className="w-5 h-5 text-pink-400" />
          <span>Deployment & Repository Links</span>
        </div>
        <div className="flex flex-col sm:flex-row gap-3">
          <button
            onClick={() => handleLinkClick(data.link)}
            disabled={!data.link || data.link === '#'}
            className="flex items-center justify-center gap-2 px-5 py-3 rounded-xl font-bold font-mono text-xs bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 hover:bg-emerald-500/20 hover:border-emerald-500/60 transition-all duration-300 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed flex-1"
          >
            <Github className="w-4 h-4" />
            OPEN REPOSITORY
          </button>
          
          {data.liveLink && data.liveLink !== '#' && data.liveLink !== '' && (
            <button
              onClick={() => handleLinkClick(data.liveLink!)}
              className="flex items-center justify-center gap-2 px-5 py-3 rounded-xl font-bold font-mono text-xs bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 hover:bg-cyan-500/20 hover:border-cyan-500/60 transition-all duration-300 cursor-pointer flex-1"
            >
              <ExternalLink className="w-4 h-4" />
              LAUNCH LIVE APP
            </button>
          )}
        </div>

        {/* Copy repository address panel */}
        {data.link && data.link !== '#' && (
          <div className="p-3 bg-zinc-950/50 border border-zinc-900 rounded-xl flex items-center justify-between text-xs font-mono select-none">
            <span className="text-zinc-500 select-all truncate mr-2">{data.link}</span>
            <span
              onClick={handleCopy}
              className="text-cyan-400 hover:text-cyan-300 cursor-pointer hover:underline transition-all duration-150 flex-shrink-0"
            >
              Copy Link
            </span>
          </div>
        )}
      </div>
    </div>
  );
};

export default PrintProjectReadme;