import pytest
from authenticator import authenticator
from models.accounts import AccountIn, AccountToken
from queries.accounts import AccountQueries


@pytest.mark.usefixtures("auth_obj")
@pytest.mark.usefixtures("dummy_user")
class TestAuthenticate:
    # Test the hashed_password method to make sure that the same password input will not return the same hashed password
    def test_password_hash(self, auth_obj):
        test_password = "123123123"
        first_password = authenticator.hash_password(test_password)
        second_password = authenticator.hash_password(test_password)
        assert first_password is not second_password

    # Current Status: passes, but not while 'dummy_user' is activated-- there is a current error on it

    # Test to validate a token is being created for a dummy user
    def test_create_access_token_for_user(self, auth_obj, dummy_user):
        # Tokens are created either when an existing user logs in, or when a user creates an account
        # Encode the token first, then decode it and pull out the username to cross-check. That's all.
        token = auth_obj.get_account_data_for_cookie(account=dummy_user)
        assert token["username"] == dummy_user.username

    # Current Status: Testing produces error: AttributeError: 'str' object has no attribute 'dict'
    # -> error exist in 'dummy_user' in conftest, on the new_user_params line
