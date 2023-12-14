from authenticator import authenticator
from queries.orders import OrderQueries
from typing import List
from fastapi import (
    APIRouter,
    Depends,
)
from models.orders import (
    OrderIn,
    OrderOut,
)

router = APIRouter()


@router.post("/orders", response_model=OrderOut)
async def create_order(
    order: OrderIn,
    queries: OrderQueries = Depends(),
    account_data: dict = Depends(authenticator.get_current_account_data),
) -> OrderOut:
    return queries.create(order, customer_username=account_data["username"])


@router.get("/orders", response_model=List[OrderOut])
def orders_list(queries: OrderQueries = Depends()):
    return queries.list_orders()


@router.get("/orders/{order_id}", response_model=OrderOut)
def get_order(order_id: str | int, queries: OrderQueries = Depends()):
    return queries.find_order(order_id)


@router.put("/orders/{order_id}", response_model=dict)
async def update_order(
    order_id: str,
    update_data: dict,
    queries: OrderQueries = Depends(),
    account_data: dict = Depends(authenticator.get_current_account_data),
):
    return queries.update(order_id, update_data)
