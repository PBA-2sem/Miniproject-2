# Databases-Miniproject-2: NoSQL Databases

Assignment: [Miniproject-2: NoSQL Databases](https://app.peergrade.io/assignment/8ea20245-6b73-4a9f-b681-884725737eea/attachment)

## How to run with Docker

### Redis  

```docker
# Network
docker network create app-tier --driver bridge

# Redis Server
docker run -d --name redis-server -e ALLOW_EMPTY_PASSWORD=yes -p 6379:6379 --network app-tier bitnami/redis:latest

# redis CLI
docker run -it --rm  --network app-tier bitnami/redis:latest redis-cli -h redis-server
```

### MongoDB

```docker
docker run -p 27017:27017 -e MONGO_INITDB_DATABASE=stuff --name mongodb -d mongo
```

## Tasks 

### Summary

The assignment task is to select two NoSQL databases, and use a large data source as test data, to assess their features and performance.

We chose to use the databases **MongoDB** and **Redis** for this assignment. We figured these twO databases were different enough to give potential different results when comparing them in the task at hand.  

### Databases 
**MongoDB** is a document-based database, known for its efficiency and scalability.

**Redis** is an in-memory, key-value-based database that is fairly simple to setup and has a very fast response time. 

### Prior Expected Database behavior

#### Insertion
We expect that the time for inserting data into the databases, will be longer for mongoDB than for Redis, because inserting data "in-memory" should be faster than storing data on disk.

#### Retrieval
We expect that (simple) queries against the Redis database will be faster than the queries against the MongoDB database, because Redis database model is in-memory. Thus, Redis offer speed in simple scenarios.

### Data Source

The data source used as data for both databases, is a datased from [http://eforexcel.com/](http://eforexcel.com/wp/downloads-18-sample-csv-files-data-sets-for-testing-sales/). The dataset consists of 500k Random Sales Records, to be used for Testing. The data format is a .csv file ([records.csv](records.csv))


*Overview of the fields which appear as part of the csv file ([source](http://eforexcel.com/wp/downloads-18-sample-csv-files-data-sets-for-testing-sales/)):*

![Fields](/images/fields.png)

*reports.csv snippet:*

```
Sub-Saharan Africa,Chad,Office Supplies,Online,L,1/27/2011,292494523,2/12/2011,4484,651.21,524.96,2920025.64,2353920.64,566105.00
```

### Database operations, to be used for comparison & comparison criteria

We chose to test **insertion**  and **retrieval** operations, with the thought that this is useful to test in regards to Big Data. With Big Data you have huge amounts of data and the same goes for our situation where we have 500.000 sales records in a CSV file. 

We also thought it made sense to test insertion and retrieval **time** since this can vary a lot using different databases. 

Furthermore, we chose to compare the **memory** & **storage** usage of each database, after data insertion. 

### Demo code for testing

#### MongoDB
We execute ```node mainMongoDB.js``` to run the code for testing our redis database. The code can be viewed [here](mainMongoDB.js)

#### Redis
We execute ```node mainRedis.js``` to run the code for testing our redis database. The code can be viewed [here](mainRedis.js)

In each scenario, the .csv data is loaded and inserted into each database, and the time for insertion is meassured. Afterwards, we retrieve a known stored entity 10k times, to meassure the average retrieval time. 


### CAP

#### Redis
There is a lot of discussions about what whether the CAP is applicaple to redis. And the catagory floats around quite a bit. However, redis runs with a Master/Slave architecture. This means that, when the master fails, it quietly promotes a slave to be the a new master, but still functions as a single client system. This makes the redis solution highly available (A), as a master can fail for muliple reasons. (e.g lack of memory). If this happen the data will still be available. 

Redis is highly consistent because it more often than not, runs a single client set up. This means that the Data will always be concistent when you query for a result. 

For these reasons redis falls under the CA catagory with default configurations, and here the book (seven databases) seems to agree.

#### MongoDB

MongoDB is strongly consistent when you use a single connection, and with multiple connections, MongoDB becomes Eventually Consistent. 

With Replica-Sets MongoDB also achieves partition tolerancy.

Therefore, the book (seven databases) seems to state that MongoDB seems to fit under the CP category.

### ACID

#### Redis

In the sence of ACID, the ACID principel is not supported, Since Redis is not a transactional database.

#### MongoDB

MongoDB is ACID compliant on the document level.

Any update to a single document is:

Atomic: it either fully completes or it does not
Consistent: no reader will see a "partially applied" update
Isolated: again, no reader will see a "dirty" read
Durable: (with the appropriate write concern)

## Results

### Storage

#### MongoDB

Using MongoDB Compass (A mongodb GUI), we can see that MongoDB stores the data on the harddrive::

![mongo size](/images/mongo_size.PNG)

#### Redis

From Redis terminal, we can see that Redis stores the data in memory:

![redis size](/images/redis_size.PNG)

### Time

#### MongoDB

The MongoDB timings are:

```cmd
$ node mainMongoDB.js
Loading Data...
Inserting Data...
Inside insert function..
after connection function..
Retrieving data...
MongoDB - Time to store all docs : 14790.100300997496ms
MongoDB - Time to get single record average : 1.2917432250100374ms
```

#### Redis

The Redis timings are:

```cmd
$ node mainRedis.js
Loading Data...
Inserting Data...
Retrieving data...
Redis - Time to store all docs in : 2081.9921000003815ms
Redis - Time to get single record average : 0.12627312000006438ms
```

## Conclusion

The results are generated on a random developer pc. Thus, local hardware & software influences the execution time.
 
Even so, we can see  that there is a vast difference between the insertion and retrieval time between mongoDB and Redis, which highly favors Redis (in these specific scenarios).

## Author Details

**Group: Team Wing It**
- *Alexander Winther Hørsted-Andersen* (cph-ah353@cphbusiness.dk)
- *Andreas Due Jørgensen* (cph-aj285@cphbusiness.dk)
- *Mathias Bigler* (cph-mb493@cphbusiness.dk)
- *Stanislav Novitski* (cph-sn183@cphbusiness.dk)
