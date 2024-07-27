import os
from fastapi import Depends
from typing import Optional, Tuple
from jwtdown_fastapi.authentication import Authenticator
from queries.accounts import AccountQueries
from models.accounts import AccountOutWithHashedPassword, AccountOut


class QuivrAuthenticator(Authenticator):
    async def get_account_data(
        self,
        username: str,
        accounts: AccountQueries,
    ) -> Optional[AccountOutWithHashedPassword]:
        account = accounts.get_one_by_username(username)
        if isinstance(account, AccountOutWithHashedPassword):
            return account
        return None

    def get_account_getter(
        self,
        accounts: AccountQueries = Depends(),
    ) -> AccountQueries:
        return accounts

    def get_hashed_password(self, account: AccountOutWithHashedPassword) -> str:
        return account.hashed_password

    def get_account_data_for_cookie(
        self, account: AccountOutWithHashedPassword
    ) -> Optional[Tuple[str, AccountOut]]:
        if not account or not isinstance(
            account, AccountOutWithHashedPassword
        ):
            return None
        account_out = AccountOut(**account.dict())
        return account.username, account_out


authenticator = QuivrAuthenticator(os.environ["SIGNING_KEY"])
