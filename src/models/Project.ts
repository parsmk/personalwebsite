import type { TechStack } from "./TechStack";

export type Project = {
  name: string;
  url: string;
  stack: string[];
  githubAPIPath: string;
  githubURL: string;
  order: number;
};
