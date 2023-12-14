from pydantic import BaseModel
from jwtdown_fastapi.authentication import Token
from typing import Optional, Literal


class AccountIn(BaseModel):
    username: str
    password: str
    email: str
    first_name: str
    last_name: str
    phone_number: str
    role: Literal["customer", "shaper", "admin"]


class AccountForm(BaseModel):
    username: str
    password: str


class AccountOut(BaseModel):
    id: str
    first_name: str
    last_name: str
    username: str
    email: str
    phone_number: str
    role: str


class AccountUpdate(BaseModel):
    first_name: Optional[str]
    last_name: Optional[str]
    username: Optional[str]
    email: Optional[str]
    phone_number: Optional[str]
    role: Optional[str]


class AccountOutWithHashedPassword(AccountOut):
    hashed_password: str


class AccountToken(Token):
    account: AccountOut


class DuplicateAccountError(ValueError):
    pass


class HttpError(BaseModel):
    detail: str
