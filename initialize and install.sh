mkdir top-products-microservice
cd top-products-microservice
npm init -y

INSTALL

npm install express axios uuid dotenv


RUN APLLICATION

node src/app.js

REQUEST

curl "http://localhost:3000/categories/Laptop/products?n=5&minPrice=1000&maxPrice=5000&sortBy=price&order=asc"

REQUSET

curl "http://localhost:3000/categories/Laptop/products/123e4567-e89b-12d3-a456-426614174000"

