import type { TechStack } from "../models/TechStack";

const PATH = (fileName: string) => `/icons/${fileName}`;

export const techStackMap: Record<string, TechStack> = {
  ts: {
    path: PATH("typescript.svg"),
    name: "Typescript",
    color: "#3178C6",
  },
  react: {
    path: PATH("react.svg"),
    name: "ReactJS",
    color: "#61DAFB",
  },
  next: {
    path: PATH("nextjs.svg"),
    name: "NextJS",
    color: "#000000",
  },
  express: {
    path: PATH("express.svg"),
    name: "ExpressJS",
    color: "#000000",
  },
  tailwind: {
    path: PATH("tailwind.svg"),
    name: "TailwindCSS",
    color: "#06B6D4",
  },
  reactQuery: {
    path: PATH("reactquery.svg"),
    name: "TanStack Query",
    color: "#FF4154",
  },
  postgreSQL: {
    path: PATH("postgre.svg"),
    name: "PostgreSQL",
    color: "#4169E1",
  },
  python: {
    path: PATH("python.svg"),
    name: "Python",
    color: "#3776AB",
  },
  django: {
    path: PATH("django.svg"),
    name: "Django REST Framework",
    color: "#092E20",
  },
  shopware: {
    path: PATH("shopware.svg"),
    name: "Shopware",
    color: "#1B9BF0",
  },
  js: {
    path: PATH("js.svg"),
    name: "Javascript",
    color: "#ff7b00",
  },
  c3: {
    path: PATH("c3.svg"),
    name: "C#",
    color: "#662579",
  },
  unity: {
    path: PATH("unity.svg"),
    name: "Unity",
    color: "#d6d3d1",
  },
  hlsl: {
    path: PATH("hlsl.svg"),
    name: "HLSL",
    color: "#0000ff",
  },
  yaml: {
    path: PATH("yaml.svg"),
    name: "YAML",
    color: "#CC2828",
  },
  mongodb: {
    path: PATH("mongodb.svg"),
    name: "MongoDB",
    color: "#4a8c4f",
  },
  astro: {
    path: PATH("astro.svg"),
    name: "Astro",
    color: "#0d0d1a",
  },
};
