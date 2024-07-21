from authenticator import authenticator
from queries.orders import OrderQueries
from fastapi import (APIRouter, Depends)
from models.orders import (
    OrdersIn,
    OrderOut,
    OrdersOut,
)

router = APIRouter()


@router.post("/orders", response_model=OrdersOut)
async def create_order(
    orders_in: OrdersIn,
    queries: OrderQueries = Depends(),
    account_data: dict = Depends(authenticator.get_current_account_data),
) -> OrdersOut:
    return queries.create(orders_in, customer_username=account_data["username"])


@router.get("/orders/{order_id}", response_model=OrderOut)
def get_order(order_id: str | int, queries: OrderQueries = Depends()):
    return queries.find_order(order_id)


@router.get("/orders", response_model=OrdersOut)
def orders_list(queries: OrderQueries = Depends()):
    return {"orders": queries.list_orders()}


@router.put("/orders/{order_id}", response_model=dict)
async def update_order(
    order_id: str,
    update_data: dict,
    queries: OrderQueries = Depends(),
    account_data: dict = Depends(authenticator.get_current_account_data),
):
    return queries.update(order_id, update_data)
