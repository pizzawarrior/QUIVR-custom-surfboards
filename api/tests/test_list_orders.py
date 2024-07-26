import pytest
from fastapi.testclient import TestClient
from unittest.mock import patch

from main import app
from queries.orders import OrderQueries


client = TestClient(app)


class EmptyOrderQueries:
    def list_orders(self):
        return []


class TestUser:
    def test_list_empty_orders(self):
        with patch.object(OrderQueries, "list_orders", new=EmptyOrderQueries().list_orders):
            response = client.get("/orders")

            expected = []

            # Assert
            assert response.status_code == 200
            assert response.json() == expected

    def test_list_orders_with_data(self, dummy_order):
        class MockOrderQueriesWithData:
            def list_orders(self):
                return [
                    dummy_order.dict(),
                    dummy_order.dict()
                ]

        with patch.object(OrderQueries, "list_orders", new=MockOrderQueriesWithData().list_orders):
            response = client.get("/orders")

            expected = [
                    dummy_order.dict(),
                    dummy_order.dict()
                ]

            assert response.status_code == 200
            assert response.json() == expected
