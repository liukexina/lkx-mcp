import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { z } from "zod";
import { formatAlert, makeNewequest } from '../utils/index.js';
import { AlertFeature } from '../types/index.js';

export function registerWeatherTool(server: McpServer) {
    server.registerTool(
        "get_lkx_falerts",
        {
          description: "Get weather alerts for a state",
          inputSchema: {
            state: z
              .string()
              .length(2)
              .describe("Two-letter state code (e.g. CA, NY)"),
          },
        },
        async ({ state }) => {
          const stateCode = state.toUpperCase();
          const alertsData = await makeNewequest<AlertFeature>(stateCode);
      
          if (!alertsData) {
            return {
              content: [
                {
                  type: "text",
                  text: "Failed to retrieve alerts data",
                },
              ],
            };
          }
      
          if (!alertsData) {
            return {
              content: [
                {
                  type: "text",
                  text: `No active alerts for ${stateCode}`,
                },
              ],
            };
          }
      
          const formattedAlert = formatAlert(alertsData);
          const alertsText = `Active alerts for ${stateCode}:\n\n${formattedAlert}`;
      
          return {
            content: [
              {
                type: "text",
                text: alertsText,
              },
            ],
          };
        },
      );
}

