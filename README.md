# Cloning #
Ensure you have node.js installed before continuing 

1) Clone the repository

`git clone https://github.com/zeal3/Expense-Tracker.git`

# MySql Database Setup #

2) Download and install MySql

3) Install MySql Server and MySql Workbench

4) Open MySql Workbench and select the "MySql Connections" tab (dolphin on the left panel)

5) Create a new connection in MySql by pressing the + and enter in the correct information

6) Open up your newly created connection and create a new sql tab for executing queries

7) Run the following set of queries to create and setup the database for our backend to use:

```
CREATE DATABASE expensedb;
use expensedb;
CREATE TABLE expenses(id INT PRIMARY KEY,name VARCHAR(1024) NOT NULL, cost DECIMAL(10,2) NOT NULL, category VARCHAR(30) NOT NULL);
```

# Backend Setup #

1) Inside the backend folder "expense-tracker-backend" run the following command in a terminal/cmd:

`npm install`

2) Inside dbupdater.js edit the connection variable to point to your MySql Server that you've just installed: 

```
const connection = sql.createConnection({
    host : '127.0.0.1',
    port : '3306',
    user : 'root',
    password : '123',
    database : 'expensedb'
});
```

Where Host, Port, User, Password are the ip+port and credentials for your MySql Server
database : 'expensedb' can be kept as is since this is the name of our created database from our previous queries

3) Install Mysql package

`npm install mysql --save`

4) Install Express package

`npm install express --save`

5) Start the backend server

`node server.js`

# Frontend Setup #
1) Inside the frontend folder "expense-tracker" run the following command in a terminal/cmd:

`npm install`

2) Start the front end client

`npm start`

3) Visit http://localhost:3000/ to check out the expense tracker :)

# TroubleShooting #
By default the backend server listens on port 5000 and the front end server is hosted on port 3000

## Frontend configuration ##
In the folder "expense-tracker" inside .env verify the following line is the backends address

 `REACT_APP_SERVER = http://localhost:5000`

## Backend configuration ##
In server.js 

you can modify the port that the backend listens to:

`const port = <Enter port number>;`

Ensure the correct url to the front end for cors from the line:

`resp.setHeader('Access-Control-Allow-Origin','http://localhost:3000');`

In dbupdater.js

Verify the connection variable points to your MySql Server

## Database Verification ##
Verify there is a database named 'expensedb' using MySql Workbench

Verify there is a table named 'expenses' created from the past command:

`CREATE TABLE expenses(id INT PRIMARY KEY,name VARCHAR(1024) NOT NULL, cost DECIMAL(10,2) NOT NULL, category VARCHAR(30) NOT NULL);`


