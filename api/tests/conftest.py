import pytest
from models.accounts import AccountIn, AccountOutWithHashedPassword
from authenticator import authenticator


"""
This is where we create our fixtures for use in the actual tests.
"""


@pytest.fixture(scope="class")
def auth_obj():
    return authenticator


@pytest.fixture(scope="class")
def dummy_user() -> AccountOutWithHashedPassword:
    new_user = AccountIn(
        username="steveMartin",
        password="123thankyou",
        email="steve@aol.com",
        first_name="Steve",
        last_name="Martin",
        phone_number="555-555-5555",
        role="customer",
    )
    # now hash the password
    # then set hashed password to hashed_password
    hashed_password = authenticator.hash_password(new_user.password)

    # then copy all of the params into AccountOutWithHashedPassword
    new_user_params = new_user.copy(update=hashed_password.dict())
    return AccountOutWithHashedPassword(**new_user_params.dict())
