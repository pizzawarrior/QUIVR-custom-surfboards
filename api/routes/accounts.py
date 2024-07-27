from fastapi import (
    APIRouter,
    Request,
    Response,
    Depends,
    HTTPException,
    status,
    Body,
)
from models.accounts import (
    AccountToken,
    HttpError,
    AccountIn,
    AccountForm,
    AccountOut,
    AccountUpdate,
)
from queries.accounts import AccountQueries, DuplicateAccountError
from authenticator import authenticator
from typing import List


router = APIRouter()


@router.post("/accounts", response_model=AccountToken | HttpError)
async def create_account(
    info: AccountIn,
    request: Request,
    response: Response,
    repo: AccountQueries = Depends(),
):
    print("Received account creation request with data:", info.dict())
    hashed_password = authenticator.hash_password(info.password)

    try:
        account = repo.create(info, hashed_password)
    except DuplicateAccountError:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Duplicate Account Error: Cannot create an account with provided credentials",
        )
    except Exception as e:
        print("Unexpected error during account creation:", str(e))
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Internal Server Error"
        )
    form = AccountForm(username=info.username, password=info.password)
    token = await authenticator.login(response, request, form, repo)
    return AccountToken(account=account, **token.dict())


# For admins to add in 'shaper' accounts
@router.post("/accounts/add", response_model=dict | HttpError)
async def create_account_without_login(
    info: AccountIn,
    repo: AccountQueries = Depends(),
    account_data: dict = Depends(authenticator.get_current_account_data),
):
    hashed_password = authenticator.hash_password(info.password)

    role = account_data["role"]

    if role != "admin":
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="You do not have the correct permissions",
        )
    try:
        return repo.create(info, hashed_password)
    except DuplicateAccountError:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Duplicate Account Error: Cannot create an account with those credentials",
        )


@router.get("/token", response_model=AccountToken | None)
async def get_token(
    request: Request,
    account: AccountOut = Depends(authenticator.try_get_current_account_data),
) -> AccountToken | None:
    if account and authenticator.cookie_name in request.cookies:
        return {
            "access_token": request.cookies[authenticator.cookie_name],
            "type": "Bearer",
            "account": account,
        }


@router.get("/accounts", response_model=List[AccountOut])
def list_accounts(repo: AccountQueries = Depends()):
    accounts = repo.get_all_accounts()
    return accounts


@router.get("/accounts/{role}", response_model=List[AccountOut])
def list_accounts_by_role(
    role: str,
    repo: AccountQueries = Depends(),
    account_data: dict = Depends(authenticator.get_current_account_data),
):
    accounts = repo.get_accounts_by_role(role)
    return accounts


@router.get("/accounts/username/{username}", response_model=AccountOut)
def get_account_by_username(
    username: str,
    repo: AccountQueries = Depends(),
    account_data: dict = Depends(authenticator.get_current_account_data),
):
    if repo.get_one_by_username(username) is not None:
        return repo.get_one_by_username(username)
    raise HTTPException(
        status_code=status.HTTP_404_NOT_FOUND,
        detail=f"Account with username {username} not found",
    )


@router.put("/accounts/{username}", response_model=AccountOut)
def update_account(
    username: str,
    account: AccountUpdate = Body(...),
    repo: AccountQueries = Depends(),
    account_data: dict = Depends(authenticator.get_current_account_data),
):
    return repo.update(username, account)


@router.delete("/accounts/{username}")
def delete_account(
    username: str,
    repo: AccountQueries = Depends(),
    account_data: dict = Depends(authenticator.get_current_account_data),
):
    return repo.delete(username)
