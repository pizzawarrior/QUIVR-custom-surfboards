from fastapi.testclient import TestClient
from main import app
from queries.orders import OrderQueries


client = TestClient(app)


class EmptyOrderQueries:
    def list_orders(self):
        return []


def test_list_orders():
    # Arrange
    app.dependency_overrides[OrderQueries] = EmptyOrderQueries

    response = client.get("/orders")

    # Act
    app.dependency_overrides = {}

    # Assert
    assert response.status_code == 200
    assert response.json() == []
