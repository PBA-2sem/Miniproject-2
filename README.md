# Databases-Miniproject-2: NoSQL Databases

Assignment: [Miniproject-2: NoSQL Databases](https://app.peergrade.io/assignment/8ea20245-6b73-4a9f-b681-884725737eea/attachment)

## How to run with Docker

### Redis
- Network --> docker network create app-tier --driver bridge
- Redis Server --> docker run -d --name redis-server -e ALLOW_EMPTY_PASSWORD=yes -p 6379:6379 --network app-tier bitnami/redis:latest
- Redis CLI --> docker run -it --rm  --network app-tier bitnami/redis:latest redis-cli -h redis-server

## Tasks 

### Summary

The assignment task is to select two NoSQL databases, and use a large data source as test data, to assess their features and performance.

We chose to use the databases **MongoDB** and **Redis** for this assignment. We figured these two databases were different enough to give potential different results when comparing them in the task at hand.  

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

### Database operations, to be used for comparison

x

### Selected comparison criteria

x

### Demo code for testing

x

### Results and conclusions

x

## Author Details

**Group: Team Wing It**
- *Alexander Winther Hørsted-Andersen* (cph-ah353@cphbusiness.dk)
- *Andreas Due Jørgensen* (cph-aj285@cphbusiness.dk)
- *Mathias Bigler* (cph-mb493@cphbusiness.dk)
- *Stanislav Novitski* (cph-sn183@cphbusiness.dk)