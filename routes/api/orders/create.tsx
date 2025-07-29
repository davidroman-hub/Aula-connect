import { Handlers, STATUS_CODE } from "$fresh/server.ts";
import { ObjectId } from "mongo/mod.ts";

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

  async PATCH(req, ctx) {
    try {
      const { id, updateFields } = await req.json();

      if (!id || !updateFields || typeof updateFields !== "object") {
        return new Response(
          JSON.stringify({ message: "Invalid request data" }),
          {
            status: STATUS_CODE.BadRequest,
            headers: { "Content-Type": "application/json" },
          },
        );
      }

      const result = await orderCollection.updateOne(
        { _id: new ObjectId(id) },
        { $set: updateFields },
      );

      if (result.matchedCount === 0) {
        return new Response(
          JSON.stringify({ message: "Order not found" }),
          {
            status: STATUS_CODE.NotFound,
            headers: { "Content-Type": "application/json" },
          },
        );
      }

      return new Response(
        JSON.stringify({ message: "Order updated successfully" }),
        {
          status: STATUS_CODE.OK,
          headers: { "Content-Type": "application/json" },
        },
      );
    } catch (error: any) {
      return new Response(
        JSON.stringify({ message: error?.message ?? "Internal Server Error" }),
        {
          status: STATUS_CODE.InternalServerError,
          headers: { "Content-Type": "application/json" },
        },
      );
    }
  },

  async DELETE(req, ctx) {
    try {
      const { id } = await req.json();

      const result = await orderCollection.deleteOne({ _id: new ObjectId(id) });
      console.log(result, "result from delete");
      if (result === 0) {
        return new Response("Order not found", {
          status: STATUS_CODE.NotFound,
        });
      }

      return new Response("Order deleted successfully", {
        status: STATUS_CODE.OK,
      });
    } catch (error: any) {
      return new Response(error?.message ?? "Internal Server Error", {
        status: STATUS_CODE.InternalServerError,
      });
    }
  },
};
