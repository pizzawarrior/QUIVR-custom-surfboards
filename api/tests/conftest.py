import pytest
from queries.accounts import account_services
from models.accounts import AccountIn, AccountOutWithHashedPassword
from authenticator import auth_service


"""
This is where we create our fixtures for use in the actual tests.
UNDER CONSTRUCTION!! THESE ARE NOT CURRENTLY FUNCTIONAL
Question: Are we actually hashing the paswords at all ?????
"""


@pytest.fixture(scope="class")
def auth_obj():
    return auth_service


"""
create a new_user OBJECT, do not actually add a user to the db
"""


@pytest.fixture(scope="class")
def dummy_user(hashed_password: str) -> AccountOutWithHashedPassword:
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
    # then set hashed password to hashed_password (these are made up methods for the time being)
    new_pasword = auth_service.create_hashed_password(password=hashed_password)

    # then copy all of the params into AccountOutWithHashedPassword
    new_user_params = new_user.copy(update=new_password.dict())
    return AccountOutWithHashedPassword(**new_user_params.dict())
