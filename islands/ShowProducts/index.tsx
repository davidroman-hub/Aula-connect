import axiod from "https://deno.land/x/axiod/mod.ts";
import { Dispatch, StateUpdater, useEffect, useState } from "preact/hooks";

export type CardCart = {
  albumId: number;
  id: number;
  thumbnailUrl: string;
  title: string;
  url: string;
  category: number;
  price: string;
};

const ShowProducts = () => {
  const [products, setProducts] = useState([] as CardCart[]);
  const [error, setError] = useState("");

  const getProducts = async () => {
    try {
      const response = await axiod.get(
        `https://jsonplaceholder.typicode.com/photos`,
      );
      const newDataObject = response.data.map((obj: CardCart) => ({
        ...obj,
        price: (Math.random() * 100).toFixed(2),
        category: "Category " + (Math.floor(Math.random() * 5) + 1),
      }));
      setProducts(newDataObject);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getProducts();
  }, []);

  const handleBuyNow = (selectedProduct: CardCart) => {
    const existingProduct = JSON.parse(
      localStorage.getItem("cartProducts") || "[]",
    );

    const isProductAdded = existingProduct.find((p: CardCart) =>
      p.id === selectedProduct.id
    );

    if (isProductAdded) {
      alert("Product already added in the cart!");
    } else {
      const newProduct = [...existingProduct, selectedProduct];
      localStorage.setItem("cartProducts", JSON.stringify(newProduct));
      alert("Product added sucessfully in the cart now...");
    }
  };

  return (
    <>
      <div class="flex gap-3 items-center justify-center flex-wrap">
        {products && products.slice(0, 20).map((product: CardCart) => {
          return (
            <div
              key={product.id}
              className="card bg-base-100 w-96 shadow-sm my-12 mx-4"
            >
              <figure>
                <img
                  src={"https://i.pinimg.com/736x/19/db/31/19db31732931019b73bedcf17924f814.jpg"}
                  alt="Shoes"
                  width={200}
                  height={200}
                />
              </figure>
              <div className="card-body">
                <h2 className="card-title">
                  {product.title}
                  <div className="badge badge-secondary">NEW</div>
                </h2>
                <p>
                  {`$ ${product.price}`}
                </p>
                <div className="card-actions justify-end">
                  <div className="badge badge-outline">{product.category}</div>
                </div>
                <div className="card-actions justify-end mt-4">
                  <button
                    onClick={() => handleBuyNow(product)}
                    className="btn btn-primary"
                  >
                    Buy Now
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default ShowProducts;
