# MySQL utilisation

#####  Login

>  mysql -u root -p

```mysql
# Create a database
CREATE DATABASE DatabaseName;

# Use a database
USE DatabaseName;

# Will show all the tables
SHOW TABLES;

# Create a new table (All datatype can be found while following the link down this code block)
CREATE TABLE TableName (ID int NOT NULL AUTO_INCREMENT, colomnName VARCHAR(20), colomnName DATE, colomnName CHAR(1), PRIMARY KEY (ID));

# Will show the table information
DESCRIBE TableName;

# Will insert data in the table (The first values is null cause its the ID and it will auto increments)
INSERT INTO TableName
    -> VALUES (NULL, 'Colomn01Value', 'Colomn02Value');
```

DataType: https://dev.mysql.com/doc/refman/5.7/en/data-types.html