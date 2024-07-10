import pytest


@pytest.mark.usefixtures("auth_obj")
@pytest.mark.usefixtures("dummy_user")
class TestAuthenticate:
    # Test the hashed_password method to make sure that the same password input will not return the same hashed password
    def test_password_hash(self, auth_job):
        test_password = "123123123"
        first_password = auth_job.hash_password(test_password)
        second_password = auth_job.hash_password(test_password)
        assert first_password is not second_password

    # Test to validate a token is being created for a dummy user
    def test_create_access_token_for_user(self, auth_obj, dummy_user):
        token = auth_obj.get_account_data_for_cookie(account=dummy_user)
        assert token[0] == dummy_user.username

    # Test to verify no token is generated when there is no user
    def test_create_access_token_for_no_user(self, auth_obj):
        token = auth_obj.get_account_data_for_cookie(account=None)
        assert token is None

# # For more info on testing refer to the reference in .scratch-paper!#####
