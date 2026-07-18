import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router";
import "./index.css";
import App from "./App.jsx";
// 就是 React 的严格模式，帮你检查代码有没有问题，只在开发时有效
// 告诉 React："从这个 div 开始画页面！"，跟你之前用的 ReactDOM.createRoot 一样，只是写法不同！
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>,
);
