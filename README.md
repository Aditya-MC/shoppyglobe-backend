Project Overview

This project implements a RESTful API for an e-commerce app (ShoppyGlobe). It includes:

Products endpoints (list, detail)

Cart endpoints (add, update quantity, delete)

User registration & login (JWT)

MongoDB integration for products & cart

Middleware: request logging, validation, error handling

Thunder Client collection for testing


Tech Stack

Node.js (v18+ recommended)

Express.js

MongoDB (Atlas or local)

Mongoose (ODM)

JWT for auth

Thunder Client (VSCode) for testing


API Endpoints
Authentication

POST /register
Register new user. Body:

{
  "name": "Aditya",
  "email": "aditya@example.com",
  "password": "strongpassword"
}


Response: 201 Created + user (no password) or error 400.

POST /login
Login and receive JWT. Body:

{
  "email": "aditya@example.com",
  "password": "strongpassword"
}


Response: 200 OK + { token: "JWT_TOKEN" } or 401.

Protect cart routes using Authorization: Bearer <token> header.

Products

GET /products
Fetch products list. Response 200 OK + array.

GET /products/:id
Fetch single product by MongoDB _id. Response 200 OK or 404 Not Found.

(Products should have at least: name, price, description, stock)

Cart (protected)

POST /cart
Add item to user’s cart. Body:

{
  "productId": "<product_id>",
  "quantity": 2
}


Validates product exists & sufficient stock. Response 201 Created or 400.

PUT /cart/:itemId
Update quantity of a cart item. Body:

{ "quantity": 3 }


Response 200 OK or 404.

DELETE /cart/:itemId
Remove an item from cart. Response 200 OK or 404.

Data Models (summary)
Product
{
  _id: ObjectId,
  name: String,
  price: Number,
  description: String,
  stock: Number,
  createdAt: Date
}

Cart Item
{
  _id: ObjectId,
  userId: ObjectId,
  productId: ObjectId,
  quantity: Number,
  addedAt: Date
}

User
{
  _id: ObjectId,
  name: String,
  email: String,
  passwordHash: String
}

Middleware & Validation 

Request logger — logs method, url, and response statusCode (use res.on('finish', ...)).

Auth middleware — verifies JWT; attaches req.user.

Validation middleware — checks required fields on POST /cart, POST /register, POST /products (if you implemented product creation). Returns 400 Bad Request for missing fields.

Error handler — central express error handler sending JSON { error: "message" } with appropriate HTTP code.



