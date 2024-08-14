import pytest
from fastapi.testclient import TestClient
from main import app
from models.accounts import AccountOutWithHashedPassword, AccountIn
from queries.accounts import AccountQueries
from unittest.mock import patch
from authenticator import authenticator
import time

# TODO: Update this test to actually work, current status: 'Unauthorized...'

client = TestClient(app)


# Integration test using mocks
class MockAccountQueries:
    def create(self, info: AccountIn, hashed_password: str) -> AccountOutWithHashedPassword:
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

@pytest.mark.usefixtures("auth_obj")
def test_create_account_integration():
    unique_username = f'new_user_{int(time.time())}'
    account_data = {
        "username": unique_username,
        "password": "new_password",
        "confirm_password": "new_password",  # Ensure confirm password field is included
        "email": "new_user@example.com",
        "first_name": "New",
        "last_name": "User",
        "phone_number": "555-555-5555",
        "role": "customer"
    }

    # Mock hashed password and token
    mock_hashed_password = "$2b$12$KIXk1m2Gr0wWxVh9d0c47u5Th3M.RuYPxOq5lJ9j9H.aEwKjZ7Meq"
    mock_account = MockAccountQueries().create(AccountIn(**account_data), mock_hashed_password)
    mock_token = {"access_token": "mock_token", "token_type": "bearer"}

    # Mock the dependencies
    with patch('authenticator.QuivrAuthenticator.hash_password', return_value=mock_hashed_password):
        with patch('authenticator.QuivrAuthenticator.login', return_value=mock_token):
            with patch.object(MockAccountQueries, 'create', return_value=mock_account):
                with patch.object(MockAccountQueries, 'get_one_by_username', return_value=None):  # Ensure no existing user
                    app.dependency_overrides[authenticator.get_account_getter] = lambda: MockAccountQueries()
                    app.dependency_overrides[authenticator.get_account_data_for_cookie] = lambda token: (unique_username, mock_account)

                    response = client.post("/accounts", json=account_data)

    # Print response for debugging
    print("Response status code:", response.status_code)
    print("Response body:", response.json())

    # Assert the response
    assert response.status_code == 200
    response_data = response.json()
    assert response_data["access_token"] == "mock_token"
    assert response_data["token_type"] == "bearer"
    assert response_data["account"]["id"] == "1"
    assert response_data["account"]["username"] == account_data["username"]
    assert response_data["account"]["email"] == account_data["email"]
    assert response_data["account"]["first_name"] == account_data["first_name"]
    assert response_data["account"]["last_name"] == account_data["last_name"]
    assert response_data["account"]["phone_number"] == account_data["phone_number"]
    assert response_data["account"]["role"] == account_data["role"]

    app.dependency_overrides = {}


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
