import axiod from "https://deno.land/x/axiod@0.26.2/mod.ts";
import { useEffect, useState } from "preact/hooks";

const ShowOrders = () => {
  const [orders, setOrders] = useState([]);

  const getOrders = async () => {
    try {
      const response = await axiod.get(
        `/api/orders/create`,
      );
      console.log(response.data);
      setOrders(response.data);
      return response;
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getOrders();
  }, []);

  return (
    <div class="bg-blue-900 m-10">
      <div className="overflow-x-auto">
        <table className="table">
          {/* head */}
          <thead>
            <tr>
              <th>Ordered by</th>
              <th>Articles</th>
              <th>Total</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order: any) => (
              <tr>
                <th>{order.userDetails.firstName}</th>
                <td>
                  {order.userProducts.map((p: any) => (
                    <li key={p.id}>{p.title}</li>
                  ))}
                </td>
                <td>{order.totalPrice}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ShowOrders;
