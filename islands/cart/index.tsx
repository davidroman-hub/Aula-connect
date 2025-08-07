import { useEffect, useState } from "preact/hooks";
import { CardCart } from "../ShowProducts/index.tsx";

const CartItems = () => {
  const [cartProducts, setCartProducts] = useState([]);

  /// el use Effect se dispacha cada 2 segundos
  useEffect(() => {
    const intervalId = setInterval(() => {
      const cartProducts = JSON.parse(
        localStorage.getItem("cartProducts") || "[]",
      );
      setCartProducts(cartProducts);
    }, 2000);
    return () => clearInterval(intervalId);
  }, []);

  const sumTotal = cartProducts.map((p: CardCart) => parseFloat(p.price));
  let sum = 0;
  sumTotal.forEach((el) => sum += el);

  const deleteItem = (productId: any) => {
    const updateCartProduct = cartProducts.filter((p: CardCart) =>
      p.id !== productId
    );
    setCartProducts(updateCartProduct);
    localStorage.setItem("cartProducts", JSON.stringify(updateCartProduct));
  };

  return (
    <>
      {cartProducts && cartProducts.length > 0 &&
        cartProducts.map((product: CardCart) => {
          return (
            <div className="p-4  bg-gray-200 mb-5 flex gap-4 relative ">
              <div className="w-14 h-24 bg-gray-200 rounded-lg overflow-hidden flex-shrink-0">
                <img
                  src="https://images.unsplash.com/photo-1546868871-7041f2a55e12?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80"
                  alt="Wireless Headphones"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex-grow">
                <h3 className="font-semibold text-gray-800">
                  {product.title}
                </h3>
                <p className="text-gray-600 text-sm mt-1">{product.category}</p>
                <div className="flex items-center justify-between mt-2">
                  <div className="flex items-center border border-gray-300 rounded-md overflow-hidden">
                    <button className="quantity-btn px-3 py-1 text-gray-600" //onclick="updateQuantity('item1', -1)"
                    >
                      <i className="fas fa-minus"></i>
                    </button>
                    <span
                      id="item1-quantity"
                      className="px-3 py-1 text-center w-8"
                    >
                      1
                    </span>
                    <button className="quantity-btn px-3 py-1 text-gray-600" //onclick="updateQuantity('item1', 1)"
                    >
                      <i className="fas fa-plus"></i>
                    </button>
                  </div>
                  <span className="font-bold text-indigo-600">
                    {`$ ${product.price}`}
                  </span>
                </div>
              </div>
              <button className="" onClick={() => deleteItem(product.id)}>
                <i className="fas fa-trash"></i>
              </button>
            </div>
          );
        })}

      {/* <!-- Cart Summary --> */}
      <div className="border-t border-gray-200 p-4">
        <div className="flex justify-between mb-2">
          <span className="text-gray-600">Subtotal:</span>
          <span className="font-semibold" id="subtotal">
            {sum}
          </span>
        </div>
        <div className="flex justify-between mb-4">
          <span className="text-gray-600">Shipping:</span>
          <span className="font-semibold">Free</span>
        </div>
        <div className="flex justify-between text-lg font-bold">
          <span>Total:</span>
          <span className="text-indigo-600" id="total">
            {sum}
          </span>
        </div>
        <div className="mt-4 text-center text-sm text-gray-500">
          <a
            href="/checkout"
            className="w-full mt-10 bg-indigo-600 hover:bg-indigo-700 text-white py-3 px-4 rounded-lg font-medium transition duration-200"
          >
            Proceed to Checkout
          </a>
        </div>
        <div className="mt-4 text-center text-sm text-gray-500">
          <p>
            or{" "}
            <a href="#" className="text-indigo-600 hover:underline">
              continue shopping
            </a>
          </p>
        </div>
      </div>
    </>
  );
};

export default CartItems;
