import { projects } from "@/data/projectData";
import { profileData } from "@/data/profileData";

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

export const processCommand = (command: string, path: string): IOPS => {
  let resp = "";
  let newPath = path;
  const allProjs = projects.map(proj => proj.title);
  command = command.trim();
  let arrCmd = command.split(" ");
  const baseCmd = arrCmd[0].toLowerCase();

  if (command.toLowerCase() === "help") {
    resp = "HELP";
  } else if (command.toLowerCase() === "clear") {
    resp = "CLEAR";
  } else if (command === "") {
    resp = "BLANK";
    newPath = path;
  } else if (command.toLowerCase() === "exit") {
    resp = "EXIT";
  } else if (baseCmd === "cd") {
    let tempPath = arrCmd.length > 1 ? arrCmd[1] : "~";
    resp = "CD";

    if (tempPath === "~" || tempPath === "/") {
      newPath = "/";
    } else if (tempPath === "..") {
      if (path === "/Home" || path === "/About" || path === "/Contact") {
        newPath = "/";
      } else if (path === "/Home/Projects") {
        newPath = "/Home";
      } else if (path.startsWith("/Home/Projects/")) {
        newPath = "/Home/Projects";
      } else {
        newPath = path;
        resp = "ERR";
      }
    } else {
      if (path === "/") {
        const lowerPath = tempPath.toLowerCase();
        if (lowerPath === "home") newPath = "/Home";
        else if (lowerPath === "about") newPath = "/About";
        else if (lowerPath === "contact") newPath = "/Contact";
        else {
          resp = "ERR";
          newPath = path;
        }
      } else if (path === "/Home" && tempPath.toLowerCase() === "projects") {
        newPath = "/Home/Projects";
      } else if (path === "/Home/Projects") {
        const foundProj = projects.find(proj => proj.title.toLowerCase() === tempPath.toLowerCase());
        if (foundProj) {
          newPath = "/Home/Projects/" + foundProj.title;
        } else {
          newPath = path;
          resp = "ERR";
        }
      } else {
        newPath = path;
        resp = "ERR";
      }
    }
  } else if (command.toLowerCase() === "ls") {
    resp = "LS";
    newPath = path;
  } else if (arrCmd.length > 1 && baseCmd === "cat") {
    resp = "CAT@" + arrCmd[1];
    newPath = path;
  } else if (arrCmd.length > 1 && baseCmd === "download") {
    resp = "DOWNLOAD@" + arrCmd[1];
    newPath = path;
  } else {
    resp = "ERR";
    newPath = path;
  }

  return {
    user: {
      command: command,
      path: path,
    },
    response: {
      resp: resp,
      path: newPath,
    },
  };
};

export const predictCommand = (command: string, path: string, times: number): string => {
  let res = "";
  command = command.trim();
  const allProjs = projects.map(proj => proj.title);
  let arrCmd = command.split(" ");
  const baseCmd = arrCmd[0].toLowerCase();
  const opts = ["help", "ls", "clear", "exit"];

  if (command.startsWith("h")) {
    res = "help";
  } else if (command.startsWith("e")) {
    res = "exit";
  } else if (command.startsWith("cl")) {
    res = "clear";
  } else if (
    (path === "/" || path === "/Home" || path.startsWith("/Home/Projects/") || path === "/Contact" || path === "/About") &&
    (command.startsWith("ca") || command === "cat" || (arrCmd.length > 1 && baseCmd === "cat"))
  ) {
    let paths: string[] = [];
    if (path === "/") {
      paths = ["resume.pdf"];
    } else if (path.startsWith("/Home/Projects/")) {
      const projTitle = path.slice(15);
      const foundProj = projects.find(proj => proj.title === projTitle);
      if (foundProj) {
        paths = [`${foundProj.title.toLowerCase()}.md`];
        if (foundProj.link && foundProj.link !== "#" && foundProj.link !== "") {
          paths.push("repository");
        }
        if (foundProj.redirectLink && foundProj.redirectLink !== "#" && foundProj.redirectLink !== "") {
          paths.push("live_demo");
        }
      }
    } else if (path === "/Home") {
      paths = ["skills.md", "experience.md", "certifications.md"];
    } else if (path === "/Contact") {
      paths = ["email.txt", "links.txt"];
    } else if (path === "/About") {
      paths = ["about.md"];
    }

    if (paths.length > 0) {
      res = "cat " + paths[times % paths.length];
    } else {
      res = "cat";
    }
  } else if (command.startsWith("c") || command === "cd" || (arrCmd.length > 1 && baseCmd === "cd")) {
    let paths: string[] = [];
    if (path === "/") {
      paths = ["home", "about", "contact"];
      res = "cd " + paths[times % paths.length];
    } else if (path === "/Home") {
      paths = ["projects"];
      res = "cd " + paths[times % paths.length];
    } else if (path === "/Home/Projects") {
      paths = allProjs;
      res = "cd " + paths[times % paths.length];
    } else {
      res = "";
    }
  } else if (command.startsWith("l")) {
    res = "ls";
  } else if (
    path === "/" &&
    (command.startsWith("d") || command === "download" || (arrCmd.length > 1 && baseCmd === "download"))
  ) {
    res = `download ${profileData.resumeFilename}`;
  } else {
    res = opts[times % opts.length];
  }
  return res;
};