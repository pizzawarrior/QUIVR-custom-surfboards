from fastapi.testclient import TestClient
from fastapi import HTTPException
import pytest
from unittest.mock import patch
from main import app
from queries.orders import OrderQueries, OrderUpdate
from authenticator import authenticator


"""
This test checks to see if we can update an order
"""

client = TestClient(app)


class UpdateOrderQueries:
    def update_mock_order(self, order_id: str, update_data: dict) -> OrderUpdate:
        if order_id == "valid_order_id":
            return {
                "message": "Order updated successfully",
                "order_id": order_id,
                "updated_data": update_data
            }
        else:
            raise HTTPException(
                status_code=404, detail="Order ID {order_id} not found"
        )


@pytest.mark.usefixtures("dummy_user")
class TestUpdateOrder:
    def test_update_order(self, dummy_user):
        with patch.object(
            authenticator, "get_account_data_for_cookie", return_value=(dummy_user.username, dummy_user)), \
             patch.object(OrderQueries, "update", new=UpdateOrderQueries().update_mock_order):

            def override_get_current_account_data():
                return {"username": dummy_user.username}

            app.dependency_overrides[authenticator.get_current_account_data] = override_get_current_account_data

            token = "mock_token"
            headers = {"Authorization": f"Bearer {token}"}

            update_data = {
                "order_status": "Complete",
                "reviewed": True
            }

            response = client.put("/orders/valid_order_id", json=update_data, headers=headers)
            # print(response.json())

            assert response.status_code == 200
            assert response.json() == {
                "message": "Order updated successfully",
                "order_id": "valid_order_id",
                "updated_data": update_data
            }
            # Clean up dependency overrides
            app.dependency_overrides = {}

    def test_update_order_invalid_id(self, dummy_user):
        with patch.object(authenticator, "get_account_data_for_cookie", return_value=(dummy_user.username, dummy_user)), \
             patch.object(OrderQueries, "update", new=UpdateOrderQueries().update_mock_order):

            def override_get_current_account_data():
                return {"username": dummy_user.username}

            app.dependency_overrides[authenticator.get_current_account_data] = override_get_current_account_data

            token = "mock_token"
            headers = {"Authorization": f"Bearer {token}"}

            update_data = {
                "order_status": "Complete",
                "reviewed": True
            }

            response = client.put("/orders/invalid_order_id", json=update_data, headers=headers)

            assert response.status_code == 404
            assert response.json() == {"detail": "Order ID {order_id} not found"}

            # Clean up dependency overrides
            app.dependency_overrides = {}
