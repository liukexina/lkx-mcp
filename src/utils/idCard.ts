import { IdCardInfo } from '../types/index.js';

// 省份代码映射表
const provinceMap: Record<string, string> = {
    "11": "北京市", "12": "天津市", "13": "河北省", "14": "山西省", "15": "内蒙古自治区",
    "21": "辽宁省", "22": "吉林省", "23": "黑龙江省",
    "31": "上海市", "32": "江苏省", "33": "浙江省", "34": "安徽省", "35": "福建省", "36": "江西省", "37": "山东省",
    "41": "河南省", "42": "湖北省", "43": "湖南省", "44": "广东省", "45": "广西壮族自治区", "46": "海南省",
    "50": "重庆市", "51": "四川省", "52": "贵州省", "53": "云南省", "54": "西藏自治区",
    "61": "陕西省", "62": "甘肃省", "63": "青海省", "64": "宁夏回族自治区", "65": "新疆维吾尔自治区",
    "71": "台湾省", "81": "香港特别行政区", "82": "澳门特别行政区"
};

// 校验身份证号码
function validateIdCard(idCard: string): boolean {
    if (!/^\d{17}[\dXx]$/.test(idCard)) {
        return false;
    }

    // 权重因子
    const weights = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2];
    // 校验码对照表
    const checkCodes = ['1', '0', 'X', '9', '8', '7', '6', '5', '4', '3', '2'];

    let sum = 0;
    for (let i = 0; i < 17; i++) {
        sum += parseInt(idCard[i]) * weights[i];
    }

    const checkCode = checkCodes[sum % 11];
    return checkCode === idCard[17].toUpperCase();
}

// 解析身份证号码
export function parseIdCard(idCard: string): IdCardInfo {
    // 去除空格并转大写
    const cleanIdCard = idCard.replace(/\s+/g, '').toUpperCase();

    // 验证格式
    if (!/^\d{17}[\dXx]$/.test(cleanIdCard)) {
        return {
            valid: false,
            idCard: cleanIdCard,
            error: "身份证号码格式错误，应为18位数字，最后一位可以是X"
        };
    }

    // 验证校验码
    if (!validateIdCard(cleanIdCard)) {
        return {
            valid: false,
            idCard: cleanIdCard,
            error: "身份证号码校验码错误"
        };
    }

    // 解析地区
    const provinceCode = cleanIdCard.substring(0, 2);
    const province = provinceMap[provinceCode];

    if (!province) {
        return {
            valid: false,
            idCard: cleanIdCard,
            error: "无效的省份代码"
        };
    }

    // 解析出生日期
    const year = cleanIdCard.substring(6, 10);
    const month = cleanIdCard.substring(10, 12);
    const day = cleanIdCard.substring(12, 14);
    const birthday = `${year}-${month}-${day}`;

    // 验证日期有效性
    const birthDate = new Date(birthday);
    if (isNaN(birthDate.getTime())) {
        return {
            valid: false,
            idCard: cleanIdCard,
            error: "无效的出生日期"
        };
    }

    // 计算年龄
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
        age--;
    }

    // 判断性别（第17位，奇数为男，偶数为女）
    const genderCode = parseInt(cleanIdCard[16]);
    const gender = genderCode % 2 === 1 ? "男" : "女";

    return {
        valid: true,
        idCard: cleanIdCard,
        province,
        birthday,
        age,
        gender
    };
}

export function formatIdCardInfo(info: IdCardInfo): string {
    if (!info.valid) {
        return `❌ 身份证号码无效\n\n错误信息: ${info.error || "未知错误"}`;
    }

    return [
        `✅ 身份证号码有效`,
        `🆔 身份证号: ${info.idCard}`,
        `📍 地区: ${info.province}${info.city ? ' > ' + info.city : ''}${info.district ? ' > ' + info.district : ''}`,
        `🎂 出生日期: ${info.birthday}`,
        `👤 性别: ${info.gender}`,
        `📅 年龄: ${info.age}岁`,
    ].join("\n");
}

