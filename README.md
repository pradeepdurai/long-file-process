# long-file-process

#### Technology Used:

Node.js
Express.js
Express-handlebars (for fron-end)
Mongodb

## Steps to run the assignment

This project is Dockerized 

Step 1. run the comment "docker-compose up", This will install all the necessary things

Step 2. In the browser type http://localhost will show the appication

## Table Schema

No.1 Products -> Storing all the products data
No.2 Productsinfo -> To Store the number of products with same name

## Points to Achieve Done 

1. Followed the OOPS Concepts

2. This application supports for regular non-blocking ingestion, able to process multiple request parllelly it doesn't wait for previous process to complete

3. All Products all insert to single collection called products. can see in the 
link : http://localhost/list/products after docker installation

4. An aggregate collection will show the count of product with same name can see in the
link : http://localhost/list/count

5. updating data --> when user uploads the same csv file for two times exist collection will get updated it won't allow one more insert operation if the record already exits, it will update the values if it is not there in collection then it will insert the new values

##  Not done from “Points to achieve”
1. Updating a Single Product

## What would you improve if given more days
i will find the better solution to store the data in more efficent way

