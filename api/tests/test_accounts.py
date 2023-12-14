from fastapi.testclient import TestClient
from main import app
from queries.accounts import AccountQueries


client = TestClient(app)


class EmptyAccountQueries:
    def get_all_accounts(self):
        return []


def test_get_all_accounts():
    app.dependency_overrides[AccountQueries] = EmptyAccountQueries

    response = client.get("/accounts")

    app.dependency_overrides = {}

    assert response.status_code == 200
    assert response.json() == []
