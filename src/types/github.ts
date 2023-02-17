export interface IUserInfo {
  avatar_url: string;
  created_at: Date;
  events_url: string;
  followers: number;
  followers_url: string;
  following: number;
  following_url: string;
  gists_url: string;
  html_url: string;
  id: number;
  login: string;
  name: string;
  node_id: string;
  organizations_url: string;
  public_gists: number;
  public_repos: number;
  received_events_url: string;
  repos_url: string;
  starred_url: string;
  subscriptions_url: string;
  twitter_username: string;
  type: string;
  updated_at: Date;
  url: string;
}

export interface IRepositoryInfo {
  created_at: Date;
  language: string;
  html_url: string;
  name: string;
  updated_at: Date;
  full_name: string;
}
