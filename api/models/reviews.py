from typing import Optional
from pydantic import BaseModel
from typing import List


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


class ReviewsOut(BaseModel):
    List[ReviewOut]


class ReviewUpdate(BaseModel):
    title: Optional[str]
    description: Optional[str]
    rating: Optional[int]
