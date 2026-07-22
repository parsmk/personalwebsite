import { Email } from "../components/svgs/Email";
import { Github } from "../components/svgs/Github";
import { LinkedIn } from "../components/svgs/LinkedIn";

export const navLinks = {
  home: { href: "#hero", target: "_self" },
  projects: { href: "#projects", target: "_self" },
};

export const socialLinks = {
  email: {
    href: "#emailCard",
    Icon: Email,
    target: "_self",
  },
  github: {
    href: "https://github.com/parsmk",
    Icon: Github,
    target: "_blank",
  },
  linkedin: {
    href: "https://www.linkedin.com/in/parsa-mohtashami-4a4509192/",
    Icon: LinkedIn,
    target: "_blank",
  },
};
