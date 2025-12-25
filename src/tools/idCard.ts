import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { z } from "zod";
import { parseIdCard, formatIdCardInfo } from '../utils/index.js';

export function registerIdCardTool(server: McpServer) {
    server.registerTool(
        "parse_id_card",
        {
            description: "解析中国身份证号码，获取地区、出生日期、性别等信息，并校验身份证号码是否合法",
            inputSchema: {
                idCard: z.string().describe("18位身份证号码 (例如: 110101199003078515)"),
            },
        },
        async ({ idCard }) => {
            console.error(`[LKX-MCP] 解析身份证号: ${idCard.substring(0, 6)}******`);
            
            try {
                const idCardInfo = parseIdCard(idCard);
                const formattedInfo = formatIdCardInfo(idCardInfo);
                
                if (idCardInfo.valid) {
                    console.error(`[LKX-MCP] 身份证号解析成功`);
                } else {
                    console.error(`[LKX-MCP] 身份证号无效: ${idCardInfo.error}`);
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
                console.error(`[LKX-MCP] 身份证解析错误:`, error);
                return {
                    content: [
                        {
                            type: "text",
                            text: `❌ 解析身份证号失败: ${error instanceof Error ? error.message : '未知错误'}`,
                        },
                    ],
                };
            }
        }
    );
}

