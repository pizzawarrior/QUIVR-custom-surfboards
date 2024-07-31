from typing import Optional
from pydantic import BaseModel, Field


class MessageIn(BaseModel):
    title: Optional[str]
    body: str
    is_read: bool = Field(default=False)
    recipient: str


class MessageOut(BaseModel):
    id: str
    title: Optional[str]
    body: str
    is_read: bool = Field(default=False)
    date: str
    sender: str
    recipient: str


class MessageUpdate(BaseModel):
    title: Optional[str]
    body: Optional[str]
