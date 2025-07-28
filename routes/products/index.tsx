import ShowProducts from "../../islands/ShowProducts/index.tsx";

const Products = () => {
  // const resp = await fetch("https://jsonplaceholder.typicode.com/posts", {
  //   method: "GET",

  //   body: JSON.stringify({
  //     param: "value",
  //   }),
  // });

  // async function getPost(id: number) {
  //   const response = await fetch(`https://jsonplaceholder.typicode.com/posts`, {
  //     method: "GET",
  //   });

  //   if (!response.ok) {
  //     throw new Error(`Failed to fetch post: ${response.status}`);
  //   }

  //   const data = await response.json();
  //   return data;
  // }

  // getPost()
  //   .then((post) => console.log("Post:", post))
  //   .catch((err) => console.error("Error:", err.message));

  return (
    <>
      <ShowProducts />
    </>
  );
};

export default Products;
