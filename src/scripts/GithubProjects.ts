import.meta.env.GITHUB_KEY;

const SRC = "https://api.github.com/";

export class APIError extends Error {
  constructor(
    public status?: number,
    message?: string,
  ) {
    super(message);
    this.name = "APIError";
  }
}

export type GithubResponse = {
  title: string;
  url: "https://api.github.com/users/octocat";
  languages_url: {
    type: "string";
    format: "uri";
  };
};

export const fetchRepos = async () => {
  const res = await fetch(`${SRC}/user/repos`);
  if (!res.ok) throw new APIError(res.status, res.statusText);
  return await res.json();
};
