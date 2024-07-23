from typing import Optional, List
from pydantic import BaseModel, Field


class MessageIn(BaseModel):
    title: Optional[str]
    body: str
    isRead: bool = Field(default=False)
    sender: str
    recipient: str


class MessageOut(BaseModel):
    id: str
    title: Optional[str]
    body: str
    isRead: bool = Field(default=False)
    date: str
    sender: str
    recipient: str


class MessagesOut(BaseModel):
    messages: List[MessageOut]


class MessageUpdate:
    title: Optional[str]
    body: Optional[str]
    isRead: bool = Field(default=False)
    date: str
