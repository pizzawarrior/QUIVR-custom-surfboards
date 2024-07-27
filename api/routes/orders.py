from fastapi import (APIRouter, Depends)
from typing import List
from authenticator import authenticator
from queries.orders import OrderQueries
from models.orders import OrderOut, OrderIn


router = APIRouter()


@router.post("/orders", response_model=List[OrderOut])
def create_order(
    orders_in: List[OrderIn],
    queries: OrderQueries = Depends(),
    account_data: dict = Depends(authenticator.get_current_account_data),
):
    return queries.create(orders_in, customer_username=account_data["username"])


@router.get("/orders/{order_id}", response_model=OrderOut)
def get_order(order_id: str, queries: OrderQueries = Depends()):
    return queries.find_order(order_id)


@router.get("/orders", response_model=List[OrderOut])
def orders_list(queries: OrderQueries = Depends()):
    return queries.list_orders()


@router.put("/orders/{order_id}", response_model=dict)
def update_order(
    order_id: str,
    update_data: dict,
    queries: OrderQueries = Depends(),
):
    return queries.update(order_id, update_data)
