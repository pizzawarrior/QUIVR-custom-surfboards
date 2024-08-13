from fastapi import (
    APIRouter,
    status,
    Body,
    Depends,
)
from typing import List
from authenticator import authenticator
from models.messages import MessageIn, MessageOut, MessageUpdate
from queries.messages import MessageQueries

router = APIRouter()


@router.post(
            "/messages",
            response_description="Create a new message",
            status_code=status.HTTP_201_CREATED,
            response_model=MessageOut,
            )
def create_message(
    message: MessageIn,
    repo: MessageQueries = Depends(),
    account_data: dict = Depends(authenticator.get_current_account_data),
):
    return repo.create(message, sender=account_data["username"])


@router.get(
        "/messages",
        response_description="List of all messages",
        response_model=List[MessageOut]
        )
def list_messages(repo: MessageQueries = Depends()):
    return repo.get_all_messages()


@router.get(
        "/messages/{id}",
        response_description="Get a single message by id",
        response_model=MessageOut
        )
def get_message(id: str, repo: MessageQueries = Depends()):
    return repo.get_one_message(id)


@router.put(
        "/messages/{id}",
        response_description="Update one message",
        response_model=dict
        )
def update_message(
    id: str,
    repo: MessageQueries = Depends(),
    message: MessageUpdate = Body(...),
):
    return repo.update(id, message)


@router.delete("/messages/{id}", response_description="Delete a message")
def delete_message(
    id: str,
    repo: MessageQueries = Depends(),
):
    return repo.delete(id)
