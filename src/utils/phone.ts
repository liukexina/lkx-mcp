import { PhoneInfo } from '../types/index.js';

export function formatPhoneInfo(phone: PhoneInfo): string {
    return [
        `📱 手机型号: ${phone.model}`,
        `🏢 品牌: ${phone.brand}`,
        phone.release_date ? `📅 发布日期: ${phone.release_date}` : "",
        phone.display ? `📺 屏幕: ${phone.display}` : "",
        phone.processor ? `⚙️ 处理器: ${phone.processor}` : "",
        phone.ram ? `💾 运行内存: ${phone.ram}` : "",
        phone.storage ? `💽 存储: ${phone.storage}` : "",
        phone.battery ? `🔋 电池: ${phone.battery}` : "",
        phone.camera ? `📷 相机: ${phone.camera}` : "",
        phone.os ? `🖥️ 操作系统: ${phone.os}` : "",
    ].filter(Boolean).join("\n");
}

// 手机数据库
export const phoneDatabase: Record<string, PhoneInfo> = {
    "iphone 15 pro": {
        model: "iPhone 15 Pro",
        brand: "Apple",
        release_date: "2023年9月",
        display: "6.1英寸 OLED, 120Hz ProMotion",
        processor: "A17 Pro 芯片",
        ram: "8GB",
        storage: "128GB/256GB/512GB/1TB",
        battery: "3274mAh",
        camera: "主摄4800万像素，超广角1200万像素，长焦1200万像素 (3倍光学变焦)",
        os: "iOS 17",
    },
    "iphone 15": {
        model: "iPhone 15",
        brand: "Apple",
        release_date: "2023年9月",
        display: "6.1英寸 OLED, 60Hz",
        processor: "A16 仿生芯片",
        ram: "6GB",
        storage: "128GB/256GB/512GB",
        battery: "3349mAh",
        camera: "主摄4800万像素，超广角1200万像素",
        os: "iOS 17",
    },
    "samsung galaxy s24 ultra": {
        model: "Samsung Galaxy S24 Ultra",
        brand: "Samsung",
        release_date: "2024年1月",
        display: "6.8英寸 Dynamic AMOLED 2X, 120Hz",
        processor: "骁龙 8 Gen 3",
        ram: "12GB",
        storage: "256GB/512GB/1TB",
        battery: "5000mAh",
        camera: "主摄2亿像素，超广角1200万像素，潜望式长焦5000万像素 (5倍光学变焦)",
        os: "Android 14, One UI 6.1",
    },
    "xiaomi 14 pro": {
        model: "小米 14 Pro",
        brand: "小米",
        release_date: "2023年10月",
        display: "6.73英寸 AMOLED, 120Hz",
        processor: "骁龙 8 Gen 3",
        ram: "12GB/16GB",
        storage: "256GB/512GB/1TB",
        battery: "4880mAh, 120W有线快充 + 50W无线快充",
        camera: "徕卡光学镜头，主摄5000万像素，超广角5000万像素，长焦5000万像素 (3.2倍光学变焦)",
        os: "MIUI 15 (基于 Android 14)",
    },
    "huawei mate 60 pro": {
        model: "华为 Mate 60 Pro",
        brand: "华为",
        release_date: "2023年8月",
        display: "6.82英寸 OLED, 120Hz",
        processor: "麒麟 9000S",
        ram: "12GB",
        storage: "256GB/512GB/1TB",
        battery: "5000mAh, 88W有线快充 + 50W无线快充",
        camera: "超光变摄像头，主摄5000万像素，超广角1200万像素，长焦4800万像素 (3.5倍光学变焦)",
        os: "HarmonyOS 4.0",
    },
};

