const path = require('path');
const express = require('express');
const sqlDriver = require('better-sqlite3');

// create a new web server 
const app = express();

// ask the web server to serve files from the frontend files
app.use(express.static(path.join(__dirname, '../frontend')));

// create a conection to the database
const db = new sqlDriver('../db/sqlite3-demo.db');

// make some REST routes
app.get('/api/products', (req, res) => {
  // Create a db query  as a prepared statement
  let stmt = db.prepare(`
   SELECT *
   FROM products
   `);
  // Run the query and return all the data
  let result = stmt.all();
  // Send the result to the client as json
  res.json(result);
});

//
app.get('/api/products/:id', (req, res) => {
  let id = req.params.id;
  let stmt = db.prepare(`
   SELECT *
   FROM products
   WHERE id = :id
   `);
  // Run the query and return all the data
  let result = stmt.all({id: req.params.id});
  // Send the result to the client as json
  res.json(result);
});

//start the web server
app.listen(4000, () => console.log('Listening on port 4000'));