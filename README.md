# 🛠️ lkx-mcp

[![npm version](https://img.shields.io/npm/v/lkx-mcp.svg)](https://www.npmjs.com/package/lkx-mcp)
[![License](https://img.shields.io/badge/license-ISC-blue.svg)](LICENSE)

一个功能丰富的 MCP (Model Context Protocol) 服务器，提供多种实用工具，包括天气查询、GitHub 仓库分析、手机信息查询、身份证解析和 User-Agent 解析等功能。

## ✨ 特性

- 🌤️ **天气警报查询** - 获取美国各州的实时天气警报
- 🔍 **GitHub 仓库信息** - 查询任何 GitHub 仓库的详细统计信息
- 📱 **手机型号查询** - 查询主流手机型号的详细参数
- 🆔 **身份证号解析** - 解析中国身份证号码，获取地区、年龄、性别等信息
- 🌐 **User-Agent 解析** - 解析浏览器 UA 字符串，识别设备型号和系统版本

## 📦 安装

```bash
# 克隆仓库
git clone https://github.com/liukexina/lkx-mcp.git

# 进入项目目录
cd lkx-mcp

# 安装依赖
pnpm install

# 编译项目
pnpm build
```

## 🚀 使用

### 配置 MCP 服务器

在 Cursor 的 MCP 配置文件中添加：

**macOS/Linux**: `~/.cursor/mcp.json`  
**Windows**: `%APPDATA%\Cursor\mcp.json`

```json
{
  "mcpServers": {
    "lkx-mcp": {
      "command": "node",
      "args": ["/path/to/lkx-mcp/build/index.js"]
    }
  }
}
```

### 重启 Cursor

配置完成后重启 Cursor，工具即可使用。

## 📚 工具列表

### 1. 🌤️ 天气警报查询

**工具名称**: `get_lkx_falerts`

查询美国各州的天气警报信息。

**示例**：
```
查询加利福尼亚州的天气警报
```

**参数**：
- `state`: 两字母州代码（如 CA、NY、TX）

---

### 2. 🔍 GitHub 仓库信息查询

**工具名称**: `get_github_repo_info`

获取 GitHub 仓库的详细信息，包括星标数、fork数、语言、更新时间等。

**示例**：
```
查询 microsoft/vscode 仓库的信息
```

**参数**：
- `owner`: 仓库所有者/组织名
- `repo`: 仓库名称

**返回信息**：
- ⭐ Stars、🍴 Forks、👀 Watchers
- 💻 主要语言、📜 许可证
- 📅 创建时间、🔄 最后更新时间
- 🏷️ 标签（Topics）

---

### 3. 📱 手机型号查询

**工具名称**: `get_phone_info`

查询手机型号的详细参数信息。

**示例**：
```
查询 iPhone 15 Pro 的参数
```

**参数**：
- `model`: 手机型号名称

**支持的型号**：
- iPhone 15 Pro / iPhone 15 / iPhone 15 Plus
- Samsung Galaxy S24 Ultra
- 小米 14 Pro
- 华为 Mate 60 Pro

**返回信息**：
- 📱 品牌和型号
- 📅 发布日期
- 📺 屏幕参数
- ⚙️ 处理器
- 💾 内存和存储
- 🔋 电池容量
- 📷 相机配置
- 🖥️ 操作系统

---

### 4. 🆔 身份证号解析

**工具名称**: `parse_id_card`

解析中国18位身份证号码，提取地区、出生日期、性别等信息，并验证合法性。

**示例**：
```
解析身份证号：110101199003078515
```

**参数**：
- `idCard`: 18位身份证号码

**功能特性**：
- ✅ 校验码验证（国家标准算法）
- 📍 地区识别（全国所有省份）
- 🎂 出生日期解析
- 👤 性别识别
- 📅 年龄计算
- 🔒 隐私保护（日志脱敏）

**返回信息**：
- 🆔 身份证号码
- 📍 所属地区（省份）
- 🎂 出生日期
- 👤 性别
- 📅 年龄

---

### 5. 🌐 User-Agent 解析

**工具名称**: `parse_user_agent`

解析浏览器 User-Agent 字符串，提取设备型号、系统版本、应用信息等。

**示例**：
```
解析这个 UA: Mozilla/5.0 (iPhone; CPU iPhone OS 18_3_2 like Mac OS X)...
```

**参数**：
- `userAgent`: User-Agent 字符串

**支持识别**：
- 📱 iPhone 型号识别（iPhone 11 ~ iPhone 15 系列）
- 💻 iOS/Android 系统版本
- 📱 设备品牌（Apple、Samsung、Xiaomi 等）
- 📺 屏幕分辨率和缩放比例
- 🌐 网络类型（Wi-Fi、蜂窝网络）
- 📦 应用信息（名称、版本、Build 号）

**返回信息**：
- 📱 设备品牌、型号、代号
- 💻 操作系统和版本
- 📦 应用名称和版本
- 📺 屏幕分辨率和缩放比例
- 🌐 网络类型和浏览器信息

## 🏗️ 项目结构

```
src/
├── index.ts                 # 主入口文件
├── service.ts              # MCP 服务器创建
│
├── types/                  # 📦 类型定义层
│   ├── index.ts           # 统一导出
│   ├── weather.ts         # 天气相关类型
│   ├── github.ts          # GitHub 相关类型
│   ├── phone.ts           # 手机相关类型
│   ├── idCard.ts          # 身份证相关类型
│   └── userAgent.ts       # User-Agent 相关类型
│
├── utils/                  # 🛠️ 工具函数层
│   ├── index.ts           # 统一导出
│   ├── weather.ts         # 天气数据处理
│   ├── github.ts          # GitHub 数据格式化
│   ├── phone.ts           # 手机数据库和格式化
│   ├── idCard.ts          # 身份证解析和校验
│   └── userAgent.ts       # User-Agent 解析
│
└── tools/                  # 🔧 MCP 工具层
    ├── index.ts           # 工具注册入口
    ├── weather.ts         # 天气警报工具
    ├── github.ts          # GitHub 仓库查询工具
    ├── phone.ts           # 手机型号查询工具
    ├── idCard.ts          # 身份证解析工具
    └── userAgent.ts       # User-Agent 解析工具
```

### 架构特点

- **清晰的分层架构** - Types、Utils、Tools 三层分离
- **模块化设计** - 每个功能独立文件，便于维护
- **易于扩展** - 添加新工具只需创建对应的三个文件
- **统一导出** - 通过 index.ts 统一管理导出

## 🔧 开发

```bash
# 安装依赖
pnpm install

# 开发模式（监听文件变化）
pnpm build --watch

# 编译
pnpm build

# 测试
pnpm test
```

## 📝 添加新工具

按照模块化结构，添加新工具只需三步：

1. **创建类型定义** - `src/types/newTool.ts`
2. **创建工具函数** - `src/utils/newTool.ts`
3. **创建工具注册** - `src/tools/newTool.ts`
4. **注册工具** - 在 `src/tools/index.ts` 中导入并注册

## 🤝 贡献

欢迎提交 Issue 和 Pull Request！

## 📄 许可证

ISC License

## 👤 作者

**liukexin** - [liukexin@xiaohongshu.com](mailto:liukexin@xiaohongshu.com)

## 🔗 相关链接

- [GitHub 仓库](https://github.com/liukexina/lkx-mcp)
- [MCP 官方文档](https://modelcontextprotocol.io/)
- [Cursor 官网](https://cursor.sh/)

---

⭐ 如果这个项目对你有帮助，请给一个 Star！

