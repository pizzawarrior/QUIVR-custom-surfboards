from fastapi.testclient import TestClient
from main import app
from queries.reviews import ReviewQueries


client = TestClient(app)


class EmptyReviewQueries:
    def get_all_reviews(self):
        return []


def test_list_reviews():
    # Arrange
    app.dependency_overrides[ReviewQueries] = EmptyReviewQueries

    response = client.get("/reviews")

    # Act
    app.dependency_overrides = {}

    # Assert
    assert response.status_code == 200
    assert response.json() == []
