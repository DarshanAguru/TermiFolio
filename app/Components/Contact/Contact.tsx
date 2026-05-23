'use client';
import React from 'react';
import { Github, Instagram, Linkedin, Link2 } from 'lucide-react';
import { profileData } from '@/data/profileData';

const getSocialIcon = (name: string) => {
  switch (name.toLowerCase()) {
    case 'github': return <Github className="w-5 h-5" />;
    case 'linkedin': return <Linkedin className="w-5 h-5" />;
    case 'instagram': return <Instagram className="w-5 h-5" />;
    default: return <Link2 className="w-5 h-5" />;
  }
};

const Contact = () => {
  const handleEmailClick = () => {
    window.navigator.clipboard.writeText(profileData.email);
    alert("Email copied to clipboard! 😊");
  };

  return (
    <div style={{ fontFamily: '"Ubuntu Mono", monospace', background: "linear-gradient(135deg,rgba(255,255,255,0.05),rgba(0,0,0,0.95),rgba(255,255,255,0.05))" }} className='h-100 lg:w-1/2 w-full rounded-lg lg:p-4 m-2 shadow-[0_0_6px_-1px_rgba(255,255,255,0.4)]'>
      
      {/* sm and md */}
      <div style={{ fontFamily: '"Ubuntu Mono", monospace' }} className='lg:hidden gap-6 bg-white/0 backdrop-blur-lg p-6 flex flex-col w-full h-100 rounded-md'>
        <div className='flex text-5xl font-bold text-white'>Contact Me 📬</div>
        <div className='flex flex-col space-y-6 text-md text-gray-200'>
          
          <div className='flex flex-col space-y-1'>
            <span className='text-lg font-bold text-cyan-400'>Location 📍</span>
            <hr className='border-zinc-800' />
            {profileData.locationLink ? (
              <a href={profileData.locationLink} target="_blank" className="hover:text-cyan-400 transition-colors">
                {profileData.location}
              </a>
            ) : (
              <span>{profileData.location}</span>
            )}
          </div>

          <div className='flex flex-col space-y-1'>
            <span className='text-lg font-bold text-cyan-400'>Email 📧</span>
            <hr className='border-zinc-800' />
            <span onClick={handleEmailClick} className='cursor-pointer underline underline-offset-4 hover:text-cyan-400 transition-colors font-mono'>
              {profileData.email}
            </span>
          </div>

          <div className='flex flex-col space-y-1'>
            <span className='text-lg font-bold text-cyan-400'>Social Profiles 🔗</span>
            <hr className='border-zinc-800' />
            <div className="flex flex-col space-y-2">
              {profileData.socials.map((social, idx) => (
                <div key={idx}>
                  <a href={social.url} target="_blank" className='flex items-center space-x-2 text-slate-300 hover:text-cyan-400 transition-all hover:translate-x-1 duration-150'>
                    {getSocialIcon(social.name)}
                    <span className="underline underline-offset-4 font-semibold">{social.name}</span>
                  </a>
                </div>
              ))}
            </div>
          </div>

          <div className='pt-4'>
            <a 
              href={profileData.resumeUrl} 
              download={profileData.resumeFilename}
              className='block text-center p-3 hover:ease-in ease-out duration-150 hover:tracking-widest bg-zinc-950/60 hover:bg-cyan-500/20 hover:border-cyan-500/50 hover:shadow-[0_0_12px_rgba(14,165,233,0.2)] rounded-lg border border-zinc-800 text-white font-bold transition-all'
            >
              Download Resume
            </a>
          </div>

        </div>
      </div>

      {/* lg */}
      <div style={{ fontFamily: '"Ubuntu Mono", monospace' }} className='lg:flex hidden bg-white/0 backdrop-blur-lg flex-col align-middle w-100 h-100 pb-4 pt-4 pl-10 pr-10 rounded-md'>
        <div className='flex text-5xl mb-6 font-bold text-white'>Contact Me 📬</div>
        <div className='flex flex-col space-y-6 text-lg text-gray-200'>
          
          <div className='flex flex-col space-y-1'>
            <span className='text-xl font-bold text-cyan-400 hover:cursor-default'>Location 📍</span>
            <hr className='border-zinc-800' />
            {profileData.locationLink ? (
              <a href={profileData.locationLink} target="_blank" className="hover:text-cyan-400 transition-colors duration-150 inline-block w-fit">
                {profileData.location}
              </a>
            ) : (
              <span>{profileData.location}</span>
            )}
          </div>

          <div className='flex flex-col space-y-1'>
            <span className='text-xl font-bold text-cyan-400 hover:cursor-default'>Email 📧</span>
            <hr className='border-zinc-800' />
            <span onClick={handleEmailClick} className='cursor-pointer underline underline-offset-4 hover:text-cyan-400 transition-colors duration-150 font-mono w-fit block'>
              {profileData.email}
            </span>
          </div>

          <div className='flex flex-col space-y-2'>
            <span className='text-xl font-bold text-cyan-400 hover:cursor-default'>Social Profiles 🔗</span>
            <hr className='border-zinc-800' />
            <div className="flex flex-col space-y-3 pt-1">
              {profileData.socials.map((social, idx) => (
                <div key={idx}>
                  <a href={social.url} target="_blank" className='flex items-center space-x-2 text-slate-300 hover:text-cyan-400 transition-all hover:translate-x-1 duration-150 w-fit'>
                    {getSocialIcon(social.name)}
                    <span className="underline underline-offset-4 font-semibold">{social.name}</span>
                  </a>
                </div>
              ))}
            </div>
          </div>

          <div className='pt-6'>
            <a 
              href={profileData.resumeUrl} 
              download={profileData.resumeFilename}
              className='block text-center p-3 hover:ease-in ease-out duration-150 hover:tracking-widest bg-zinc-950/60 hover:bg-cyan-500/20 hover:border-cyan-500/50 hover:shadow-[0_0_12px_rgba(14,165,233,0.2)] rounded-lg border border-zinc-800 text-white font-bold transition-all'
            >
              Download Resume
            </a>
          </div>

        </div>
      </div>

    </div>
  );
};

export default Contact;
