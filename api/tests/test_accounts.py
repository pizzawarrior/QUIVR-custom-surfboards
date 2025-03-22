import pytest
from fastapi.testclient import TestClient
from main import app
from queries.accounts import AccountQueries
from models.accounts import AccountOutWithHashedPassword, AccountIn
from authenticator import authenticator


client = TestClient(app)


class EmptyAccountQueries:
    def get_all_accounts(self):
        return []


def test_get_all_accounts_when_empty_returns_empty_array():
    app.dependency_overrides[AccountQueries] = EmptyAccountQueries

    response = client.get("/accounts")

    app.dependency_overrides = {}

    assert response.status_code == 200
    assert response.json() == []


@pytest.mark.usefixtures("account_queries", "clean_db")
def test_get_one_by_username_returns_the_correct_account(account_queries, clean_db):
    username = "testuser"
    mock_account = {
        "username": username,
        "hashed_password": "hashed_password123",
        "first_name": "Test",
        "last_name": "User",
        "email": "test@example.com",
        "phone_number": "5555555555",
        "role": "customer",
        "_id": "60c72b2f5f1b2c001c8e4f15"
    }
    account_queries.collection.insert_one(mock_account)

    result = account_queries.get_one_by_username(username)

    assert isinstance(result, AccountOutWithHashedPassword)
    assert result.username == username
    assert result.hashed_password == "hashed_password123"
    assert result.first_name == "Test"
    assert result.last_name == "User"
    assert result.email == "test@example.com"
    assert result.phone_number == "5555555555"
    assert result.role == "customer"
    assert result.id == "60c72b2f5f1b2c001c8e4f15"


@pytest.mark.usefixtures("account_queries")
def test_get_one_by_username_not_found_returns_none(account_queries):
    result = account_queries.get_one_by_username("nonexistentuser")
    assert result is None


# This is an end to end test that sends a real request ********
@pytest.mark.usefixtures("account_queries", "clean_db")
def test_create_new_account_creates_new_account(account_queries, clean_db):
    new_account_data = {
        "username": "new_user",
        "password": "new_password",
        "email": "new_user@example.com",
        "first_name": "New",
        "last_name": "User",
        "phone_number": "555-555-5555",
        "role": "customer"
    }
    response = client.post("/accounts", json=new_account_data)
    assert response.status_code == 200
    response_json = response.json()
    assert "access_token" in response_json
    assert response_json["account"]["username"] == new_account_data["username"]


@pytest.mark.usefixtures("account_queries", "clean_db")
def test_create_duplicate_account_correctly_returns_error(account_queries, clean_db):
    existing_account_data = {
        "username": "existing_user",
        "password": "existing_password",
        "email": "existing_user@example.com",
        "first_name": "Existing",
        "last_name": "User",
        "phone_number": "555-555-5555",
        "role": "customer"
    }
    # Insert an account manually
    hashed_password = authenticator.hash_password(existing_account_data["password"])
    account_queries.create(AccountIn(**existing_account_data), hashed_password)

    # Attempt to create the same account again
    response = client.post("/accounts", json=existing_account_data)
    assert response.status_code == 400
    assert response.json() == {"detail": "Duplicate Account Error: Cannot create an account with provided credentials"}
