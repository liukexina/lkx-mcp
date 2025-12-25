#!/usr/bin/env node

/**
 * 本地验证脚本
 * 测试各个工具函数是否正常工作
 */

import { parseIdCard, formatIdCardInfo } from './build/utils/idCard.js';
import { parseUserAgent, formatUserAgentInfo } from './build/utils/userAgent.js';
import { formatGitHubRepo } from './build/utils/github.js';
import { formatPhoneInfo, phoneDatabase } from './build/utils/phone.js';

console.log('🧪 开始验证 lkx-mcp 工具...\n');

let passCount = 0;
let failCount = 0;

// 测试 1: 身份证解析
console.log('📝 测试 1: 身份证解析');
try {
    const idCardResult = parseIdCard('110101199003078515');
    console.log(formatIdCardInfo(idCardResult));
    if (idCardResult.valid && idCardResult.province === '北京市') {
        console.log('✅ 测试通过\n');
        passCount++;
    } else {
        console.log('❌ 测试失败：解析结果不正确\n');
        failCount++;
    }
} catch (error) {
    console.log('❌ 测试失败:', error.message, '\n');
    failCount++;
}

// 测试 2: User-Agent 解析
console.log('📝 测试 2: User-Agent 解析');
try {
    const ua = 'Mozilla/5.0 (iPhone; CPU iPhone OS 18_3_2 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148 discover/9.1 Device/(Apple Inc.;iPhone15,3) NetType/WiFi';
    const uaResult = parseUserAgent(ua);
    console.log(formatUserAgentInfo(uaResult));
    if (uaResult.valid && uaResult.os === 'iOS' && uaResult.osVersion === '18.3.2') {
        console.log('✅ 测试通过\n');
        passCount++;
    } else {
        console.log('❌ 测试失败：解析结果不正确\n');
        failCount++;
    }
} catch (error) {
    console.log('❌ 测试失败:', error.message, '\n');
    failCount++;
}

// 测试 3: 手机信息格式化
console.log('📝 测试 3: 手机信息查询');
try {
    const phoneInfo = phoneDatabase['iphone 15 pro'];
    if (phoneInfo) {
        const formatted = formatPhoneInfo(phoneInfo);
        console.log(formatted);
        console.log('✅ 测试通过\n');
        passCount++;
    } else {
        console.log('❌ 测试失败：未找到手机信息\n');
        failCount++;
    }
} catch (error) {
    console.log('❌ 测试失败:', error.message, '\n');
    failCount++;
}

// 测试 4: GitHub 信息格式化
console.log('📝 测试 4: GitHub 仓库格式化');
try {
    const mockRepo = {
        name: 'test-repo',
        full_name: 'test/test-repo',
        description: 'A test repository',
        html_url: 'https://github.com/test/test-repo',
        stargazers_count: 1000,
        forks_count: 100,
        watchers_count: 1000,
        open_issues_count: 10,
        language: 'JavaScript',
        created_at: '2024-01-01T00:00:00Z',
        updated_at: '2024-12-25T00:00:00Z',
        pushed_at: '2024-12-25T00:00:00Z',
        license: { name: 'MIT License' },
        topics: ['test', 'demo']
    };
    const formatted = formatGitHubRepo(mockRepo);
    console.log(formatted);
    console.log('✅ 测试通过\n');
    passCount++;
} catch (error) {
    console.log('❌ 测试失败:', error.message, '\n');
    failCount++;
}

// 测试总结
console.log('=' .repeat(50));
console.log('📊 测试结果汇总:');
console.log(`✅ 通过: ${passCount}`);
console.log(`❌ 失败: ${failCount}`);
console.log(`📝 总计: ${passCount + failCount}`);
console.log('=' .repeat(50));

if (failCount === 0) {
    console.log('\n🎉 所有测试通过！代码功能正常！');
    process.exit(0);
} else {
    console.log('\n⚠️  部分测试失败，请检查代码！');
    process.exit(1);
}

