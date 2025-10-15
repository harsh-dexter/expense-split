# Expense Splitter

This is a full-stack application designed to help users split expenses within groups. It consists of a React frontend and a Node.js/Express backend with a MongoDB database.

## Project Structure

```
expense-splitter/
|
|-- client/         # The React frontend
|   |-- public/
|   |   `-- index.html
|   |
|   |-- src/
|   |   |-- components/
|   |   |   |-- AddGroupModal.jsx
|   |   |   |-- BalanceSummary.jsx
|   |   |   |-- Dashboard.jsx
|   |   |   |-- EditGroupModal.jsx
|   |   |   |-- ExpenseForm.jsx
|   |   |   |-- ExpenseList.jsx
|   |   |   |-- Footer.jsx
|   |   |   |-- GroupCard.jsx
|   |   |   |-- GroupDetail.jsx
|   |   |   |-- Header.jsx
|   |   |   |-- icons.jsx
|   |   |   `-- SettlementPlan.jsx
|   |   |
|   |   |-- services/
|   |   |   `-- apiService.js
|   |   |
|   |   |-- App.jsx
|   |   |-- index.css
|   |   `-- main.jsx
|   |
|   |-- package.json
|   `-- tailwind.config.js
|
|-- server/         # The Node.js/Express backend
|   |-- models/
|   |   `-- groupModel.js
|   |
|   |-- routes/
|   |   `-- api.js
|   |
|   |-- .env
|   |-- package.json
|   `-- server.js
|
|-- .gitignore
`-- README.md
```

## Getting Started

### Prerequisites

- Node.js (LTS version recommended)
- npm or Yarn
- MongoDB (running locally or accessible via a connection string)

### Backend Setup

1.  Navigate to the `server` directory:
    ```bash
    cd server
    ```
2.  Install dependencies:
    ```bash
    npm install
    # or
    yarn install
    ```
3.  Create a `.env` file in the `server` directory with your MongoDB connection string and port:
    ```
    MONGODB_URI=mongodb://localhost:27017/expense-splitter
    PORT=5001
    ```
    Adjust `MONGODB_URI` if your MongoDB instance is running elsewhere or requires authentication.
4.  Start the backend server:
    ```bash
    npm start
    # or
    npm run dev (for development with nodemon)
    ```
    The server will run on `http://localhost:5001`.

### Frontend Setup

1.  Navigate to the `client` directory:
    ```bash
    cd client
    ```
2.  Install dependencies:
    ```bash
    npm install
    # or
    yarn install
    ```
3.  Start the frontend development server:
    ```bash
    npm run dev
    # or
    yarn dev
    ```
    The frontend will typically run on `http://localhost:5173` (or another port if 5173 is in use).

## Features

-   **Group Management:** Create, view, and edit expense groups.
-   **Member Management:** Add and remove members from groups.
-   **Expense Tracking:** Log expenses, specify who paid, and with whom it's split.
-   **Balance Calculation:** Automatically calculates individual balances within a group.
-   **Settlement Plan:** Generates a plan to settle debts efficiently.
-   **Theme Toggle:** Switch between light and dark modes.

## Technologies Used

### Frontend

-   React
-   Vite
-   Tailwind CSS

### Backend

-   Node.js
-   Express.js
-   Mongoose (for MongoDB object modeling)
-   MongoDB
-   CORS
-   Dotenv

## API Endpoints

All API endpoints are prefixed with `/api`.

### Groups

-   `GET /api/groups`: Get all groups with calculated balances and settlements.
-   `POST /api/groups`: Create a new group.
    -   Body: `{ "name": "string", "members": ["string"] }`
-   `GET /api/groups/:id`: Get a single group by ID with calculated balances and settlements.
-   `PUT /api/groups/:id`: Update a group's name and members.
    -   Body: `{ "name": "string", "members": ["string"] }`

### Expenses

-   `POST /api/groups/:id/expenses`: Add a new expense to a group.
    -   Body: `{ "description": "string", "amount": number, "paidBy": "string", "splitWith": ["string"] }`
