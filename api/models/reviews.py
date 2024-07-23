from typing import Optional, List
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


# TODO: We are not actually implementing this yet. Would need to update queries/reviews.py and routes/reviews.py
class ReviewsOut(BaseModel):
    reviews: List[ReviewOut]


class ReviewUpdate(BaseModel):
    title: Optional[str]
    description: Optional[str]
    rating: Optional[int]
