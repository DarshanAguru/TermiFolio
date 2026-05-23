import React, { useEffect } from 'react';
import { Github, Instagram, Linkedin, Link2, ExternalLink } from 'lucide-react';
import PdfViewer from '@/app/utils/PdfViewer';
import { projects } from '@/data/projectData';
import { profileData } from '@/data/profileData';
import { skillCategories } from '@/data/skillsData';
import { getSkillIcon, getCategoryIcon } from '@/app/utils/iconDispatcher';
import PrintProjectReadme from '@/app/Components/Terminal/PrintProjectReadme';
import PrintWorkExp from '@/app/Components/Terminal/PrintWorkExp';
import PrintCerts from './PrintCerts';

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

type PrintComponentProps = {
  data: IOPS;
  fileType: string;
};

const getSocialIcon = (name: string) => {
  switch (name.toLowerCase()) {
    case 'github': return <Github className="w-5 h-5" />;
    case 'linkedin': return <Linkedin className="w-5 h-5" />;
    case 'instagram': return <Instagram className="w-5 h-5" />;
    default: return <Link2 className="w-5 h-5" />;
  }
};

const RedirectHandler = ({ filename, path }: { filename: string; path: string }) => {
  const projTitle = path.slice(15);
  const activeProj = projects.find(p => p.title === projTitle);
  const isRepo = filename === "repository";
  const url = isRepo ? activeProj?.link : activeProj?.redirectLink;

  useEffect(() => {
    if (url && url !== "#") {
      const a = document.createElement("a");
      a.href = url;
      a.target = "_blank";
      a.click();
      a.remove();
    }
  }, [url]);

  if (!url || url === "#") {
    return (
      <div className="p-4 bg-zinc-950/40 border border-red-500/30 rounded-xl font-mono text-sm text-red-400 max-w-md my-2 animate-fade-in backdrop-blur-md">
        Error: No URL configured for this project.
      </div>
    );
  }

  return (
    <div className="p-6 bg-zinc-950/30 border border-zinc-800/80 rounded-2xl flex flex-col gap-3 font-mono text-sm max-w-md my-2 animate-fade-in backdrop-blur-md shadow-[0_8px_32px_rgba(0,0,0,0.5)]">
      <div className="flex items-center gap-3">
        {isRepo ? (
          <Github className="w-6 h-6 text-emerald-400 animate-pulse" />
        ) : (
          <ExternalLink className="w-6 h-6 text-cyan-400 animate-pulse" />
        )}
        <span className="font-bold text-white">
          Opening {isRepo ? "Repository" : "Live Demo"}...
        </span>
      </div>
      <div className="text-slate-400 text-xs leading-relaxed font-sans">
        We have launched the destination URL in a new browser tab. If it did not open automatically, please click the button below:
      </div>
      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        className={`px-4 py-2.5 mt-2 rounded-xl text-xs font-bold text-white text-center cursor-pointer transition-all duration-300 border flex items-center justify-center gap-2 ${
          isRepo
            ? "bg-emerald-500/10 border-emerald-500/30 hover:bg-emerald-500/20 hover:border-emerald-500/60"
            : "bg-cyan-500/10 border-cyan-500/30 hover:bg-cyan-500/20 hover:border-cyan-500/60"
        }`}
      >
        {isRepo ? <Github className="w-3.5 h-3.5" /> : <ExternalLink className="w-3.5 h-3.5" />}
        LAUNCH LINK 🚀
      </a>
    </div>
  );
};

const PrintComponent = ({ data, fileType }: PrintComponentProps) => {
  const filename = data.response.resp.split("@")[1].split(".")[0].toLowerCase();

  const handleSkillClick = (url: string) => {
    if (url === "#") return;
    const a = document.createElement('a');
    a.href = url;
    a.target = '_blank';
    a.click();
    a.remove();
  };

  const emailHandler = async (e: React.MouseEvent) => {
    e.preventDefault();
    await navigator.clipboard.writeText(profileData.email);
    alert("Email Copied! 😊");
  };

  return (
    <div className="w-full h-full text-slate-300">
      {/* TXT Files */}
      {fileType === "txt" && (
        <div className="m-1 p-1">
          {filename === "email" && (
            <div className="flex gap-2">
              <span>
                Email me at:{' '}
                <a
                  onClick={emailHandler}
                  className="hover:underline text-cyan-400 font-mono hover:text-cyan-300 cursor-pointer"
                  href="javascript:void(0)"
                >
                  {profileData.email}
                </a>{' '}
                (Click to copy)
              </span>
            </div>
          )}

          {filename === "links" && (
            <div className="flex flex-col gap-3">
              {profileData.socials.map((social, idx) => (
                <div key={idx} className="flex items-center gap-3">
                  <div className="text-cyan-400">{getSocialIcon(social.name)}</div>
                  <a
                    className="hover:underline text-slate-200 hover:text-cyan-400 cursor-pointer font-semibold"
                    href="javascript:void(0)"
                    onClick={(e) => {
                      e.preventDefault();
                      if (social.url === "#") return;
                      const a = document.createElement("a");
                      a.href = social.url;
                      a.target = "_blank";
                      a.click();
                      a.remove();
                    }}
                  >
                    {social.name}
                  </a>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* PDF Files */}
      {fileType === "pdf" && (
        <div className="w-full h-full">
          {filename === "resume" && (
            <div className="w-full flex flex-col gap-6 font-sans text-slate-300 animate-fade-in max-h-[58vh] overflow-y-auto p-6 bg-zinc-950/30 border border-zinc-800/60 rounded-2xl shadow-[0_8px_32px_rgba(0,0,0,0.5)] backdrop-blur-md" style={{ scrollbarWidth: "none" }}>
              <div className="text-3xl font-extrabold text-white tracking-tight font-mono">Resume PDF Viewer</div>
              <hr className="border-zinc-800 w-full" />
              <div className="w-full h-full min-h-[450px]">
                {profileData.resumeUrl !== "#" ? (
                  <PdfViewer url={profileData.resumeUrl} />
                ) : (
                  <div className="w-full h-full flex flex-col items-center justify-center text-center p-8 bg-zinc-950/30 border border-zinc-800/40 rounded-xl">
                    <div className="text-cyan-400 font-mono mb-2">Resume PDF Placeholder</div>
                    <div className="text-xs text-slate-500 font-sans">Resume PDF file is currently generic. Place your PDF inside the public folder to display.</div>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      )}

      {/* MD Files */}
      {fileType === "md" && (
        <div className="w-full h-full">
          {filename === "skills" && (
            <div className="w-full flex flex-col gap-6 font-sans text-slate-300 animate-fade-in max-h-[58vh] overflow-y-auto p-6 bg-zinc-950/30 border border-zinc-800/60 rounded-2xl shadow-[0_8px_32px_rgba(0,0,0,0.5)] backdrop-blur-md" style={{ scrollbarWidth: "none" }}>
              <div className="text-3xl font-extrabold text-white tracking-tight font-mono">Technical Skills Dashboard</div>
              <hr className="border-zinc-800" />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {skillCategories.map((cat, idx) => (
                  <div key={idx} className="bg-zinc-950/30 border border-zinc-800/80 p-4 rounded-xl flex flex-col justify-between">
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <div className="text-cyan-400 flex items-center justify-center">{getCategoryIcon(cat.name)}</div>
                        <span className="font-bold text-white text-md">{cat.name}</span>
                      </div>
                      <p className="text-xs text-slate-400 mb-3 font-sans leading-tight">{cat.description}</p>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {cat.skills.map((skill, sIdx) => (
                        <span
                          key={sIdx}
                          onClick={() => handleSkillClick(skill.url)}
                          className="text-xs px-2 py-1 bg-zinc-900 border border-zinc-800 hover:border-cyan-500/50 hover:bg-cyan-500/10 cursor-pointer rounded text-slate-300 font-mono transition-all flex items-center gap-1.5 flex-shrink-0"
                        >
                          {getSkillIcon(skill.name)}
                          {skill.name}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {filename === "certifications" && (
            <div className="w-full flex flex-col gap-6 font-sans text-slate-300 animate-fade-in max-h-[58vh] overflow-y-auto p-6 bg-zinc-950/30 border border-zinc-800/60 rounded-2xl shadow-[0_8px_32px_rgba(0,0,0,0.5)] backdrop-blur-md" style={{ scrollbarWidth: "none" }}>
              <div className="text-3xl font-extrabold text-white tracking-tight font-mono">Certifications</div>
              <hr className="border-zinc-800 w-full" />
              <PrintCerts />
            </div>
          )}

          {filename === "experience" && (
            <div className="w-full flex flex-col gap-6 font-sans text-slate-300 animate-fade-in max-h-[58vh] overflow-y-auto p-6 bg-zinc-950/30 border border-zinc-800/60 rounded-2xl shadow-[0_8px_32px_rgba(0,0,0,0.5)] backdrop-blur-md" style={{ scrollbarWidth: "none" }}>
              <div className="text-3xl font-extrabold text-white tracking-tight font-mono">Work Experience</div>
              <hr className="border-zinc-800 w-full" />
              <PrintWorkExp />
            </div>
          )}

          {projects.map(proj => proj.title.toLowerCase()).includes(filename) && (
            <div className="w-full h-full m-2 p-2">
              <PrintProjectReadme
                data={
                  projects.filter(proj => proj.title.toLowerCase() === filename).map(p => ({
                    name: p.title,
                    file: `${p.title.toLowerCase()}.md`,
                    desc: p.about,
                    summary: p.description,
                    challenges: p.challenges,
                    link: p.link,
                    liveLink: p.redirectLink,
                    techs: p.techStack,
                  }))[0]
                }
              />
            </div>
          )}

          {filename === "about" && (
            <div className="w-full flex flex-col gap-6 font-sans text-slate-300 animate-fade-in max-h-[58vh] overflow-y-auto p-6 bg-zinc-950/30 border border-zinc-800/60 rounded-2xl shadow-[0_8px_32px_rgba(0,0,0,0.5)] backdrop-blur-md" style={{ scrollbarWidth: "none" }}>
              <div className="text-4xl font-extrabold text-white tracking-tight font-mono">{profileData.name}</div>
              <hr className="border-zinc-800 w-full" />
              <div className="text-[1rem] text-justify leading-relaxed tracking-tight flex flex-col gap-4 font-sans text-slate-300">
                {profileData.aboutParagraphs.map((para, idx) => (
                  <div key={idx}>{para}</div>
                ))}
              </div>
            </div>
          )}

          {(filename === "repository" || filename === "live_demo") && (
            <div className="w-full h-full m-2 p-2">
              <RedirectHandler filename={filename} path={data.response.path} />
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default PrintComponent;