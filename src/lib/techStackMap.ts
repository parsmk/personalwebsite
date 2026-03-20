import type { TechStack } from "../models/TechStack";

export const techStackMap: Record<string, TechStack> = {
  Typescript: {
    path: "/icons/typescript.svg",
    name: "Typescript",
    color: "#3178C6",
  },
  ReactJS: { path: "/icons/react.svg", name: "ReactJS", color: "#61DAFB" },
  NextJS: { path: "/icons/nextjs.svg", name: "NextJS", color: "#000000" },
  ExpressJS: {
    path: "/icons/express.svg",
    name: "ExpressJS",
    color: "#000000",
  },
  TailwindCSS: {
    path: "/icons/tailwind.svg",
    name: "TailwindCSS",
    color: "#06B6D4",
  },
  "tanstack/react-query": {
    path: "/icons/reactquery.svg",
    name: "TanStack Query",
    color: "#FF4154",
  },
  PostgreSQL: {
    path: "/icons/postgre.svg",
    name: "PostgreSQL",
    color: "#4169E1",
  },
  Python: { path: "/icons/python.svg", name: "Python", color: "#3776AB" },
  "Django REST Framework": {
    path: "/icons/django.svg",
    name: "Django REST Framework",
    color: "#092E20",
  },
  Shopware: { path: "/icons/shopware.svg", name: "Shopware", color: "#1B9BF0" },
  Javascript: { path: "/icons/js.svg", name: "Javascript", color: "#ff7b00" },
  C3: { path: "/icons/c3.svg", name: "C#", color: "#662579" },
  Unity: { path: "/icons/unity.svg", name: "Unity", color: "#d6d3d1" },
  HLSL: { path: "/icons/hlsl.svg", name: "HLSL", color: "#0000ff" },
  YAML: { path: "/icons/yaml.svg", name: "YAML", color: "#CC2828" },
};
