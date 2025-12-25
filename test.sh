#!/bin/bash

# 测试 MCP 服务器是否能正常启动
echo "🧪 测试 lkx-mcp 服务器..."
echo ""

# 设置测试超时时间
timeout 5s node /Users/lkx/Documents/test-code/lkx-mcp/build/index.js &

# 等待服务器启动
sleep 2

# 检查进程是否在运行
if pgrep -f "node.*lkx-mcp" > /dev/null; then
    echo "✅ MCP 服务器启动成功！"
    echo ""
    echo "服务器正在运行，按 Ctrl+C 停止..."
    wait
else
    echo "❌ MCP 服务器启动失败"
    echo ""
    echo "请检查："
    echo "1. 代码是否已编译（运行 pnpm build）"
    echo "2. 依赖是否已安装（运行 pnpm install）"
    echo "3. 查看错误日志"
fi

