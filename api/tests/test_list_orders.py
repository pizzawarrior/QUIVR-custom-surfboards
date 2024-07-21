from fastapi.testclient import TestClient
from main import app
from queries.orders import OrderQueries


client = TestClient(app)


class EmptyOrderQueries:
    def list_orders(self):
        return []
    # need to add in multiple orders to be returned


def test_list_orders():
    # Arrange
    app.dependency_overrides[OrderQueries] = EmptyOrderQueries

    response = client.get("/orders")

    # Assert
    assert response.status_code == 200
    assert response.json() == {"orders": []}

    app.dependency_overrides = {}


def test_list_empty_orders():
    # Arrange
    app.dependency_overrides[OrderQueries] = EmptyOrderQueries

    response = client.get("/orders")

    # Assert
    assert response.status_code == 200
    assert response.json() == {"orders": []}

    app.dependency_overrides = {}
