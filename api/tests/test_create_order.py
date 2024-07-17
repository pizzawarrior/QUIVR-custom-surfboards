from fastapi.testclient import TestClient
import pytest
from unittest.mock import patch
from main import app
from queries.orders import OrderQueries
from models.orders import OrdersOut
from authenticator import authenticator


"""
This test checks to see if we can create an order with a valid token
"""

"""
In order to test the create_order function we will need to:
-> Generate a token using dummy_user, then create the order
"""

client = TestClient(app)


class CreateOrderQueries:
    def create(self, orders, customer_username):
        order = orders.orders[0] # Access the first order in the list
        result = {
            "order_id": 5150,
            "date": "2024-01-15, 22:14",
            "reviewed": False,
            "order_status": "Order received",
            "customer_username": customer_username,
            "surfboard_shaper": order.surfboard_shaper,
            "surfboard_model": order.surfboard_model,
            "surfboard_length": order.surfboard_length,
            "surfboard_width": order.surfboard_width,
            "surfboard_thickness": order.surfboard_thickness,
            "surfboard_construction": order.surfboard_construction,
            "surfboard_fin_system": order.surfboard_fin_system,
            "surfboard_fin_count": order.surfboard_fin_count,
            "surfboard_tail_style": order.surfboard_tail_style,
            "surfboard_glassing": order.surfboard_glassing,
            "surfboard_desc": order.surfboard_desc,
        }
        return OrdersOut(orders=[result])


@pytest.mark.usefixtures("auth_obj", "dummy_user", "dummy_order")
class TestUser:
    def test_create_order(self, dummy_order, dummy_user):
        with patch.object(
            authenticator, "get_account_data_for_cookie", return_value=(dummy_user.username, dummy_user)), \
             patch.object(OrderQueries, "create", new=CreateOrderQueries().create):

            def override_get_current_account_data():
                return {"username": dummy_user.username}

            app.dependency_overrides[authenticator.get_current_account_data] = override_get_current_account_data

            token = "mock_token"
            headers = {"Authorization": f"Bearer {token}"}

            json = {
                "orders": [
                    dummy_order.dict()
                ]
            }

            response = client.post("/orders", json=json, headers=headers)
            print(response.json())

            expected = {
                "orders": [
                    {
                        "order_id": "5150",
                        "date": "2024-01-15, 22:14",
                        "reviewed": False,
                        "order_status": "Order received",
                        "customer_username": dummy_user.username,
                        "surfboard_shaper": dummy_order.surfboard_shaper,
                        "surfboard_model": dummy_order.surfboard_model,
                        "surfboard_length": dummy_order.surfboard_length,
                        "surfboard_width": dummy_order.surfboard_width,
                        "surfboard_thickness": dummy_order.surfboard_thickness,
                        "surfboard_construction": dummy_order.surfboard_construction,
                        "surfboard_fin_system": dummy_order.surfboard_fin_system,
                        "surfboard_fin_count": dummy_order.surfboard_fin_count,
                        "surfboard_tail_style": dummy_order.surfboard_tail_style,
                        "surfboard_glassing": dummy_order.surfboard_glassing,
                        "surfboard_desc": dummy_order.surfboard_desc,
                    }
                ]
            }

            assert response.status_code == 200
            assert response.json() == expected

            # Clean up dependency overrides
            app.dependency_overrides = {}
