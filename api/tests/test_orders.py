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


# class CreateOrderQueries:
#     def create_order(self, order):
#         result = {"order_id": 5150}
#         result.update(order)
#         return result


# def test_create_order():
#     app.dependency_overrides[OrderQueries] = CreateOrderQueries

#     json = {
#         "order_status": "Order received!",
#         "customer_username": "jesus",
#         "surfboard_shaper": "michael",
#         "surfboard_model": "laser",
#         "surfboard_length": 13,
#         "surfboard_width": 24,
#         "surfboard_thickness": 4,
#         "surfboard_construction": "PU",
#         "surfboard_fin_system": "FCS1",
#         "surfboard_fin_count": 5,
#         "surfboard_tail_style": "squash",
#         "surfboard_glassing": "4 + 4 x 4",
#         "surfboard_desc": "string",
#     }

#     expected = {
#         "order_id": "5150",
#         "order_status": "Order received!",
#         "customer_username": "jesus",
#         "surfboard_shaper": "michael",
#         "surfboard_model": "laser",
#         "surfboard_length": 13,
#         "surfboard_width": 24,
#         "surfboard_thickness": 4,
#         "surfboard_construction": "PU",
#         "surfboard_fin_system": "FCS1",
#         "surfboard_fin_count": 5,
#         "surfboard_tail_style": "squash",
#         "surfboard_glassing": "4 + 4 x 4",
#         "surfboard_desc": "string",
#     }

#     # Act
#     response = client.post("/orders", json=json)

#     app.dependency_overrides = {}

#     # Assert
#     assert response.status_code == 200
#     assert response.json() == expected
