# Databases-Miniproject-2: NoSQL Databases

Assignment: [Miniproject-2: NoSQL Databases](https://app.peergrade.io/assignment/8ea20245-6b73-4a9f-b681-884725737eea/attachment)

## How to run with Docker

### Redis  

code block the below [TODO]

- Network --> docker network create app-tier --driver bridge
- Redis Server --> docker run -d --name redis-server -e ALLOW_EMPTY_PASSWORD=yes -p 6379:6379 --network app-tier bitnami/redis:latest
- Redis CLI --> docker run -it --rm  --network app-tier bitnami/redis:latest redis-cli -h redis-server

### MongoDB

```
docker run -p 27017:27017 -e MONGO_INITDB_DATABASE=stuff --name mongodb -d mongo
```

## Tasks 

### Summary

The assignment task is to select two NoSQL databases, and use a large data source as test data, to assess their features and performance.

We chose to use the databases **MongoDB** and **Redis** for this assignment. We figured these twO databases were different enough to give potential different results when comparing them in the task at hand.  

### Databases 
MongoDB is a document-based database, known for its efficiency and scalability.

Redis is an in-memory, key-value-based database that is fairly simple to setup and has a very fast response time. 

### Prior Expected Database behavior

We expect that (simple) queries against the Redis database will be faster the queries against the MongoDB database, because Redis database model is in-memory. Thus, Redis offer speed in simple scenarios (but more complexity when using more complicated queries).

On the other hand, in scenaries with a lot of complex queries, queries using MongoDB might be easier. Thus, MongoDB offer simplicity in more complex scenarios (but less speed).


### Data source

The data source used as data for both databases, is a datased from [http://eforexcel.com/](http://eforexcel.com/wp/downloads-18-sample-csv-files-data-sets-for-testing-sales/). The dataset consists of 10000 Random Sales Records, to be used for Testing. The data format is a .csv file ([records.csv](records.csv))


*Overview of the fields which appear as part of the csv file ([source](http://eforexcel.com/wp/downloads-18-sample-csv-files-data-sets-for-testing-sales/)):*

![Fields](/images/fields.png)

*reports.csv snippet:*

```
Sub-Saharan Africa,Chad,Office Supplies,Online,L,1/27/2011,292494523,2/12/2011,4484,651.21,524.96,2920025.64,2353920.64,566105.00
```

### Database operations, to be used for comparison & comparison criteria

We chose to test **insertion**  and **retrieval** operations, with the thought that this is useful to test in regards to Big Data. With Big Data you have huge amounts of data and the same goes for our situation where we have 500.000 sales records in a CSV file. 

We also thought it made sense to test insertion and retrieval **time** since this can vary a lot using different databases. 

#### MongoDB

![mongo time](/images/mongo_time.PNG)

#### Redis

![redis time](/images/redis_time.PNG)

Furthermore, we chose to compare the **memory** & **storage** usage of each database, after data insertion. 

(MongoDB stores the data on the harddrive, and redis in-memory.)

#### MongoDB

![mongo size](/images/mongo_size.PNG)

#### Redis

![redis size](/images/redis_size.PNG)



### Demo code for testing

- code snippets from files goes here with explanations of logic [TODO]

### Results and conclusions

- evaluate results, factors etc. [TODO]

## Author Details

**Group: Team Wing It**
- *Alexander Winther Hørsted-Andersen* (cph-ah353@cphbusiness.dk)
- *Andreas Due Jørgensen* (cph-aj285@cphbusiness.dk)
- *Mathias Bigler* (cph-mb493@cphbusiness.dk)
- *Stanislav Novitski* (cph-sn183@cphbusiness.dk)
