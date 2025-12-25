import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { z } from "zod";
import { parseUserAgent, formatUserAgentInfo } from '../utils/index.js';

export function registerUserAgentTool(server: McpServer) {
    server.registerTool(
        "parse_user_agent",
        {
            description: "解析浏览器 User-Agent 字符串，提取设备型号、系统版本、分辨率、网络类型等信息",
            inputSchema: {
                userAgent: z.string().describe("User-Agent 字符串 (例如: Mozilla/5.0 (iPhone; CPU iPhone OS 18_3_2...)"),
            },
        },
        async ({ userAgent }) => {
            console.error(`[LKX-MCP] 解析 User-Agent: ${userAgent.substring(0, 50)}...`);
            
            try {
                const uaInfo = parseUserAgent(userAgent);
                const formattedInfo = formatUserAgentInfo(uaInfo);
                
                if (uaInfo.valid) {
                    console.error(`[LKX-MCP] User-Agent 解析成功: ${uaInfo.deviceName || 'Unknown'} (${uaInfo.os} ${uaInfo.osVersion || ''})`);
                } else {
                    console.error(`[LKX-MCP] User-Agent 解析失败: ${uaInfo.error}`);
                }

                return {
                    content: [
                        {
                            type: "text",
                            text: formattedInfo,
                        },
                    ],
                };
            } catch (error) {
                console.error(`[LKX-MCP] User-Agent 解析错误:`, error);
                return {
                    content: [
                        {
                            type: "text",
                            text: `❌ 解析 User-Agent 失败: ${error instanceof Error ? error.message : '未知错误'}`,
                        },
                    ],
                };
            }
        }
    );
}

