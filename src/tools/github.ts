import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { z } from "zod";
import { formatGitHubRepo } from '../utils/index.js';
import { GitHubRepoInfo } from '../types/index.js';

export function registerGitHubTool(server: McpServer) {
    server.registerTool(
        "get_github_repo_info",
        {
            description: "获取 GitHub 仓库的详细信息，包括星标数、fork数、语言、最后更新时间等",
            inputSchema: {
                owner: z.string().describe("仓库所有者/组织名 (例如: microsoft)"),
                repo: z.string().describe("仓库名称 (例如: vscode)"),
            },
        },
        async ({ owner, repo }) => {
            console.error(`[LKX-MCP] 查询 GitHub 仓库: ${owner}/${repo}`);
            
            try {
                const url = `https://api.github.com/repos/${owner}/${repo}`;
                const response = await fetch(url, {
                    headers: {
                        'User-Agent': 'lkx-mcp/1.0',
                        'Accept': 'application/vnd.github.v3+json',
                    },
                });

                if (!response.ok) {
                    if (response.status === 404) {
                        return {
                            content: [
                                {
                                    type: "text",
                                    text: `❌ 未找到仓库: ${owner}/${repo}`,
                                },
                            ],
                        };
                    }
                    throw new Error(`GitHub API 返回错误: ${response.status}`);
                }

                const repoData: GitHubRepoInfo = await response.json();
                const formattedInfo = formatGitHubRepo(repoData);

                console.error(`[LKX-MCP] 成功获取 ${owner}/${repo} 的信息`);

                return {
                    content: [
                        {
                            type: "text",
                            text: formattedInfo,
                        },
                    ],
                };
            } catch (error) {
                console.error(`[LKX-MCP] GitHub 查询错误:`, error);
                return {
                    content: [
                        {
                            type: "text",
                            text: `❌ 查询 GitHub 仓库失败: ${error instanceof Error ? error.message : '未知错误'}`,
                        },
                    ],
                };
            }
        }
    );
}

