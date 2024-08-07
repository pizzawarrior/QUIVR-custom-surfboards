import pytest
from fastapi.testclient import TestClient
from main import app
from models.accounts import AccountOutWithHashedPassword, AccountIn
from queries.accounts import AccountQueries
from unittest.mock import patch
import time

client = TestClient(app)

# TODO: Update this test to actually work


# Integration test using mocks
class CreateAccountQueries:
    def create_mock_account(self, info, hashed_password) -> AccountOutWithHashedPassword:
        return AccountOutWithHashedPassword(
            id=1,
            username=info.username,
            email=info.email,
            first_name=info.first_name,
            last_name=info.last_name,
            phone_number=info.phone_number,
            role=info.role,
            hashed_password=hashed_password
        )

@pytest.mark.usefixtures("auth_obj", "dummy_user")
def test_create_account_integration(dummy_user):
    # Ensure username is unique by providing a new username for each test
    unique_username = f'new_user_{int(time.time())}'
    account_data = {
        "username": unique_username,
        "password": "new_password",
        "email": "new_user@example.com",
        "first_name": "New",
        "last_name": "User",
        "phone_number": "555-555-5555",
        "role": "customer"
    }

    print("Sending account data:", account_data)

    # Mock the dependencies with valid hashed password and create method
    mock_hashed_password = "$2b$12$KIXk1m2Gr0wWxVh9d0c47u5Th3M.RuYPxOq5lJ9j9H.aEwKjZ7Meq"
    mock_account = CreateAccountQueries().create_mock_account(AccountIn(**account_data), mock_hashed_password)
    mock_token = {"access_token": "mock_token", "token_type": "bearer"}

    with patch('authenticator.QuivrAuthenticator.hash_password', return_value=mock_hashed_password):
        with patch('authenticator.QuivrAuthenticator.login', return_value=mock_token):
            with patch.object(AccountQueries, 'create', return_value=mock_account):

                response = client.post("/accounts", json=account_data)

    # Print response for debugging
    print("Response status code:", response.status_code)
    print("Response body:", response.json())

    # Assert the response
    assert response.status_code == 200
    response_data = response.json()
    assert response_data["account"]["id"] == 1
    assert response_data["account"]["username"] == account_data["username"]
    assert response_data["account"]["email"] == account_data["email"]
    assert response_data["account"]["first_name"] == account_data["first_name"]
    assert response_data["account"]["last_name"] == account_data["last_name"]
    assert response_data["account"]["phone_number"] == account_data["phone_number"]
    assert response_data["account"]["role"] == account_data["role"]
    assert "access_token" in response_data
    assert response_data["token_type"] == "bearer"


@pytest.mark.usefixtures("account_queries")
def test_create_duplicate_account(account_queries):
    # Data to create a new account
    account_data = {
        "username": "existing_user",
        "password": "password",
        "email": "existing_user@example.com",
        "first_name": "Existing",
        "last_name": "User",
        "phone_number": "555-555-5555",
        "role": "customer"
    }

    # Insert the account to simulate an existing user
    account_queries.create(AccountIn(**account_data), "hashed_password")

    # Try creating the same account again
    with patch('authenticator.QuivrAuthenticator.hash_password', return_value="hashed_password"):
        response = client.post("/accounts", json=account_data)

    # Assert the response
    assert response.status_code == 400
    assert response.json()["detail"] == "Duplicate Account Error: Cannot create an account with provided credentials"
