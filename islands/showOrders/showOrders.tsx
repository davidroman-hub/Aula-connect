import axiod from "https://deno.land/x/axiod@0.26.2/mod.ts";
import { useEffect, useState } from "preact/hooks";
import Modal from "../modal/index.tsx";

const ShowOrders = () => {
  const [orders, setOrders] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState([] as any);
  const [modal, setModal] = useState(false);

  const getOrders = async () => {
    try {
      const response = await axiod.get(
        `/api/orders/create`,
      );

      setOrders(response.data);
      return response;
    } catch (error) {
      console.log(error);
    }
  };

  const deleteOrder = async (_id: string) => {
    try {
      const response = await axiod.delete(
        `/api/orders/create`,
        {
          id: _id,
        },
      );

      getOrders();
      return response;
    } catch (error) {
      console.log(error);
    }
  };

  const updateOrderPrice = async (_id: string, newPrice: string) => {
    try {
      const response = await axiod.patch(
        `/api/orders/create`,
        {
          id: _id,
          updateFields: {
            totalPrice: newPrice,
            // "userDetails.name": "Updated Name",
          },
        },
      );

      getOrders();
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
                <td>
                  <button
                    class="cursor-pointer"
                    onClick={() => deleteOrder(order._id)}
                  >
                    <i class="fas fa-trash"></i>
                  </button>
                </td>
                <td>
                  <button
                    onClick={() => {
                      setModal(true);
                      setSelectedOrder(order);
                    }}
                    className="cursor-pointer px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition shadow-md"
                  >
                    <i class="fa-solid fa-pen"></i>
                  </button>

                  <Modal
                    isOpen={modal}
                    onClose={() => setModal(false)}
                  >
                    <h2 className="text-xl font-bold mb-2  text-gray-950">
                      Simple Modal
                    </h2>
                    <div>
                      <label
                        className="block text-gray-700 text-sm font-bold mb-2"
                        htmlFor="lastName"
                      >
                        Total price edit:
                      </label>
                      <input
                        className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline`}
                        id="lastName"
                        name="lastName"
                        type="number"
                        placeholder="Doe"
                        value={selectedOrder.totalPrice}
                        onChange={(e: any) =>
                          setSelectedOrder({
                            ...selectedOrder,
                            totalPrice: e.target?.value,
                          })}
                      />

                      <button
                        onClick={() =>
                          updateOrderPrice(
                            selectedOrder._id,
                            selectedOrder.totalPrice,
                          )}
                        className="mt-5 px-4 py-2 bg-cyan-800 text-white rounded hover:bg-cyan-600 cursor-pointer  transition"
                      >
                        Update price
                      </button>
                    </div>
                  </Modal>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ShowOrders;
