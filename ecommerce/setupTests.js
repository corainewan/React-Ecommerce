import "@testing-library/jest-dom";
// 运行时机：它是在每一个测试文件真正开始执行之前，被"注入"到那个测试文件专属的 jsdom 环境里去跑的。这时候 document、window、还有 vitest 的全局 expect 才真正准备好，jest-dom 的 import 才能成功地把 toBeInTheDocument() 这些方法"挂"到 expect 身上。

/*
第 1 步：你在终端打了 npx vitest
         ↓
第 2 步：Vitest 读取 vitest.config.js（纯 Node.js 环境，此时没有 window！）
         ↓
第 3 步：Vitest 看到配置里写了 environment: "jsdom"
         → 于是它去"造"一个假的浏览器环境
         → window、document 在这一刻才"诞生"！
         ↓
第 4 步：针对每一个测试文件，先执行 setupTests.js
         → 这时候 window 已经存在了，可以安心操作它
         ↓
第 5 步：最后才真正执行你的测试代码（比如 render(<Product />)）
*/
