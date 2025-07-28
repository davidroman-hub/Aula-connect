import { Handlers, STATUS_CODE } from "$fresh/server.ts";
import { db } from "../../../lib/mongo.ts";

const orderCollection = db.collection("orders");

export const handler: Handlers = {
  async POST(req, ctx) {
    try {
      const {
        userDetails,
        userProducts,
        totalOrderCount,
        totalPrice,
      } = await req.json();

      await orderCollection.insertOne({
        userDetails,
        userProducts,
        totalOrderCount,
        totalPrice,
      });

      return new Response(null, {
        status: STATUS_CODE.Created,
        statusText: "Order Created",
      });
    } catch (error: any) {
      return new Response(error, {
        status: STATUS_CODE.InternalServerError,
      });
    }
  },

  async GET(req, ctx) {
    try {
      const orders = await orderCollection.find({}).toArray();

      return new Response(JSON.stringify(orders), {
        status: STATUS_CODE.OK,
        headers: {
          "Content-Type": "application/json",
        },
      });
    } catch (error: any) {
      return new Response(error?.message ?? "Internal Server Error", {
        status: STATUS_CODE.InternalServerError,
      });
    }
  },
};
