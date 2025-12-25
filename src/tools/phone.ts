import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { z } from "zod";
import { formatPhoneInfo, phoneDatabase } from '../utils/index.js';

export function registerPhoneTool(server: McpServer) {
    server.registerTool(
        "get_phone_info",
        {
            description: "查询手机型号的详细信息，包括品牌、发布日期、屏幕、处理器、电池等参数",
            inputSchema: {
                model: z.string().describe("手机型号名称 (例如: iPhone 15 Pro, Samsung Galaxy S24)"),
            },
        },
        async ({ model }) => {
            console.error(`[LKX-MCP] 查询手机型号: ${model}`);
            
            try {
                const normalizedModel = model.toLowerCase().trim();
                const phoneInfo = phoneDatabase[normalizedModel];

                if (!phoneInfo) {
                    const availableModels = Object.keys(phoneDatabase).join(", ");
                    return {
                        content: [
                            {
                                type: "text",
                                text: `❌ 未找到手机型号: ${model}\n\n📱 当前支持的型号:\n${availableModels}\n\n💡 提示: 可以尝试其他型号或者等待数据库更新`,
                            },
                        ],
                    };
                }

                const formattedInfo = formatPhoneInfo(phoneInfo);
                console.error(`[LKX-MCP] 成功获取 ${model} 的信息`);

                return {
                    content: [
                        {
                            type: "text",
                            text: formattedInfo,
                        },
                    ],
                };
            } catch (error) {
                console.error(`[LKX-MCP] 手机信息查询错误:`, error);
                return {
                    content: [
                        {
                            type: "text",
                            text: `❌ 查询手机信息失败: ${error instanceof Error ? error.message : '未知错误'}`,
                        },
                    ],
                };
            }
        }
    );
}

