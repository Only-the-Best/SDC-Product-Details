const pg = require('pg');
const connectionString = 'postgres://postgres@localhost:5432/mydb';
const newRelic = require('newrelic');

const pgClient = new pg.Client(connectionString);

pgClient.connect();

var createTable = 
`CREATE TABLE products
(
    id int NOT NULL,
    name varchar,
    rating numeric,
    reviewCount int,
    itemNum int,
    price numeric,
    mainImage varchar,
    images varchar
)` 

//  pgClient.query(createTable)
//  .then((res) => {
//      console.log('table created');
//  });

var importCSVFile = 
`COPY products(id, name, rating, reviewCount, itemNum, price, mainImage, images)
 FROM 'C:/Users/james/repo/SDC-PRODUCT-DETAILS/test.csv' DELIMITER ',' CSV HEADER;`;

// var initiate = function() {
//     pgClient.query(createTable)
//     .then(function() {
//         pgClient.query(importCSVFile);
//     })
// };
// initiate();
 pgClient.query(importCSVFile).then(function() {
     console.log('finished!');
 });

//  pgClient.query('INSERT INTO users(data) VALUES($1)', [newUser]);
