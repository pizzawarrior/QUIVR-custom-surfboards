import pytest
from unittest.mock import patch
from fastapi.testclient import TestClient
from main import app
from models.accounts import AccountOut

client = TestClient(app)


@pytest.fixture
def mock_account():
    return AccountOut(
        id="1", username="test_user", email="test_user@example.com",
        first_name="Test", last_name="User", phone_number="555-555-5555",
        role="customer"
    )


@pytest.fixture
def mock_token():
    return "mocked_token_value"


def test_get_token_without_cookie(mock_account):
    with patch("authenticator.QuivrAuthenticator.try_get_current_account_data", return_value=None):
        response = client.get("/token")
        assert response.status_code == 200
        assert response.json() is None
