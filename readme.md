# 💳 Simple Banking System

A full-stack banking application that allows users to create accounts, perform transactions, and manage their finances seamlessly. Built with a modern technology stack, this project demonstrates the integration of frontend and backend systems to simulate basic banking operations.

## 🚀 Features

- **User Registration & Authentication**: Secure user signup and login functionalities.
- **Account Management**: Create and manage multiple bank accounts per user.
- **Transaction Handling**: Perform deposits, withdrawals, and view transaction history.
- **Responsive UI**: User-friendly interface compatible with various devices.
- **API Integration**: Robust backend APIs to handle all banking operations.

## 🛠️ Tech Stack

- **Frontend**:

  - [React](https://reactjs.org/): For building interactive user interfaces.
  - [TypeScript](https://www.typescriptlang.org/): Adds type safety to JavaScript.
  - [CSS](https://developer.mozilla.org/en-US/docs/Web/CSS): Styling the application.

- **Backend**:
  - [Node.js](https://nodejs.org/): JavaScript runtime environment.
  - [Express](https://expressjs.com/): Web framework for Node.js.
  - [Prisma](https://www.prisma.io/): Next-generation ORM for database access.
  - [SQLite](https://www.sqlite.org/index.html): Lightweight relational database.

## ⚙️ Installation & Setup

### Prerequisites

- [Node.js](https://nodejs.org/) installed on your machine.
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/) as the package manager.

### Steps

1. **Clone the repository**:

   ```bash
   git clone https://github.com/anurag9601/simple-banking-system.git
   cd simple-banking-system
   ```

### Setup the Backend

cd server
npm install
npx prisma migrate dev --name init
npm run dev

This will start the backend server on http://localhost:8000.

### Setup the Frontend

cd client
npm install
npm start

The frontend application will run on http://localhost:5173

### Usage

Register a new user account.

Login with your credentials.

Create a bank account.

Perform Transactions:

Deposit funds.

Withdraw funds.

View transaction history.

