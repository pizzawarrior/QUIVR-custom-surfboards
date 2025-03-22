import pytest
from main import app
from fastapi.testclient import TestClient

'''
For more info on testing refer to the reference in .scratch-paper
'''


client = TestClient(app)


@pytest.mark.usefixtures("auth_obj", "dummy_user")
class TestAuthenticate:
    def test_password_hash(self, auth_obj):
        test_password = "123123123"
        first_password = auth_obj.hash_password(test_password)
        second_password = auth_obj.hash_password(test_password)
        assert first_password is not second_password

    def test_create_access_token_for_user(self, auth_obj, dummy_user):
        token = auth_obj.get_account_data_for_cookie(account=dummy_user)
        assert token
        assert token[0] == dummy_user.username

    def test_create_access_token_for_no_user(self, auth_obj):
        token = auth_obj.get_account_data_for_cookie(account=None)
        assert token is None

    def test_logout(self):
        response = client.delete("/token")
        assert response.status_code == 200
        assert "fastapi_token" not in response.cookies
