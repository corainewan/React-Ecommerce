import { it, expect, describe, beforeEach, vi } from "vitest";
import { render, screen } from "@testing-library/react";
// render = renders a component in a fake web page
// screen = check the content of the fake web page, like a virtual DOM
import userEvent from "@testing-library/user-event";
import axios from "axios";
import { Product } from "./Product";

vi.mock("axios"); // Mock the axios module to prevent actual API calls during testing

describe("Product component", () => {
  let product;
  let loadCartMock;
  beforeEach(() => {
    product = {
      id: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
      image: "images/products/athletic-cotton-socks-6-pairs.jpg",
      name: "Black and Gray Athletic Cotton Socks - 6 Pairs",
      rating: {
        stars: 4.5,
        count: 87,
      },
      priceCents: 1090,
      keywords: ["socks", "sports", "apparel"],
    };
    loadCartMock = vi.fn(); // mock function to simulate the loadCart function
  });

  it("display product details correctly", () => {
    render(<Product product={product} loadCart={loadCartMock} />);
    //为什么要传 loadCartMock 进去——不是为了这次测试用到它，而是未雨绸缪：万一以后测试扩展成"点击按钮"的场景，组件不会因为找不到 loadCart 而崩溃。

    expect(
      screen.getByText("Black and Gray Athletic Cotton Socks - 6 Pairs"),
    ).toBeInTheDocument();

    expect(screen.getByText("$10.90")).toBeInTheDocument();

    expect(screen.getByTestId("product-image")).toHaveAttribute(
      "src",
      "images/products/athletic-cotton-socks-6-pairs.jpg",
    );

    expect(screen.getByTestId("product-rating-stars-image")).toHaveAttribute(
      "src",
      "images/ratings/rating-45.png",
    );

    expect(screen.getByText("87")).toBeInTheDocument();
  });

  it("should call loadCart when add to cart button is clicked", async () => {
    render(<Product product={product} loadCart={loadCartMock} />);
    const addToCartButton = screen.getByTestId("added-to-cart-button");
    const user = userEvent.setup(); // 造一个"假用户"出来
    await user.click(addToCartButton);
    // 为什么要 await？因为 userEvent 内部这一整套模拟操作（hover → mousedown → mouseup → click）不是瞬间完成的，它是异步的！它会用类似 setTimeout 的机制，一步步地模拟出真实用户操作之间的时间间隔。

    expect(loadCartMock).toHaveBeenCalled();

    expect(axios.post).toHaveBeenCalledWith("/api/cart-items", {
      productId: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
      quantity: 1,
    });
  });
});
