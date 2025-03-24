# QUIVR: Custom surfboard ordering made easy

### Problem Statement:

This application is designed to connect 3 types of users:

- Customers
- Surf shops
- Surfboard shapers

The surfing industry is projected to hit $10B in global sales by 2030. Meanwhile the custom surfboard ordering process remains stuck in the past, and rife with problems. Typically a customer places an order through a surfshop, and the surfshop places the order with the shaper. The customer has no visibility into this process once the order is placed, and rarely receives confirmation that the shaper has even received the order! From there it is anyone's guess on when the board will be finished, and in what state the order is in. Often mistakes are made, and the customer ends up receiving something different than what they ordered.

QUIVR steps in by streamlining the ordering process: orders are placed with shapers directly through the app, and shapers can send status updates directly to customers. This removes the burden from the surf shop of having to mediate the process, as well as greatly reducing the margin for errors to occur in the ordering process.

### User Profiles:

![User Profile 1](https://github.com/pizzawarrior/quivr/assets/94874182/f664ebb3-a723-41f1-9611-f844105e31cf)

![User Profile 2](https://github.com/pizzawarrior/quivr/assets/94874182/1571d5da-09b1-4e55-8372-77e9c244321e)

![User Profile 3](https://github.com/pizzawarrior/quivr/assets/94874182/a8937864-fb67-41a7-8102-4dde2e3e0619)

### Technical Details:

This project was built using MongoDB with FastAPI and pyMongo for the backend, with an Atlas Cloud database. JWT-Down was used for Auth, and Docker is used for creating a stable environment to deploy the project in. React was used for the front end, along with help from Redux to carefully manage state, and Axios to fetch the data, as well as Styled Components for cleanly managing styles. Test coverage is implemented via PyTest for CI/CD.

:no_entry_sign: Absolutely NO bootstrap or comparable style libraries were used in the creation of this project.

### Team:

- Jessica Dickerson - Backend Auth, Users backend, React frontend, frontend style structure
- Michael Aguilar - Reviews backend, React, UI and Graphic Design
- Ian Norstad - Orders backend, React and Redux, UI and Graphic Design, testing, deployment, and this README!

## Running the Project

To view the deployed project:

1. Open https://spidergrrljess.gitlab.io/module3-project-gamma/ in your browser
2. Click the Login button
3. Click Sign Up to register your new account
4. Once the form is submitted, you will be logged in and will have full customer access, including making a custom surfboard order, viewing your order history, and leaving reviews for completed orders

To view this project locally:

1. Make sure to have Docker Desktop downloaded and open, and a Mongo DB Atlas Cloud account
2. Clone this repo.
3. Create a `.env` file in the root directory. Add the following MongoDB variables to this file to connect your database: <br/>
   `REACT_APP_API_HOST=http://localhost:8000` <br/>
   `CONNECTION_STRING='your/mongodb/atlas/cloud/connections/string'` <br/>
   `DB_NAME=quivr-db` <br/>
   `USER_NAME=your_username` <br/>
   `USER_PW=your_password` <br/>
4. `cd` into this project directory and run `docker compose up`
5. Successful launch should build 3 Docker containers and log a 'Compiled successfully!' message in the console
6. The project can now be viewed in the browser: `http://localhost:3000`
7. You can now create a customer account in the browser
8. To test the backend routes go to the Swagger UI here: `http://localhost:8000/docs`
9. You will need to create a shaper account to create an order, click here and fill out all criteria: `http://localhost:8000/docs#/Auth/create_account_accounts_post`
10. Now when you go back to the homepage for the site and log in with your customer creds you should be able to select the shaper account you created in Swagger, and create a surfboard order
11. If order creation was successful the order should populate on your Order History page
12. You can also log in as the shaper you created, and update the status of your current orders by clicking the Order History page

### Manual Testing

To run tests manually, inside of the Docker container:

- Make sure the `Fastapi` Docker container is running
- In the Docker Desktop app, click on the `Fastapi` container, then on the `Exec` tab
- Paste the following command into the terminal and press enter: `python -m pytest tests/test_accounts.py`
- Change the path accordingly to run the other tests

To check the overall test coverage and generate a coverage report:

- Make sure the `Fastapi` Docker container is running
- In the Docker Desktop app, click on the `Fastapi` container, then on the `Exec` tab
- Paste into the terminal and run: `coverage run -m pytest -v tests && coverage report -m`

## App Design

![Application Architecture](https://github.com/pizzawarrior/quivr/assets/94874182/279f7227-e73e-441e-ba95-bd8bf44cce9b)

### Endpoints

![Application Endpoints](https://github.com/pizzawarrior/quivr/assets/94874182/40be4743-9f2b-49f4-9744-a36f622d75a1)

### Backend Auth and the Accounts Model

The Accounts model provides a framework for all necessary data for user accounts.

- id: this is a unique string created by MongoDB.
- username: a unique string identifier for each user
- password: the passcode to allow for authentication
- email: user email address
- first_name: user first name
- last_name: user last name
- phone_number: the user's phone number
- role: the user role type, which dictates permissions and frontend experience. The possible roles are "customer", "shaper", and "admin".
- id: this is a unique string created by MongoDB.
- username: a unique string identifier for each user
- password: the passcode to allow for authentication
- email: user email address
- first_name: user first name
- last_name: user last name
- phone_number: the user's phone number
- role: the user role type, which dictates permissions and frontend experience. The possible roles are "customer", "shaper", and "admin".

The backend auth is achieved utilizing the Accounts modal. The important data for the purpose of authentication and username and password.

### Reviews Model

The Reviews module provides a model for representing reviews. It includes attributes such as:

- id: unique identifier for the review, automatically generated using MongoDB
- date: string
- rating: an integer that allows customers to add a rating to a review
- title: string; title of review
- description: string; add text to a review
- id: unique identifier for the review, automatically generated using MongoDB
- date: string
- rating: an integer that allows customers to add a rating to a review
- title: string; title of review
- description: string; add text to a review

The following properties can be updated: "title","rating", and "description".

### Orders Model

The Orders model represents all of the properties required to create a custome surfboard order. These include:

- order_id: unique identifier for the review, automatically generated using MongoDB
- date: string
- reviewed: boolean; displays the status of whether the order has been reviewed or not
- order_status: string; displays current status of order, as updated by the shaper
- customer_username: string; name used when customer creates account
- surfboard_shaper: string; name selected from options on form
- surfboard_model: string; name of surfboard model
- surfboard_length: int; number signifying length of board
- surfboard_width: int, number signifying width of board
- surfboard_thickness: int; number signifying thickness of board
- surfboard_construction: string; describes the foam construction of the board
- surfboard_fin_system: string; users select their desired modern fin system
- surfboard_fin_count: int; number of fin plugs on board
- surfboard_tail_style: string; users select from list of modern options
- surfboard_glassing: string; users select from list of common options
- surfboard_desc: string | optional; users can add additional details such as color, or other requests

The only properties that can be updated on this model are whether the order has been reviewed or not, and what the status is.

### Demo Pages

<img width="1721" alt="Home-page" src="https://github.com/pizzawarrior/quivr/assets/94874182/100164dd-7036-437d-9f7f-f27c648767e2">

## Future Iterations of QUIVR

- Reviews will be visible from the landing page, along with a short snapshot summary
- Invoices will be added, so customers can view a collection of them
- Payment functionality will be integrated by way of Stripe
- Orders will be searchable by order_id
- Shapers will be able to bulk-update orders by selecting a checkbox next to each open order, and selecting an order status from a dropdown
- In-app messaging will connect customers and shapers, should any clarification on orders be required
- Email capability for when an order status is updated, or a new message is logged
