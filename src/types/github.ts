export interface GitHubRepoInfo {
    name: string;
    full_name: string;
    description: string;
    html_url: string;
    stargazers_count: number;
    forks_count: number;
    watchers_count: number;
    open_issues_count: number;
    language: string;
    created_at: string;
    updated_at: string;
    pushed_at: string;
    license?: {
      name: string;
    };
    topics?: string[];
}

