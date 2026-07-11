import { it, expect, describe, vi } from "vitest";
import { render, screen } from "@testing-library/react";
// render = renders a component in a fake web page
// screen = check the content of the fake web page, like a virtual DOM
import userEvent from "@testing-library/user-event";
import axios from "axios";
import { Product } from "./Product";

vi.mock("axios"); // Mock the axios module to prevent actual API calls during testing

describe("Product component", () => {
  it("display product details correctly", () => {
    const product = {
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

    const loadCartMock = vi.fn(); // mock function to simulate the loadCart function

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
    const product = {
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

    const loadCartMock = vi.fn();
    render(<Product product={product} loadCart={loadCartMock} />);

    const addToCartButton = screen.getByTestId("added-to-cart-button");
    const user = userEvent.setup();
    await user.click(addToCartButton);

    expect(loadCartMock).toHaveBeenCalled();

    expect(axios.post).toHaveBeenCalledWith("/api/cart-items", {
      productId: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
      quantity: 1,
    });
  });
});
