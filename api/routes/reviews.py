from fastapi import (
    APIRouter,
    status,
    Body,
    Depends,
)
from typing import List
from models.reviews import ReviewsUpdate, ReviewsIn, ReviewsOut
from queries.reviews import ReviewQueries
from authenticator import authenticator

router = APIRouter()


@router.post(
    "/reviews",
    response_description="Create a new review",
    status_code=status.HTTP_201_CREATED,
    response_model=ReviewsIn,
)
def create_review(
    review: ReviewsIn,
    repo: ReviewQueries = Depends(),
    account_data: dict = Depends(authenticator.get_current_account_data),
):
    return repo.create(review, customer=account_data["username"])


@router.get(
    "/reviews",
    response_description="List of all Reviews",
    response_model=List[ReviewsOut],
)
def list_reviews(
    repo: ReviewQueries = Depends(),
):
    return repo.get_all_reviews()


@router.get(
    "/reviews/{id}",
    response_description="Get a review by order id",
    response_model=ReviewsOut,
)
def find_review(
    id: str,
    repo: ReviewQueries = Depends(),
):
    return repo.get_one_by_id(id)


@router.put(
    "/reviews/{id}",
    response_description="Update review",
    response_model=dict,
)
def update_book(
    id: str,
    repo: ReviewQueries = Depends(),
    review: ReviewsUpdate = Body(...),
    account_data: dict = Depends(authenticator.get_current_account_data),
):
    return repo.update(id, review)


@router.delete("/reviews/{id}", response_description="Delete a review")
def delete_review(
    id: str,
    repo: ReviewQueries = Depends(),
    account_data: dict = Depends(authenticator.get_current_account_data),
):
    return repo.delete(id)
