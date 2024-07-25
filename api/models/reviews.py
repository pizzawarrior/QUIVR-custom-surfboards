from typing import Optional
from pydantic import BaseModel


class ReviewIn(BaseModel):
    rating: int
    title: str
    description: str
    shaper: str
    order_id: str


class ReviewOut(BaseModel):
    id: str
    date: str
    rating: int
    title: str
    description: str
    customer: str
    shaper: str
    order_id: str


class ReviewUpdate(BaseModel):
    title: Optional[str]
    description: Optional[str]
    rating: Optional[int]
