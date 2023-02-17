import { useQuery } from "react-query";

import { IRepositoryInfo, IUserInfo } from "../types/github";

const GitHubService = {
  getUserInfo: (nickname: string): Promise<IUserInfo> =>
    fetch(`https://api.github.com/users/${nickname}`).then(async (res) => {
      const data = await res.json();

      if (res.ok) {
        return data;
      } else {
        throw res;
      }
    }),
  getUserRepos: (nickname: string): Promise<IRepositoryInfo[]> =>
    fetch(
      `https://api.github.com/users/${nickname}/repos?sort=updated&per_page=100`
    ).then(async (res) => {
      const data = await res.json();

      if (res.ok) {
        return data;
      } else {
        throw res;
      }
    }),
};

export const useUserInfo = (nickname: string) =>
  useQuery(["user-info", nickname], async () => {
    if (nickname) {
      const data = await GitHubService.getUserInfo(nickname);

      return data || undefined;
    }

    return undefined;
  });

export const useUserRepos = (nickname: string) =>
  useQuery(["user-repos", nickname], async () => {
    if (nickname) {
      const data = await GitHubService.getUserRepos(nickname);

      return data || undefined;
    }

    return undefined;
  });

export default GitHubService;
