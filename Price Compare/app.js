const express = require('express');
const semantics3 = require('semantics3-node');

var api_key = 'SEM382985213140B6B0A25A4B4F31EE8C833';
var api_secret = 'YWY4YmFiZDVjZTc0ZWJiZmVlNTNhM2VkMTU1MzliNWM';
var sem3 = require('semantics3-node')(api_key,api_secret);

// Build the request
sem3.products.products_field( "search", "iphone" );

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
             
            for(i=0; i < products.length; i++){
                console.log(products[i].price);
                console.log(products[i].name);
                
            }
            
         }
      );
   }
);




