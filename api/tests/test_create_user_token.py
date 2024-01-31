from fastapi.testclient import TestClient
from main import app
from queries.accounts import AccountQueries


"""
In order to make these work we will need to create fixtures to be reused (see conftest.py):
-> 'auth object' (successful hashing of password)
-> dummy user, with all req'd user attributes from AccountIn model- (verify)
-> then we have to generate a token
reference: https://www.azepug.az/posts/fastapi/ecommerce-fastapi-nuxtjs/ecommerce-pytest-user-auth-part1.html
"""

client = TestClient(app)
