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
    info = AccountIn(
        username="steveMartin",
        password="123thankyou",
        email="steve@aol.com",
        first_name="Steve",
        last_name="Martin",
        phone_number="555-555-5555",
        role="customer",
    )
    hashed_password = authenticator.hash_password(info.password)
    account = info.dict()
    account["hashed_password"] = hashed_password
    account["id"] = "123id"
    del account["password"]
    return AccountOutWithHashedPassword(**account)
