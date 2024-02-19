from fastapi.testclient import TestClient
import pytest
from main import app
from queries.orders import OrderQueries


# STATUS: 2/18/24 - THIS HAS NOT BEEN TESTED WITH A RUNNING DOCKER CONTAINER. THIS IS ONLY A RUDIMENTARY ATTEMPT

"""
This test checks to see if we can create an order with a valid token
"""

"""
In order to test the create_order function we will need to:
-> Generate a token using dummy_user, then create the order
"""

client = TestClient(app)


class CreateOrderQueries:
    def create_order(self, order):
        result = {"order_id": 5150}
        result.update(order)
        return result


@pytest.mark.usefixtures("auth_obj")
@pytest.mark.usefixtures("dummy_user")
@pytest.mark.usefixtures("dummy_order")
class TestUser:
    # Generate token first
    def test_create_access_token_for_user(self, auth_obj, dummy_user):
        token = auth_obj.get_account_data_for_cookie(account=dummy_user)

    # Create fake order to be tested
    def test_create_order(self, dummy_order):
        app.dependency_overrides[OrderQueries] = CreateOrderQueries

        json = {dummy_order}

        expected = {
            "order_id": 5150,
            "date": "2024-01-15, 22:14",
            "reviewed": False,
            "order_status": "Order received",
            "customer_username": "steveMartin",  # This is the name from dummy_user
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
