import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";
//运行时机：它是在 Vitest 启动阶段，用 Node.js 直接执行一次，目的只是读取配置、生成一份设定表。跑完这一次之后，它的使命就结束了，不会再参与任何测试。而且这时候每个测试文件专属的 jsdom 环境根本还没被创建出来！
// https://vitest.dev/config/
export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: "./setupTests.js",
  },
});
