# long-file-process

Technology Used:
Node.js
Express.js
Express-handlebars (for fron-end)
Mongodb

Steps to run the assignment
This project is Dockerized 

Step 1. run the comment "docker-compose up", This will install all the necessary things

Step 2. In the browser type http://localhost will show the appication

Points to Achieve

1. Followed the OOPS Concepts

2. This application supports for regular non-blocking ingestion, able to process multiple request parllelly it doesn't wait for previous process to complete

3. All Products all insert to single collection called products. can see in the 
link : http://localhost/list/products

4. An aggreated collection will show the count of product with same name can see in the
link : http://localhost/list/count

5. updating data when upload the same csv file for two times exist collection will get update it won't allow one more inser operation if the record already exits it will update the values if it is not there it will insert the new values
