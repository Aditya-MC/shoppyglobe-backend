**🛍️ ShoppyGlobe RESTful API**


GIT Link : https://github.com/Aditya-MC/shoppyglobe-backend

**📌 Project Overview**

This project implements a RESTful API for an e-commerce app (ShoppyGlobe).

**✨ Features:**

🛒 Products → List, Detail

📦 Cart → Add, Update Quantity, Delete

👤 Users → Register & Login (JWT)

🗄 MongoDB → Products & Cart storage

🛡 Middleware → Logging, Validation, Error Handling

🧪 Thunder Client → For API Testing

**🛠 Tech Stack**

⚡ Node.js (v18+ recommended)

🚀 Express.js

🍃 MongoDB (Atlas or Local)

🧩 Mongoose (ODM)

🔑 JWT (Authentication)

🧪 Thunder Client (VSCode Extension)

🔑 API Endpoints
🔐 Authentication
POST /register

Registers a new user.

Request Body:

{
  "name": "Aditya",
  "email": "aditya@example.com",
  "password": "strongpassword"
}


✅ Response: 201 Created (user object without password)
❌ Error: 400 Bad Request

POST /login

Logs in a user and returns a JWT token.

Request Body:

{
  "email": "aditya@example.com",
  "password": "strongpassword"
}


✅ Response:

{ "token": "JWT_TOKEN" }


❌ Error: 401 Unauthorized

⚠️ Cart routes require → Authorization: Bearer <token>

📦 Products
GET /products

Fetches all products.

✅ Response: 200 OK (array of products)

GET /products/:id

Fetches a single product by MongoDB _id.

✅ Response: 200 OK

❌ Error: 404 Not Found

🛒 Cart (Protected)
POST /cart

Adds an item to the user’s cart.

Request Body:

{
  "productId": "<product_id>",
  "quantity": 2
}


✅ Response: 201 Created
❌ Error: 400 Bad Request

PUT /cart/:itemId

Updates the quantity of a cart item.

Request Body:

{ "quantity": 3 }


✅ Response: 200 OK
❌ Error: 404 Not Found

DELETE /cart/:itemId

Removes an item from cart.

✅ Response: 200 OK
❌ Error: 404 Not Found



⚙️ Middleware & Validation

📝 Request Logger → Logs method, URL & status code.

🔑 Auth Middleware → Verifies JWT and attaches req.user.

✅ Validation Middleware → Checks required fields in POST /cart, POST /register, and POST /products. Returns 400 Bad Request if missing fields.

🚨 Error Handler → Central handler returning { error: "message" } with correct HTTP codes.

🚀 How to Run Locally

# Clone repo
git clone https://github.com/Aditya-MC/shoppyglobe-backend
cd shoppyglobe-backend

# Install dependencies
npm install

# Start server
npm run dev


📍 Server runs at → http://localhost:5100


