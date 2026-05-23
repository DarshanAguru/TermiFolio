import React from 'react';
import { projects } from '@/data/projectData';
import { profileData } from '@/data/profileData';
import PrintComponent from './PrintComponent';
import { Github, ExternalLink } from 'lucide-react';

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

type TerminalOutPutProps = {
  data: IOPS;
};

const TerminalOutPut = ({ data }: TerminalOutPutProps) => {
  const commandsList = ["cd", "ls", "cat", "clear", "download", "help", "exit"];
  const promptUser = `${profileData.username}@portfolio`;

  const listFiles = (path: string): string[] => {
    let files: string[] = [];
    if (path === "/") {
      files = ["/Home", "/About", "/Contact", profileData.resumeFilename];
    } else if (path === "/Home") {
      files = ["/Projects", "skills.md", "experience.md", "certifications.md"];
    } else if (path === "/Home/Projects") {
      files = projects.map(proj => `/${proj.title}`);
    } else if (path.startsWith("/Home/Projects/")) {
      const title = path.slice(15);
      const foundProj = projects.find(proj => proj.title === title);
      if (foundProj) {
        files = [`${foundProj.title.toLowerCase()}.md`];
        if (foundProj.link && foundProj.link !== "#" && foundProj.link !== "") {
          files.push("repository");
        }
        if (foundProj.redirectLink && foundProj.redirectLink !== "#" && foundProj.redirectLink !== "") {
          files.push("live_demo");
        }
      } else {
        files = [""];
      }
    } else if (path === "/Contact") {
      files = ["email.txt", "links.txt"];
    } else if (path === "/About") {
      files = ["about.md"];
    }
    return files;
  };

  return (
    <div className="w-full">
      {/* cd command */}
      {data.response.resp === "CD" && (
        <div className="flex lg:flex-row flex-col">
          <div>
            <span style={{ color: "#49de80" }}>{promptUser}</span>:
          </div>
          <div className="flex lg:flex-row flex-col">
            <span style={{ color: "#60a5fa" }}>{data.user.path}</span>
            <div className="flex">
              $<div className="px-2 w-full"><span className="text-white">{data.user.command}</span></div>
            </div>
          </div>
        </div>
      )}

      {/* clear command */}
      {data.response.resp === "CLEAR" && <div></div>}

      {/* ERR */}
      {data.response.resp === "ERR" && (
        <div>
          <div className="flex lg:flex-row flex-col">
            <div>
              <span style={{ color: "#49de80" }}>{promptUser}</span>:
            </div>
            <div className="flex">
              <span style={{ color: "#60a5fa" }}>{data.user.path}</span>$
              <div className="px-2 w-full">
                <span className="text-white">{data.user.command}</span>
              </div>
            </div>
          </div>
          <div className="p-1 m-1 text-red-400">
            {commandsList.includes(data.user.command.split(" ")[0].trim())
              ? `Command '${data.user.command}' is not applicable here or is incomplete (/incorrect), please check the command or enter 'help' to see all available commands.`
              : `Command '${data.user.command}' is not found, please enter 'help' to see all available commands.`}
          </div>
        </div>
      )}

      {/* help command */}
      {data.response.resp === "HELP" && (
        <div>
          <div className="flex lg:flex-row flex-col">
            <div>
              <span style={{ color: "#49de80" }}>{promptUser}</span>:
            </div>
            <div className="flex lg:flex-row flex-col">
              <span style={{ color: "#60a5fa" }}>{data.user.path}</span>
              <div className="flex">
                $<div className="px-2 w-full"><span className="text-white">{data.user.command}</span></div>
              </div>
            </div>
          </div>
          <div className="w-full m-1 p-1">
            <table className="table-auto border-collapse text-left w-full text-slate-300">
              <thead>
                <tr className="border-b border-zinc-800">
                  <th className="pb-2 font-bold text-white">Command</th>
                  <th className="pb-2 font-bold text-white pl-4">Description</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-zinc-900">
                  <td className="py-2 font-mono text-cyan-400">cat [fileName]</td>
                  <td className="py-2 text-sm pl-4 leading-relaxed">To view the contents of a file. For example, to view the skills dashboard, run <span className="font-mono text-white">cat skills.md</span>.</td>
                </tr>
                <tr className="border-b border-zinc-900">
                  <td className="py-2 font-mono text-cyan-400">cd [path]</td>
                  <td className="py-2 text-sm pl-4 leading-relaxed">To change current directory. For example, to enter projects run <span className="font-mono text-white">cd Projects</span>. Enter <span className="font-mono text-white">cd ..</span> to go up a directory level.</td>
                </tr>
                <tr className="border-b border-zinc-900">
                  <td className="py-2 font-mono text-cyan-400">clear</td>
                  <td className="py-2 text-sm pl-4 leading-relaxed">Clears the terminal and clears command logs.</td>
                </tr>
                <tr className="border-b border-zinc-900">
                  <td className="py-2 font-mono text-cyan-400">download [fileName]</td>
                  <td className="py-2 text-sm pl-4 leading-relaxed">Downloads the target file. (It downloads the resume.pdf available in root directory)</td>
                </tr>
                <tr className="border-b border-zinc-900">
                  <td className="py-2 font-mono text-cyan-400">exit</td>
                  <td className="py-2 text-sm pl-4 leading-relaxed">Closes the active terminal session.</td>
                </tr>
                <tr className="border-b border-zinc-900">
                  <td className="py-2 font-mono text-cyan-400">help</td>
                  <td className="py-2 text-sm pl-4 leading-relaxed">Displays this helper reference menu.</td>
                </tr>
                <tr>
                  <td className="py-2 font-mono text-cyan-400">ls</td>
                  <td className="py-2 text-sm pl-4 leading-relaxed">Lists files and folders inside the active directory.</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* cat command */}
      {data.response.resp.startsWith("CAT") && (
        <div>
          <div className="flex lg:flex-row flex-col">
            <div>
              <span style={{ color: "#49de80" }}>{promptUser}</span>:
            </div>
            <div className="flex lg:flex-row flex-col">
              <span style={{ color: "#60a5fa" }}>{data.user.path}</span>
              <div className="flex">
                $<div className="px-2 w-full"><span className="text-white">{data.user.command}</span></div>
              </div>
            </div>
          </div>
          <div>
            <PrintComponent data={data} fileType={data.response.resp.split('.')[1]} />
          </div>
        </div>
      )}

      {/* ls command */}
      {data.response.resp === "LS" && (
        <div>
          <div className="flex lg:flex-row flex-col">
            <div>
              <span style={{ color: "#49de80" }}>{promptUser}</span>:
            </div>
            <div className="flex">
              <span style={{ color: "#60a5fa" }}>{data.user.path}</span>$
              <div className="px-2 w-full">
                <span className="text-white">{data.user.command}</span>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-2 m-2 p-1 font-mono">
            {listFiles(data.response.path).map((file, idx) => (
              <div key={idx}>
                {file.startsWith("https://") ? (
                  <div
                    className="text-teal-300 underline hover:text-teal-500 hover:tracking-wider duration-75 cursor-pointer"
                    onClick={(e) => {
                      e.preventDefault();
                      const a = document.createElement("a");
                      a.href = file;
                      a.target = "_blank";
                      a.click();
                      a.remove();
                    }}
                  >
                    Link to Repo
                  </div>
                ) : file.startsWith("/") ? (
                  <span className="text-yellow-300 font-bold">{file}</span>
                ) : file === "repository" ? (
                  <span
                    className="text-emerald-400 font-mono underline hover:text-emerald-300 hover:cursor-pointer flex items-center gap-1.5"
                    onClick={(e) => {
                      e.preventDefault();
                      const projTitle = data.response.path.slice(15);
                      const foundProj = projects.find(p => p.title === projTitle);
                      if (foundProj && foundProj.link && foundProj.link !== "#") {
                        const a = document.createElement("a");
                        a.href = foundProj.link;
                        a.target = "_blank";
                        a.click();
                        a.remove();
                      }
                    }}
                  >
                    <Github className="w-3.5 h-3.5 inline mr-1" />
                    repository
                  </span>
                ) : file === "live_demo" ? (
                  <span
                    className="text-cyan-400 font-mono underline hover:text-cyan-300 hover:cursor-pointer flex items-center gap-1.5"
                    onClick={(e) => {
                      e.preventDefault();
                      const projTitle = data.response.path.slice(15);
                      const foundProj = projects.find(p => p.title === projTitle);
                      if (foundProj && foundProj.redirectLink && foundProj.redirectLink !== "#") {
                        const a = document.createElement("a");
                        a.href = foundProj.redirectLink;
                        a.target = "_blank";
                        a.click();
                        a.remove();
                      }
                    }}
                  >
                    <ExternalLink className="w-3.5 h-3.5 inline mr-1" />
                    live_demo
                  </span>
                ) : file.endsWith(".pdf") ? (
                  <span className="text-red-300 font-bold">{file}</span>
                ) : file.endsWith(".md") ? (
                  <span className="text-cyan-300 font-semibold">{file}</span>
                ) : (
                  <span className="text-slate-300">{file}</span>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Blank Command */}
      {data.response.resp === "BLANK" && (
        <div>
          <div className="flex lg:flex-row flex-col">
            <div>
              <span style={{ color: "#49de80" }}>{promptUser}</span>:
            </div>
            <div className="flex">
              <span style={{ color: "#60a5fa" }}>{data.user.path}</span>$
              <div className="px-2 w-full">
                <span className="text-white"></span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Download Command */}
      {data.response.resp.startsWith("DOWNLOAD") && (
        <div>
          <div className="flex lg:flex-row flex-col">
            <div>
              <span style={{ color: "#49de80" }}>{promptUser}</span>:
            </div>
            <div className="flex">
              <span style={{ color: "#60a5fa" }}>{data.user.path}</span>$
              <div className="px-2 w-full">
                <span className="text-white">{data.user.command}</span>
              </div>
            </div>
          </div>
          <div className="m-2 p-1 text-green-400 font-mono">
            Successfully downloaded asset to your device (File: &apos;{data.response.resp.split("@")[1]}&apos;)
          </div>
        </div>
      )}
    </div>
  );
};

export default TerminalOutPut;