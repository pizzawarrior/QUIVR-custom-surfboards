## To run tests:

- ensure your docker containers are running
- go into the fastapi container and click into the Exec tab
- run `pytest` to run ALL TESTS, **Or**
- select the individual test you would like to run `python -m pytest tests/test_create_order_invalid_token.py`
- change the path to run other tests

If you experience the "ModuleNotFoundError: No module named 'fastapi'" error:

- it could be that the Dockerfile is specifying a version of Python that is conflicting with the one you are running in VS Code
- you may have to download the Python version that the Dockerfile specifies, then select that version in the command palette in VS Code.

## General:

- There are several active accounts and orders.
- To access these, start the application `docker compose up`
- Go to localhost:3000/docs
- Here you will be able to query Swagger for accounts, orders, etc.

## Quick Login:

- Username: KellySlater
- PW: love
