const CartItems = () => {
  return (
    <>
      <div class="p-4  bg-gray-200 mb-5 flex gap-4 relative ">
        <div class="w-14 h-24 bg-gray-200 rounded-lg overflow-hidden flex-shrink-0">
          <img
            src="https://images.unsplash.com/photo-1546868871-7041f2a55e12?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80"
            alt="Wireless Headphones"
            class="w-full h-full object-cover"
          />
        </div>
        <div class="flex-grow">
          <h3 class="font-semibold text-gray-800">Wireless Headphones Pro</h3>
          <p class="text-gray-600 text-sm mt-1">Color: Black</p>
          <div class="flex items-center justify-between mt-2">
            <div class="flex items-center border border-gray-300 rounded-md overflow-hidden">
              <button
                class="quantity-btn px-3 py-1 text-gray-600"
                //onclick="updateQuantity('item1', -1)"
              >
                <i class="fas fa-minus"></i>
              </button>
              <span id="item1-quantity" class="px-3 py-1 text-center w-8">
                1
              </span>
              <button
                class="quantity-btn px-3 py-1 text-gray-600"
                //onclick="updateQuantity('item1', 1)"
              >
                <i class="fas fa-plus"></i>
              </button>
            </div>
            <span class="font-bold text-indigo-600">$129.99</span>
          </div>
        </div>
        <button
          class=""
          //onclick="removeItem('item1')"
        >
          <i class="fas fa-trash"></i>
        </button>
      </div>

      {/* <!-- Cart Summary --> */}
      <div class="border-t border-gray-200 p-4">
        <div class="flex justify-between mb-2">
          <span class="text-gray-600">Subtotal:</span>
          <span class="font-semibold" id="subtotal">
            $519.96
          </span>
        </div>
        <div class="flex justify-between mb-4">
          <span class="text-gray-600">Shipping:</span>
          <span class="font-semibold">Free</span>
        </div>
        <div class="flex justify-between text-lg font-bold">
          <span>Total:</span>
          <span class="text-indigo-600" id="total">
            $519.96
          </span>
        </div>

        <button class="w-full mt-6 bg-indigo-600 hover:bg-indigo-700 text-white py-3 px-4 rounded-lg font-medium transition duration-200">
          Proceed to Checkout
        </button>

        <div class="mt-4 text-center text-sm text-gray-500">
          <p>
            or{" "}
            <a href="#" class="text-indigo-600 hover:underline">
              continue shopping
            </a>
          </p>
        </div>
      </div>
    </>
  );
};

export default CartItems;
