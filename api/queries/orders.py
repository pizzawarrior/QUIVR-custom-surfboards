from fastapi import HTTPException, status
from queries.client import MongoQueries
from bson.objectid import ObjectId
from models.orders import OrderIn, OrderOut, OrderUpdate  # OrdersOut, OrdersIn

# from typing import List

import datetime


class OrderQueries(MongoQueries):
    collection_name = "orders"

    def create(self, order: OrderIn, customer_username: str) -> OrderOut:
        data = order.dict()
        data["customer_username"] = customer_username
        data["order_status"] = "Order received"
        data["reviewed"] = False
        now = datetime.datetime.utcnow()
        data["date"] = now.strftime("%Y-%m-%d, %H:%M")
        self.collection.insert_one(data)
        data["order_id"] = str(data["_id"])
        return OrderOut(**data)

    # def create(
    # self,
    # orders: List(OrdersIn),
    # customer_username: str) -> OrdersOut:
    #     result = []
    #     for order in orders:
    #         order = order.dict()
    #         order["customer_username"] = customer_username
    #         order["order_status"] = "Order received"
    #         order["reviewed"] = False
    #         now = datetime.datetime.utcnow()
    #         order["date"] = now.strftime("%Y-%m-%d, %H:%M")
    #         result.append(order)
    #     self.collection.insert_many(result)
    #     order["order_id"] = str(order["_id"])
    #     return OrdersOut(**order)

    def list_orders(self) -> OrderOut:
        orders = []
        for item in self.collection.find():
            item["order_id"] = str(item["_id"])
            orders.append(item)
        return orders

    def find_order(self, order_id: str) -> OrderOut:
        order = self.collection.find_one({"_id": ObjectId(order_id)})
        if order:
            order["order_id"] = str(order["_id"])
            return order
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Order with ID {order_id} not found",
        )

    def update(self, order_id: str, update_data: dict) -> OrderUpdate:
        filter_query = {"_id": ObjectId(order_id)}
        update_query = {"$set": update_data}
        order = self.collection.update_one(filter_query, update_query)
        if order.matched_count == 0:
            raise HTTPException(
                status_code=404, detail="Order ID {order_id} not found"
            )
        return {"message": "Order updated successfully", "order_id": order_id}
