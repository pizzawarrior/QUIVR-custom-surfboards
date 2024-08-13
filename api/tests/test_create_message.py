from fastapi.testclient import TestClient
import pytest
from main import app
from unittest.mock import patch
from queries.messages import MessageQueries, MessageIn, MessageOut
from authenticator import authenticator


client = TestClient(app)


class CreateMockMessageQueries:
    def create_mock_message(self, message: MessageIn, sender) -> MessageOut:
        mock_message = {
            "id": "mock_id",
            "title": message.title,
            "body": message.body,
            "is_read": message.is_read,
            "sender": sender,
            "date": "2024-01-15, 22:14",
            "recipient": "Rusty"
        }
        return MessageOut(**mock_message)


@pytest.mark.usefixtures("auth_obj", "dummy_user", "dummy_message")
class TestMessage:
    def test_create_message(self, dummy_message, dummy_user):
        app.dependency_overrides[authenticator.get_current_account_data] = lambda: {"username": dummy_user.username}

        with patch.object(
            authenticator, "get_current_account_data", return_value=(dummy_user.username, dummy_user)), \
                patch.object(MessageQueries, "create", new=CreateMockMessageQueries().create_mock_message):

            def override_get_current_account_data():
                return {"username": dummy_user.username}

            app.dependency_overrides[authenticator.get_current_account_data] = override_get_current_account_data

            token = "mock_token"
            headers = {"Authorization": f"Bearer {token}"}
            json = dummy_message.dict()

            response = client.post("/messages", json=json, headers=headers)

            expected = {
                "id": "mock_id",
                "title": dummy_message.title,
                "body": dummy_message.body,
                "is_read": dummy_message.is_read,
                "sender": dummy_user.username,
                "date": "2024-01-15, 22:14",
                "recipient": "Rusty"
            }

            print("Response JSON:", response.json())

            assert response.status_code == 201
            assert response.json() == expected

            app.dependency_overrides = {}
