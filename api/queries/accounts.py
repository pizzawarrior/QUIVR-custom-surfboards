from queries.client import MongoQueries
from typing import Optional
from models.accounts import (
    AccountIn,
    AccountOutWithHashedPassword,
    AccountOut,
    AccountUpdate,
)
from fastapi import HTTPException, status, Body


class DuplicateAccountError(ValueError):
    pass


class AccountQueries(MongoQueries):
    collection_name = "accounts"

    def create(self, info: AccountIn, hashed_password: str) -> AccountOutWithHashedPassword:
        account = info.dict()
        # check if username already exists in db
        if self.get_one_by_username(account["username"]) is not None:
            raise DuplicateAccountError
        account["hashed_password"] = hashed_password
        del account["password"]
        try:
            response = self.collection.insert_one(account)
        except Exception as e:
            print("Error inserting account into the database:", str(e))
            raise
        if response.inserted_id:
            account["id"] = str(response.inserted_id)
            print("Account created with username:", account["username"])
        return AccountOutWithHashedPassword(**account)

    def get_one_by_username(self, username: str) -> Optional[AccountOutWithHashedPassword]:
        try:
            result = self.collection.find_one({"username": username})
            if result is None:
                return None
            result["id"] = str(result["_id"])
            return AccountOutWithHashedPassword(**result)
        except Exception as e:
            print(f"Error fetching user by username: {e}")
            return None

    def get_all_accounts(self) -> AccountOut:
        results = []
        for item in self.collection.find():
            item["id"] = str(item["_id"])
            results.append(item)
        return results

    def get_accounts_by_role(self, role: str) -> AccountOut:
        results = []
        for item in self.collection.find({"role": role}):
            item["id"] = str(item["_id"])
            results.append(item)
        return results

    def update(self, username: str, account: AccountUpdate = Body(...)):
        account = {k: v for k, v in account.dict().items() if v is not None}
        if len(account) >= 1:
            update_result = self.collection.update_one(
                {"username": username}, {"$set": account}
            )

        if update_result.modified_count == 0:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail=f"Account with username {username} not found",
            )

        if (
            existing_account := self.collection.find_one(
                {"username": username}
            )
        ) is not None:
            return existing_account

        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Account with username {username} not found",
        )

    def delete(self, username: str):
        delete_account = self.collection.find_one({"username": username})
        if not delete_account:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail=f"Account for {username} not found",
            )
        self.collection.delete_one({"username": username})
        return {"message": "successfully deleted"}
