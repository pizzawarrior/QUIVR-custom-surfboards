from fastapi.testclient import TestClient
from main import app
from queries.accounts import AccountQueries


client = TestClient(app)
