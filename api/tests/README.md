To run tests:

- ensure your docker continers are running
- go into the fastapi container and click into the Exec tab
- run pytest

If you experience the 'ModuleNotFoundError: No module named 'fastapi' error:

- it could be that the Dockerfile is specifying a version of Python that is conflicting with the one you are running in VS Code
- you may have to download the Python version that the Dockerfile specifies, then select that version in the command palette in VS Code.
