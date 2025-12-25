import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import registerTools from "./tools/index.js";
import createServer from "./service.js";

async function main() {
    const server = createServer();
    registerTools(server);

    const transport = new StdioServerTransport();
    await server.connect(transport);
    console.error("LKX MCP Server running on stdio");
}
  
main().catch((error) => {
    console.error("Fatal error in main():", error);
    process.exit(1);
});