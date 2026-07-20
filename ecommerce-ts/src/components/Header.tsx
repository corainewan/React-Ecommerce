import { Link } from "react-router";
import "./header.css";

// type 这个关键字，是在给一坨类型定义取一个名字，之后哪里需要用到这个类型，就直接写 HeaderProps 代替，不用每次都重新把整坨物件结构写一遍。
type HeaderProps = {
  cart: {
    productId: string;
    quantity: number;
    deliveryOption: string;
  }[]; //{...} 定义"物件长什么样"，{...}[] 就是"很多个长这样的物件，放在一个数组里"
};

export function Header({ cart }: HeaderProps) {
  let totalQuantity = 0;

  cart.forEach((cartItem) => {
    totalQuantity += cartItem.quantity;
  });

  return (
    <div className="header">
      <div className="left-section">
        <Link to="/" className="header-link">
          <img className="logo" src="images/logo-white.png" />
          <img className="mobile-logo" src="images/mobile-logo-white.png" />
        </Link>
      </div>

      <div className="middle-section">
        <input className="search-bar" type="text" placeholder="Search" />

        <button className="search-button">
          <img className="search-icon" src="images/icons/search-icon.png" />
        </button>
      </div>

      <div className="right-section">
        <Link to="/orders" className="orders-link header-link">
          <span className="orders-text">Orders</span>
        </Link>

        <Link to="/checkout" className="cart-link header-link">
          <img className="cart-icon" src="images/icons/cart-icon.png" />
          <div className="cart-quantity">{totalQuantity}</div>
          <div className="cart-text">Cart</div>
        </Link>
      </div>
    </div>
  );
}
