import os
from fastapi import Depends
from typing import Optional
from jwtdown_fastapi.authentication import Authenticator
from queries.accounts import AccountQueries
from models.accounts import AccountOutWithHashedPassword, AccountOut


class QuivrAuthenticator(Authenticator):
    async def get_account_data(
        self,
        username: str,
        accounts: AccountQueries,
    ):
        return accounts.get_one_by_username(username)

    def get_account_getter(
        self,
        accounts: AccountQueries = Depends(),
    ):
        return accounts

    def get_hashed_password(self, account: AccountOutWithHashedPassword):
        return account.hashed_password

    def get_account_data_for_cookie(
        self, account: AccountOutWithHashedPassword
    ) -> Optional[str]:
        if not account or not isinstance(
            account, AccountOutWithHashedPassword
        ):
            return None
        return account.username, AccountOut(**account.dict())


authenticator = QuivrAuthenticator(os.environ["SIGNING_KEY"])
