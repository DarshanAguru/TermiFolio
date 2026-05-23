import React from 'react';
import { BiLogoMongodb, BiLogoPostgresql } from 'react-icons/bi';
import { FaDocker, FaNodeJs, FaPython, FaReact, FaLinux, FaGithub, FaJava } from 'react-icons/fa6';
import { GrMysql } from 'react-icons/gr';
import { RiJavascriptFill, RiNextjsLine } from 'react-icons/ri';
import { SiApachekafka, SiDjango, SiFastapi, SiSpringboot, SiTailwindcss, SiVite } from 'react-icons/si';
import { Code, Server, Cloud, DatabaseZap, Globe, ShieldCheck, Boxes, Feather, TerminalSquare, Smartphone, HelpCircle } from 'lucide-react';

/**
 * Dynamically dispatches skill icons based on named identifier strings.
 */
export const getSkillIcon = (name: string): React.ReactNode => {
  const normalized = name.toLowerCase().trim();

  switch (normalized) {
    case 'java': 
      return <FaJava className="w-5 h-5 text-red-400" />;
    case 'python': 
      return <FaPython className="w-5 h-5 text-yellow-400" />;
    case 'javascript': 
      return <RiJavascriptFill className="w-5 h-5 text-amber-300" />;
    case 'sql': 
      return <GrMysql className="w-5 h-5 text-sky-400" />;
    case 'spring boot': 
    case 'springboot':
      return <SiSpringboot className="w-5 h-5 text-emerald-500" />;
    case 'fastapi': 
      return <SiFastapi className="w-5 h-5 text-teal-400" />;
    case 'node.js': 
    case 'nodejs': 
      return <FaNodeJs className="w-5 h-5 text-green-500" />;
    case 'django': 
      return <SiDjango className="w-5 h-5 text-emerald-600" />;
    case 'rest apis': 
    case 'rest api': 
      return <Globe className="w-5 h-5 text-cyan-400" />;
    case 'microservices': 
      return <Boxes className="w-5 h-5 text-indigo-400" />;
    case 'react': 
      return <FaReact className="w-5 h-5 text-cyan-400" />;
    case 'react native': 
      return <Smartphone className="w-5 h-5 text-cyan-300" />;
    case 'next.js': 
    case 'nextjs': 
      return <RiNextjsLine className="w-5 h-5 text-slate-100" />;
    case 'vite': 
      return <SiVite className="w-5 h-5 text-purple-400" />;
    case 'tailwind css': 
    case 'tailwindcss': 
      return <SiTailwindcss className="w-5 h-5 text-sky-300" />;
    case 'postgresql': 
      return <BiLogoPostgresql className="w-5 h-5 text-blue-400" />;
    case 'mysql': 
      return <GrMysql className="w-5 h-5 text-sky-500" />;
    case 'mongodb': 
      return <BiLogoMongodb className="w-5 h-5 text-green-500" />;
    case 'kafka': 
      return <SiApachekafka className="w-5 h-5 text-amber-500" />;
    case 'aws': 
      return <Cloud className="w-5 h-5 text-amber-400" />;
    case 'docker': 
      return <FaDocker className="w-5 h-5 text-sky-500" />;
    case 'git & github': 
    case 'git': 
    case 'github': 
      return <FaGithub className="w-5 h-5 text-slate-300" />;
    case 'linux & shell': 
    case 'linux': 
    case 'shell': 
      return <FaLinux className="w-5 h-5 text-yellow-500" />;
    case 'cybersecurity': 
      return <ShieldCheck className="w-5 h-5 text-red-500" />;
    case 'system design': 
      return <Boxes className="w-5 h-5 text-purple-500" />;
    case 'agile / ci-cd': 
    case 'agile': 
    case 'ci-cd': 
    case 'cicd': 
      return <Feather className="w-5 h-5 text-cyan-400" />;
    default:
      // Fallback clean and stylish initials avatar if icon doesn't exist in dictionary
      const initials = name.slice(0, 2).toUpperCase();
      return (
        <span className="w-5 h-5 flex items-center justify-center text-[9px] font-mono font-bold text-white bg-gradient-to-tr from-cyan-600 to-indigo-600 rounded border border-zinc-700/50 flex-shrink-0">
          {initials}
        </span>
      );
  }
};

/**
 * Helper to dispatch category icons
 */
export const getCategoryIcon = (name: string): React.ReactNode => {
  const normalized = name.toLowerCase().trim();
  if (normalized.includes('language')) return <Code className="w-5 h-5 text-cyan-400" />;
  if (normalized.includes('backend')) return <Server className="w-5 h-5 text-blue-400" />;
  if (normalized.includes('frontend')) return <Smartphone className="w-5 h-5 text-teal-400" />;
  if (normalized.includes('database') || normalized.includes('queue')) return <DatabaseZap className="w-5 h-5 text-purple-400" />;
  if (normalized.includes('devops') || normalized.includes('system')) return <Cloud className="w-5 h-5 text-amber-400" />;
  return <TerminalSquare className="w-5 h-5 text-cyan-400" />;
};
