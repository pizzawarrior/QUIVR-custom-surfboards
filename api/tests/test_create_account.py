import pytest
from fastapi.testclient import TestClient
from main import app
from models.accounts import AccountOutWithHashedPassword, AccountIn
from queries.accounts import AccountQueries
from unittest.mock import patch

client = TestClient(app)


# Integration test using mocks
class MockAccountQueries:
    def create_new_account(self, info: AccountIn, hashed_password: str) -> AccountOutWithHashedPassword:
        return AccountOutWithHashedPassword(
            id="1",
            username=info.username,
            email=info.email,
            first_name=info.first_name,
            last_name=info.last_name,
            phone_number=info.phone_number,
            role=info.role,
            hashed_password=hashed_password
        )

    def get_one_by_username(self, username: str):
        return None  # Simulate that no user already exists


@pytest.mark.usefixtures("account_queries")
def test_create_duplicate_account(account_queries):
    account_data = {
        "username": "existing_user",
        "password": "password",
        "email": "existing_user@example.com",
        "first_name": "Existing",
        "last_name": "User",
        "phone_number": "555-555-5555",
        "role": "customer"
    }

    existing_account = account_queries.create(AccountIn(**account_data), "hashed_password")

    app.dependency_overrides = {}

    with patch.object(AccountQueries, 'get_one_by_username', return_value=existing_account.username):
        response = client.post("/accounts", json=account_data)

    assert response.status_code == 400
    assert response.json()["detail"] == "Duplicate Account Error: Cannot create an account with provided credentials"

    app.dependency_overrides = {}
