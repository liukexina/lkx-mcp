import { GitHubRepoInfo } from '../types/index.js';

export function formatGitHubRepo(repo: GitHubRepoInfo): string {
    return [
        `📦 仓库名称: ${repo.full_name}`,
        `📝 描述: ${repo.description || "无描述"}`,
        `🔗 链接: ${repo.html_url}`,
        `⭐ Stars: ${repo.stargazers_count.toLocaleString()}`,
        `🍴 Forks: ${repo.forks_count.toLocaleString()}`,
        `👀 Watchers: ${repo.watchers_count.toLocaleString()}`,
        `🐛 Open Issues: ${repo.open_issues_count}`,
        `💻 主要语言: ${repo.language || "未知"}`,
        `📜 许可证: ${repo.license?.name || "未指定"}`,
        `📅 创建时间: ${new Date(repo.created_at).toLocaleDateString("zh-CN")}`,
        `🔄 最后更新: ${new Date(repo.updated_at).toLocaleDateString("zh-CN")}`,
        repo.topics && repo.topics.length > 0 ? `🏷️ 标签: ${repo.topics.join(", ")}` : "",
    ].filter(Boolean).join("\n");
}

