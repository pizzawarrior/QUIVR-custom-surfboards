from fastapi.testclient import TestClient
from main import app
from queries.orders import OrderQueries

"""
In order to make these work we will need to create fixtures to be reused:
-> 'auth object' (successful hashing of password)
-> dummy user, with all req'd user attributes from AccountIn (verify)
-> then we can generate a token
"""

client = TestClient(app)


class CreateOrderQueries:
    def create_order(self, order):
        result = {"order_id": 5150}
        result.update(order)
        return result


def test_create_order():
    app.dependency_overrides[OrderQueries] = CreateOrderQueries

    json = {
        "date": "2024-01-15, 22:14",
        "reviewed": False,
        "order_status": "Order received",
        "customer_username": "KellySlater",
        "surfboard_shaper": "Rusty",
        "surfboard_model": "Twin fin",
        "surfboard_length": 6,
        "surfboard_width": 19,
        "surfboard_thickness": 2.75,
        "surfboard_construction": "PU",
        "surfboard_fin_system": "FCS2",
        "surfboard_fin_count": 2,
        "surfboard_tail_style": "swallow",
        "surfboard_glassing": "6 + 4 x 6",
        "surfboard_desc": "",
    }

    expected = {
        "order_id": "5150",
        "date": "2024-01-15, 22:14",
        "reviewed": False,
        "order_status": "Order received",
        "customer_username": "KellySlater",
        "surfboard_shaper": "Rusty",
        "surfboard_model": "Twin fin",
        "surfboard_length": 6,
        "surfboard_width": 19,
        "surfboard_thickness": 2.75,
        "surfboard_construction": "PU",
        "surfboard_fin_system": "FCS2",
        "surfboard_fin_count": 2,
        "surfboard_tail_style": "swallow",
        "surfboard_glassing": "6 + 4 x 6",
        "surfboard_desc": "",
    }

    # Act
    response = client.post("/orders", json=json)

    app.dependency_overrides = {}

    # Assert
    assert response.status_code == 200
    assert response.json() == expected