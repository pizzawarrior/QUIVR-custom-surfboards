from fastapi import HTTPException, status
from queries.client import MongoQueries
from bson.objectid import ObjectId
from models.orders import OrderOut, OrderUpdate, OrdersOut, OrdersIn, OrderIn
# import datetime
from datetime import datetime, timezone


class OrderQueries(MongoQueries):
    collection_name = "orders"

    def create(self, orders_in: OrdersIn, customer_username: str) -> OrdersOut:
        orders = []
        for order in orders_in.orders:
            data = order.dict()
            data["customer_username"] = customer_username
            data["order_status"] = "Order received"
            data["reviewed"] = False
            now = datetime.now(timezone.utc)
            data["date"] = now.strftime("%Y-%m-%d, %H:%M")
            orders.append(data)

        result = self.collection.insert_many(orders)

        for i, oid in enumerate(result.inserted_ids):
            orders[i]["order_id"] = str(oid)

        orders_out = [OrderOut(**order) for order in orders]
        return OrdersOut(orders=orders_out)

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
