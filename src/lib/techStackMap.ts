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
  Typescript: { Icon: TSIcon, name: "Typescript" },
  ReactJS: { Icon: ReactIcon, name: "ReactJS" },
  NextJS: { Icon: NextIcon, name: "NextJS" },
  ExpressJS: { Icon: ExpressIcon, name: "ExpressJS" },
  TailwindCSS: { Icon: TailwindIcon, name: "TailwindCSS" },
  "tanstack/react-query": { Icon: ReactQueryIcon, name: "TanStack Query" },
  PostgreSQL: { Icon: PostgreIcon, name: "PostgreSQL" },
  Python: { Icon: PythonIcon, name: "Python" },
  "Django REST Framework": { Icon: DjangoIcon, name: "Django REST Framework" },
};
