import pytest
from fastapi.testclient import TestClient
from unittest.mock import patch

from main import app
from queries.orders import OrderQueries


client = TestClient(app)


class MockOrderQueries:
    def list_orders(self, dummy_order, dummy_order_2):
        return {
            dummy_order.dict(),
            dummy_order_2.orders[0].dict()
        }


@pytest.mark.usefixtures("dummy_order", "dummy_order_2")
class TestOrderQueries:
    def list_mock_orders(self, dummy_order, dummy_order_2):
        with patch.object(OrderQueries, "list_orders", new=MockOrderQueries().list_orders):
            response = client.get("/orders")
            assert response.status_code == 200
            assert response.json() == {
                "orders": [
                    dummy_order.dict(),
                    dummy_order_2.orders[0].dict()
                ]
            }


class EmptyOrderQueries:
    def list_orders(self):
        return []


def test_list_empty_orders():
    # Arrange
    app.dependency_overrides[OrderQueries] = EmptyOrderQueries

    response = client.get("/orders")

    # Assert
    assert response.status_code == 200
    assert response.json() == {"orders": []}

    app.dependency_overrides = {}
