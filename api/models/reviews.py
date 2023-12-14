from typing import Optional
from pydantic import BaseModel


class ReviewsIn(BaseModel):
    rating: int
    title: str
    description: str
    shaper: str
    order_id: str


class ReviewsOut(BaseModel):
    id: str
    date: str
    rating: int
    title: str
    description: str
    customer: str
    shaper: str
    order_id: str


class ReviewsUpdate(BaseModel):
    title: Optional[str]
    description: Optional[str]
    rating: Optional[int]
