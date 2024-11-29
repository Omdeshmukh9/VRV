
# Node.js Based Role Based Access

App made as Assignment for Intenship 


## Features

- **Registration**: New users can register with a username, password, and role.
- **Login**: Users can log in using their username and password to receive a JWT token.
- **Role-Based Redirection**: Based on the user's role, they will be redirected to a different page:
  - **Admin**: Redirected to `/admin`
  - **Moderator**: Redirected to `/moderator`
  - **User**: Redirected to `/user`
- **Protected Routes**: Certain routes are protected and require a valid JWT token for access.

## Technologies Used

- **Frontend**: React, React Router
- **Backend**: Node.js, Express, JWT Authentication
- **Database**: MongoDB
- **Authentication**: JWT (JSON Web Token)

## Prerequisites

Before running the project, ensure that you have the following installed on your local machine:

- [Node.js](https://nodejs.org/en/) (v14 or higher)
- [npm](https://www.npmjs.com/get-npm) (v6 or higher)
- [MongoDB](https://www.mongodb.com/try/download/community) (installed and running locally or via a cloud service like MongoDB Atlas)

# Clone the repository
git clone https://github.com/Omdeshmukh9/VRV.git


##Navigate to the backend directory
cd backend 

##Install all the required dependencies
npm install 

# Start the backend server
npm start

# Once the backend is running, navigate to the frontend directory
cd ../frontend

# Install frontend dependencies
npm install

# Start the frontend server
npm start


