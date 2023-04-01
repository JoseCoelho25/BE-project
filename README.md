# BE-project

Shop-Easy
E-commerce-clothes shop

This project was developed as part of the final project for the Full-Stack Web Development course at Flag.pt. I would like to thank Fernando for providing guidance and support throughout the course. I would also like to thank my classmates for their feedback and suggestions during the development of this project.

Tech Stack
Node.js: for server-side JavaScript
Express.js: for building the API
MongoDB: for the database
Mongoose: for modeling data in MongoDB
React + Vite for the client-side

Dependencies on server-side
bcryptjs: for password hashing
body-parser: for parsing incoming request bodies
cookie-parser: for parsing cookies
colors: for colorful console logs
cors: for enabling cross-origin resource sharing
dotenv: for loading environment variables from a .env file
express: for building the API
express-validator: for request validation
jsonwebtoken: for generating and verifying JWTs
express-fileupload: for handling file uploads
mongoose: for connecting to MongoDB
morgan: for HTTP request logging
uuidv4: to create unique image file names
nodemon: for automatic server restarts during development
socket.io: for real-time communication
stripe: for handling payment methods

Dependencies on client-side
@reduxjs/toolkit: for handling global states on react
@stripe/react-stripe-j": for handling payments in client-side
js-cookie: to handle cookies set 
react: framework
react-icons: navigation icons
react-redux: global state manager
react-router-dom: for dynamic routing
socket.io-client: for real-time communication

Development
To set up the development environment:

Prerequisites:

Node.js installed on your machine
MongoDB database collection created

Clone the repository
git clone https://github.com/JoseCoelho25/BE-project.git

Navigate to the project directory:

First the server
cd backend
To install the dependencies run:
npm install
Create a .env file based on the provided env.default file at the root folder, and fill in the required environment variables.

Seed the database with some initial data by running the following command:
node seeder.js -i

To start a local development server run:
npm start
The api will be available at http://localhost:5000

Second the client:
cd frontend
cd e-commerce-shop
To install the dependencies run:
npm install

To start local development server run:
npm run dev
The client will be available at http://localhost:5173


API Documentation


Tips or advice on how to improve are very welcome, thank you all!

Linkedin
