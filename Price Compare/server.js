const express = require('express');
const app = express();
var api_key = 'SEM382985213140B6B0A25A4B4F31EE8C833';
var api_secret = 'YWY4YmFiZDVjZTc0ZWJiZmVlNTNhM2VkMTU1MzliNWM';
var sem3 = require('semantics3-node')(api_key,api_secret);

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.get('/', function (req, res) {
  res.send('Hello World!')
})

app.get('/api/', function (req, res) {
  console.log(req.query);
    
    // Build the request
sem3.products.products_field( "search", req.query.name );

// Run the request
sem3.products.get_products(
   function(err, products) {
      if (err) {
         console.log("Couldn't execute request: get_products");
         return;
      }
      
      // View results of the request
      //console.log( "Results of request:\n" + JSON.stringify( products ) );
      
      // Go to the next page
      sem3.products.iterate_products(
         function(err, products) {
            if (err) {
               console.log("Couldn't execute request: iterate_products");
               return;
            }
            //console.log( "Successfully retrieved next page of products:\n", JSON.stringify( products ) );
            products = JSON.parse(products);
            products = products.results
            
            res.send(products);
         }
      );
   }
);
})

app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
  
})
