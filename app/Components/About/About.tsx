import React from 'react';
import { profileData } from '@/data/profileData';

const About = () => {
  return (
    <div style={{ fontFamily: '"Ubuntu Mono", monospace', background: "linear-gradient(135deg,rgba(255,255,255,0.1),rgba(0,0,0,0.8),rgba(255,255,255,0.1))" }} className='h-100 rounded-lg lg:ml-6 lg:mr-6 m-2 lg:mb-6 lg:p-2 lg:-mt-2 shadow-[0_0_6px_-1px_rgba(255,255,255,0.4)]'>
      
      {/* sm and md */}
      <div style={{ fontFamily: '"Ubuntu Mono", monospace' }} className='lg:hidden gap-4 bg-white/0 backdrop-blur-lg flex flex-col align-middle w-full h-100 p-4 rounded-md'>
        <div className='flex text-5xl font-bold text-white'>About Me 🤔</div>
        <div className='flex flex-col space-y-4 text-sm text-gray-200'>
          {profileData.aboutParagraphs.map((para, idx) => (
            <span key={idx} className='font-semibold tracking-tight text-justify leading-relaxed'>
              {para}
            </span>
          ))}
        </div>
      </div>

      {/* lg */}
      <div style={{ fontFamily: '"Ubuntu Mono", monospace' }} className='bg-white/0 backdrop-blur-lg lg:flex hidden flex-col align-middle w-100 h-100 pb-4 pt-4 pl-10 pr-10 rounded-md'>
        <div className='flex text-5xl mb-4 font-bold text-white'>About Me 🤔</div>
        <div className='flex flex-col space-y-4 sm:text-sm md:text-md lg:text-lg text-gray-200'>
          {profileData.aboutParagraphs.map((para, idx) => (
            <span key={idx} className='font-semibold tracking-tight text-justify leading-relaxed'>
              {para}
            </span>
          ))}
        </div>
      </div>

    </div>
  );
};

export default About;
