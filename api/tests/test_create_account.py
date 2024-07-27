import pytest
from fastapi.testclient import TestClient
from main import app
from models.accounts import AccountIn
from unittest.mock import patch
import time

client = TestClient(app)


# Integration test using mocks
@pytest.mark.usefixtures("account_queries", "clean_db")
def test_create_account_integration(account_queries, clean_db):
    # clear the mock db
    clean_db()
    # ensure username not already in db by providing a new username for each test
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

    # Mock the dependencies
    with patch('authenticator.QuivrAuthenticator.hash_password', return_value="hashed_password"):
        with patch('authenticator.QuivrAuthenticator.login', return_value={"access_token": "mock_token", "token_type": "bearer"}):
            response = client.post("/accounts", json=account_data)

    # Print response for debugging
    print("Response status code:", response.status_code)
    print("Response body:", response.json())

    # Assert the response
    assert response.status_code == 200
    response_data = response.json()
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
