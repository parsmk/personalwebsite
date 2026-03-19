import type { TechStack } from "../models/TechStack";
import ReactIcon from "../components/svgs/ReactIcon.astro";
import NextIcon from "../components/svgs/NextIcon.astro";
import ExpressIcon from "../components/svgs/ExpressIcon.astro";
import TailwindIcon from "../components/svgs/TailwindIcon.astro";
import ReactQueryIcon from "../components/svgs/ReactQueryIcon.astro";
import PostgreIcon from "../components/svgs/PostgreIcon.astro";
import PythonIcon from "../components/svgs/PythonIcon.astro";
import DjangoIcon from "../components/svgs/DjangoIcon.astro";
import TSIcon from "../components/svgs/TSIcon.astro";

export const techStackMap: Record<string, TechStack> = {
  Typescript: { Icon: TSIcon, name: "Typescript", color: "#3178C6" },
  ReactJS: { Icon: ReactIcon, name: "ReactJS", color: "#61DAFB" },
  NextJS: { Icon: NextIcon, name: "NextJS", color: "#000000" },
  ExpressJS: { Icon: ExpressIcon, name: "ExpressJS", color: "#000000" },
  TailwindCSS: { Icon: TailwindIcon, name: "TailwindCSS", color: "#06B6D4" },
  "tanstack/react-query": {
    Icon: ReactQueryIcon,
    name: "TanStack Query",
    color: "#FF4154",
  },
  PostgreSQL: { Icon: PostgreIcon, name: "PostgreSQL", color: "#4169E1" },
  Python: { Icon: PythonIcon, name: "Python", color: "#3776AB" },
  "Django REST Framework": {
    Icon: DjangoIcon,
    name: "Django REST Framework",
    color: "#092E20",
  },
};
