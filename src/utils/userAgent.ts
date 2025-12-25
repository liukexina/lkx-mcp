import { UserAgentInfo, iPhoneModelMap } from '../types/index.js';

/**
 * 解析 User-Agent 字符串
 * @param userAgent User-Agent 字符串
 * @returns 解析后的设备信息
 */
export function parseUserAgent(userAgent: string): UserAgentInfo {
    if (!userAgent || typeof userAgent !== 'string') {
        return {
            valid: false,
            rawUserAgent: userAgent,
            error: "User-Agent 字符串无效"
        };
    }

    const result: UserAgentInfo = {
        valid: true,
        rawUserAgent: userAgent
    };

    try {
        // 解析操作系统和版本
        // iOS: "iPhone; CPU iPhone OS 18_3_2 like Mac OS X" 或 "iOS 18.3.2"
        const iosMatch = userAgent.match(/(?:iPhone OS|iOS)\s+([\d_\.]+)/i);
        if (iosMatch) {
            result.os = "iOS";
            result.osVersion = iosMatch[1].replace(/_/g, '.');
        }

        // Android: "Android 13" 或 "Android/13"
        const androidMatch = userAgent.match(/Android[\s\/]+([\d\.]+)/i);
        if (androidMatch) {
            result.os = "Android";
            result.osVersion = androidMatch[1];
        }

        // 解析设备信息: Device/(Apple Inc.;iPhone15,3)
        const deviceMatch = userAgent.match(/Device\/\(([^;]+);([^\)]+)\)/);
        if (deviceMatch) {
            result.deviceBrand = deviceMatch[1];
            result.deviceModel = deviceMatch[2];
            
            // 如果是 iPhone，尝试映射到商业名称
            if (result.deviceModel && iPhoneModelMap[result.deviceModel]) {
                result.deviceName = iPhoneModelMap[result.deviceModel];
            } else {
                result.deviceName = result.deviceModel;
            }
        }

        // 如果没有 Device 字段，尝试从 UA 中识别设备类型
        if (!result.deviceBrand) {
            if (userAgent.includes('iPhone')) {
                result.deviceBrand = 'Apple Inc.';
                result.deviceName = 'iPhone';
            } else if (userAgent.includes('iPad')) {
                result.deviceBrand = 'Apple Inc.';
                result.deviceName = 'iPad';
            } else if (userAgent.includes('Android')) {
                // 尝试识别 Android 设备品牌
                const brands = ['Samsung', 'Huawei', 'Xiaomi', 'OPPO', 'vivo', 'OnePlus', 'Google'];
                for (const brand of brands) {
                    if (userAgent.includes(brand)) {
                        result.deviceBrand = brand;
                        break;
                    }
                }
            }
        }

        // 解析应用信息: discover/9.1
        const appMatch = userAgent.match(/(\w+)\/([\d\.]+)/);
        if (appMatch && !['Mozilla', 'AppleWebKit', 'Mobile'].includes(appMatch[1])) {
            result.appName = appMatch[1];
            result.appVersion = appMatch[2];
        }

        // 解析 Build 版本: Build/9010812
        const buildMatch = userAgent.match(/Build\/([\d]+)/);
        if (buildMatch) {
            result.buildVersion = buildMatch[1];
        }

        // 解析分辨率: Resolution/1290*2796
        const resolutionMatch = userAgent.match(/Resolution\/([\d]+\*[\d]+)/);
        if (resolutionMatch) {
            result.resolution = resolutionMatch[1];
        }

        // 解析屏幕缩放: Scale/3.00
        const scaleMatch = userAgent.match(/Scale\/([\d\.]+)/);
        if (scaleMatch) {
            result.scale = scaleMatch[1];
        }

        // 解析网络类型: NetType/WiFi 或 NetType/CellNetwork
        const netTypeMatch = userAgent.match(/NetType\/(\w+)/);
        if (netTypeMatch) {
            result.netType = netTypeMatch[1];
        }

        // 解析 WebView: WKWebView=1
        if (userAgent.includes('WKWebView')) {
            result.webView = 'WKWebView';
        } else if (userAgent.includes('WebView')) {
            result.webView = 'WebView';
        }

        // 解析浏览器类型
        if (userAgent.includes('Chrome') && !userAgent.includes('Edge')) {
            result.browser = 'Chrome';
        } else if (userAgent.includes('Safari') && !userAgent.includes('Chrome')) {
            result.browser = 'Safari';
        } else if (userAgent.includes('Firefox')) {
            result.browser = 'Firefox';
        } else if (userAgent.includes('Edge')) {
            result.browser = 'Edge';
        }

    } catch (error) {
        result.valid = false;
        result.error = `解析失败: ${error instanceof Error ? error.message : '未知错误'}`;
    }

    return result;
}

/**
 * 格式化 User-Agent 解析结果
 * @param info 解析后的 UA 信息
 * @returns 格式化的字符串
 */
export function formatUserAgentInfo(info: UserAgentInfo): string {
    if (!info.valid) {
        return `❌ User-Agent 解析失败\n\n错误信息: ${info.error || "未知错误"}`;
    }

    const lines: string[] = [
        `✅ User-Agent 解析成功`,
        ``,
    ];

    // 设备信息
    if (info.deviceBrand || info.deviceName || info.deviceModel) {
        lines.push(`📱 设备信息:`);
        if (info.deviceBrand) {
            lines.push(`   品牌: ${info.deviceBrand}`);
        }
        if (info.deviceName) {
            lines.push(`   型号: ${info.deviceName}`);
        }
        if (info.deviceModel && info.deviceModel !== info.deviceName) {
            lines.push(`   代号: ${info.deviceModel}`);
        }
        lines.push(``);
    }

    // 系统信息
    if (info.os || info.osVersion) {
        lines.push(`💻 系统信息:`);
        if (info.os) {
            lines.push(`   操作系统: ${info.os}`);
        }
        if (info.osVersion) {
            lines.push(`   系统版本: ${info.osVersion}`);
        }
        lines.push(``);
    }

    // 应用信息
    if (info.appName || info.appVersion || info.buildVersion) {
        lines.push(`📦 应用信息:`);
        if (info.appName) {
            lines.push(`   应用名称: ${info.appName}`);
        }
        if (info.appVersion) {
            lines.push(`   应用版本: ${info.appVersion}`);
        }
        if (info.buildVersion) {
            lines.push(`   Build 版本: ${info.buildVersion}`);
        }
        lines.push(``);
    }

    // 屏幕信息
    if (info.resolution || info.scale) {
        lines.push(`📺 屏幕信息:`);
        if (info.resolution) {
            const [width, height] = info.resolution.split('*');
            lines.push(`   分辨率: ${width} × ${height}`);
        }
        if (info.scale) {
            lines.push(`   缩放比例: ${info.scale}x`);
        }
        lines.push(``);
    }

    // 网络和浏览器信息
    const otherInfo: string[] = [];
    if (info.netType) {
        const netTypeName = info.netType === 'WiFi' ? 'Wi-Fi' : 
                           info.netType === 'CellNetwork' ? '蜂窝网络' : 
                           info.netType;
        otherInfo.push(`   网络类型: ${netTypeName}`);
    }
    if (info.browser) {
        otherInfo.push(`   浏览器: ${info.browser}`);
    }
    if (info.webView) {
        otherInfo.push(`   WebView: ${info.webView}`);
    }
    
    if (otherInfo.length > 0) {
        lines.push(`🌐 其他信息:`);
        lines.push(...otherInfo);
    }

    return lines.join('\n');
}

