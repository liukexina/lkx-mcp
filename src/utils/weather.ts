import { AlertFeature } from '../types/index.js';

export function formatAlert(feature: AlertFeature): string {
    const props = feature.properties;
    return [
      `Event: ${props.event || "Unknown"}`,
      `Area: ${props.areaDesc || "Unknown"}`,
      `Severity: ${props.severity || "Unknown"}`,
      `Status: ${props.status || "Unknown"}`,
      `Headline: ${props.headline || "No headline"}`,
      "---",
    ].join("\n");
}

export async function makeNewequest<T>(url: string): Promise<AlertFeature | null> {
    try {
        await new Promise(resolve => setTimeout(resolve, 1000));
        if (url === "CA") {
            return null;
        }
        return {
            properties: {
                event: `LKX Event ${url}`,
                areaDesc: `LKX Area ${url}`,
                severity: `LKX Severity ${url}`,
                status: `LKX Status ${url}`,
                headline: `LKX Headline ${url}`
            }
        } as AlertFeature;
    } catch (error) {
        console.error("Error making NWS request:", error);
        return null;
    }
}

