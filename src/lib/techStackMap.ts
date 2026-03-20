import type { TechStack } from "../models/TechStack";

export const techStackMap: Record<string, TechStack> = {
  Typescript: { path: "/icons/typescript.svg", name: "Typescript", color: "#3178C6" },
  ReactJS: { path: "/icons/react.svg", name: "ReactJS", color: "#61DAFB" },
  NextJS: { path: "/icons/nextjs.svg", name: "NextJS", color: "#000000" },
  ExpressJS: { path: "/icons/express.svg", name: "ExpressJS", color: "#000000" },
  TailwindCSS: { path: "/icons/tailwind.svg", name: "TailwindCSS", color: "#06B6D4" },
  "tanstack/react-query": {
    path: "/icons/reactquery.svg",
    name: "TanStack Query",
    color: "#FF4154",
  },
  PostgreSQL: { path: "/icons/postgre.svg", name: "PostgreSQL", color: "#4169E1" },
  Python: { path: "/icons/python.svg", name: "Python", color: "#3776AB" },
  "Django REST Framework": {
    path: "/icons/django.svg",
    name: "Django REST Framework",
    color: "#092E20",
  },
};
