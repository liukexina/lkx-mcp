import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";

export default function createServer() {
    return new McpServer({
        name: "lkx-mcp",
        version: "1.0.0",
    });
}