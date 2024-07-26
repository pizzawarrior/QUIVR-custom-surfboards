from pydantic import BaseModel
from typing import Optional, List


class OrderIn(BaseModel):
    surfboard_shaper: str
    surfboard_model: str
    surfboard_length: float
    surfboard_width: float
    surfboard_thickness: float
    surfboard_construction: str
    surfboard_fin_system: str
    surfboard_fin_count: int
    surfboard_tail_style: str
    surfboard_glassing: str
    surfboard_desc: Optional[str]


class OrderOut(BaseModel):
    order_id: str
    date: str
    reviewed: bool
    order_status: str
    customer_username: str
    surfboard_shaper: str
    surfboard_model: str
    surfboard_length: float
    surfboard_width: float
    surfboard_thickness: float
    surfboard_construction: str
    surfboard_fin_system: str
    surfboard_fin_count: int
    surfboard_tail_style: str
    surfboard_glassing: str
    surfboard_desc: Optional[str]


class OrderUpdate(BaseModel):
    order_status: str
    reviewed: bool
