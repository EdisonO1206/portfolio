import axios from "axios";

const headers: any = {};

if (process.env.NEXT_PUBLIC_GITHUB_TOKEN) {
  headers.Authorization = `Bearer ${process.env.NEXT_PUBLIC_GITHUB_TOKEN}`;
}

export const githubAPI = axios.create({
  baseURL: "https://api.github.com",
  headers,
});

export const getGitHubStats = async () => {
  const username = "EdisonO1206";

  const [profile, repos, prs] = await Promise.all([
    githubAPI.get(`/users/${username}`),
    githubAPI.get(`/users/${username}/repos`, { params: { per_page: 100 } }),
    githubAPI.get("/search/issues", {
      params: { q: `author:${username} type:pr` },
    }),
  ]);

  return {
    repos: profile.data.public_repos,
    followers: profile.data.followers,
    following: profile.data.following,
    stars: repos.data.reduce(
      (acc: number, r: any) => acc + r.stargazers_count,
      0
    ),
    pullRequests: prs.data.total_count,
  };
};
