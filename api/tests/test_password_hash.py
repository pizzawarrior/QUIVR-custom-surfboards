import pytest
from authenticator import authenticator

"""
Test the hashed_password method to make sure that the same password input will not return the same hashed password
"""


@pytest.mark.usefixtures("auth_obj")
class TestAuthenticate:
    def test_password_hash(self, auth_obj):
        test_password = "123123123"
        first_password = authenticator.hash_password(test_password)
        second_password = authenticator.hash_password(test_password)
        assert first_password is not second_password
