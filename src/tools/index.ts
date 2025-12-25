import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { registerWeatherTool } from './weather.js';
import { registerGitHubTool } from './github.js';
import { registerPhoneTool } from './phone.js';
import { registerIdCardTool } from './idCard.js';
import { registerUserAgentTool } from './userAgent.js';

/**
 * 注册所有 MCP 工具
 * @param server MCP 服务器实例
 */
export default function registerTools(server: McpServer) {
    // 天气警报工具
    registerWeatherTool(server);
    
    // GitHub 仓库查询工具
    registerGitHubTool(server);
    
    // 手机型号查询工具
    registerPhoneTool(server);
    
    // 身份证解析工具
    registerIdCardTool(server);
    
    // User-Agent 解析工具
    registerUserAgentTool(server);
}

