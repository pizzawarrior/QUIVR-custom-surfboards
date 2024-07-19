import pytest
from fastapi.testclient import TestClient
from unittest.mock import patch
from fastapi import HTTPException
from main import app
from queries.orders import OrderQueries
from authenticator import authenticator

"""
This test checks to see if we can create an order without having a valid token
"""

client = TestClient(app)


class MockOrderQueries:
    def create_mock_order(self, order, customer_username):
        order_data = order.dict()
        order_data["customer_username"] = customer_username
        return {"orders": [order_data]}


@pytest.mark.usefixtures("auth_obj", "dummy_user", "dummy_order")
class TestUser:
    def test_create_order(self, dummy_order, dummy_user):
        with patch.object(
            authenticator, "get_account_data_for_cookie", return_value=(dummy_user.username, dummy_user)), \
             patch.object(OrderQueries, "create", new=MockOrderQueries().create_mock_order):

            def override_get_current_account_data():
                raise HTTPException(status_code=401, detail="Invalid token")

            app.dependency_overrides[authenticator.get_current_account_data] = override_get_current_account_data

            token = "invalid_token"
            headers = {"Authorization": f"Bearer {token}"}

            json = {
                "orders": [
                    dummy_order.dict()
                ]
            }

            response = client.post("/orders", json=json, headers=headers)
            print(response.json())

            assert response.status_code == 401
            assert response.json() == {"detail": "Invalid token"}

            # Clean up dependency overrides
            app.dependency_overrides = {}
