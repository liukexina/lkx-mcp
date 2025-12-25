export interface UserAgentInfo {
    valid: boolean;
    rawUserAgent: string;
    
    // 设备信息
    deviceBrand?: string;        // 设备品牌 (Apple Inc., Samsung, etc.)
    deviceModel?: string;        // 设备型号代码 (iPhone15,3)
    deviceName?: string;         // 设备商业名称 (iPhone 15 Pro)
    
    // 系统信息
    os?: string;                 // 操作系统 (iOS, Android)
    osVersion?: string;          // 系统版本 (18.3.2)
    
    // 浏览器/应用信息
    browser?: string;            // 浏览器类型
    appName?: string;            // 应用名称 (discover, 小红书)
    appVersion?: string;         // 应用版本
    buildVersion?: string;       // Build 版本号
    
    // 屏幕信息
    resolution?: string;         // 屏幕分辨率 (1290*2796)
    scale?: string;              // 屏幕缩放比例 (3.00)
    
    // 网络信息
    netType?: string;            // 网络类型 (WiFi, CellNetwork)
    
    // 其他
    webView?: string;            // WebView 类型
    
    error?: string;              // 错误信息
}

// iPhone 型号映射表（基于实际设备标识符）
export const iPhoneModelMap: Record<string, string> = {
    // iPhone 15 系列
    "iPhone15,4": "iPhone 15",
    "iPhone15,5": "iPhone 15 Plus",
    "iPhone16,1": "iPhone 15 Pro",
    "iPhone16,2": "iPhone 15 Pro Max",
    
    // iPhone 14 系列
    "iPhone14,7": "iPhone 14",
    "iPhone14,8": "iPhone 14 Plus",
    "iPhone15,2": "iPhone 14 Pro",
    "iPhone15,3": "iPhone 14 Pro Max",
    
    // iPhone 13 系列
    "iPhone14,5": "iPhone 13",
    "iPhone14,4": "iPhone 13 mini",
    "iPhone14,2": "iPhone 13 Pro",
    "iPhone14,3": "iPhone 13 Pro Max",
    
    // iPhone 12 系列
    "iPhone13,2": "iPhone 12",
    "iPhone13,1": "iPhone 12 mini",
    "iPhone13,3": "iPhone 12 Pro",
    "iPhone13,4": "iPhone 12 Pro Max",
    
    // iPhone 11 系列
    "iPhone12,1": "iPhone 11",
    "iPhone12,3": "iPhone 11 Pro",
    "iPhone12,5": "iPhone 11 Pro Max",
    
    // iPhone XS/XR 系列
    "iPhone11,2": "iPhone XS",
    "iPhone11,4": "iPhone XS Max (Global)",
    "iPhone11,6": "iPhone XS Max (China)",
    "iPhone11,8": "iPhone XR",
    
    // iPhone SE 系列
    "iPhone14,6": "iPhone SE (3rd generation)",
    "iPhone12,8": "iPhone SE (2nd generation)",
};

