import { it, expect, describe, beforeEach, vi } from "vitest";
import { render, screen, within } from "@testing-library/react";
// within = 在某个元素的范围内查找子元素
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router"; // MemoryRouter 是一个"假路由器"，它不会真的去改变浏览器地址栏的 URL，而是"假装"有一个路由器在运行，让你可以在测试环境里渲染出 <Link>、<NavLink>、<Route> 这些组件。
import axios from "axios";
import { HomePage } from "./HomePage";

vi.mock("axios");

describe("HomePage component", () => {
  let loadCartMock;
  beforeEach(() => {
    loadCartMock = vi.fn();
    axios.get.mockImplementation((url) => {
      if (url === "/api/products") {
        return {
          data: [
            {
              id: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
              image: "images/products/athletic-cotton-socks-6-pairs.jpg",
              name: "Black and Gray Athletic Cotton Socks - 6 Pairs",
              rating: {
                stars: 4.5,
                count: 87,
              },
              priceCents: 1090,
              keywords: ["socks", "sports", "apparel"],
            },
            {
              id: "15b6fc6f-327a-4ec4-896f-486349e85a3d",
              image: "images/products/intermediate-composite-basketball.jpg",
              name: "Intermediate Size Basketball",
              rating: {
                stars: 4,
                count: 127,
              },
              priceCents: 2095,
              keywords: ["sports", "basketballs"],
            },
          ],
        };
      }
    });
  });
  it("display products correctly", async () => {
    render(
      <MemoryRouter>
        <HomePage cart={[]} loadCart={loadCartMock} />
      </MemoryRouter>,
    );
    const productContainers = await screen.findAllByTestId("product-container");
    expect(productContainers.length).toBe(2);

    // 只测内容存不存在，不管顺序
    expect(
      within(productContainers[0]).getByText(
        "Black and Gray Athletic Cotton Socks - 6 Pairs",
      ),
    ).toBeInTheDocument();
    expect(
      within(productContainers[1]).getByText("Intermediate Size Basketball"),
    ).toBeInTheDocument();

    const productNames = productContainers.map(
      (container) => within(container).getByTestId("product-name").textContent,
    ); // 直接检查每个容器里"第一段文字"是什么，用来验证顺序

    expect(productNames).toEqual([
      "Black and Gray Athletic Cotton Socks - 6 Pairs",
      "Intermediate Size Basketball",
    ]); // 如果顺序错了，这里的错误信息会直接显示两个数组不一样！
  });
});
