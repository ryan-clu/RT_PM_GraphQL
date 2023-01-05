const express = require('express'); // this index.js file is our 'Entry Point' for our application.
const colors = require('colors'); // requires colors package/library we installed.
require('dotenv').config(); // extension that loads .env file contents into process.env.
const { graphqlHTTP } = require('express-graphql');
const schema = require('./schema/schema');
const connectDB = require('./config/db');

const port = process.env.PORT || 5000;

const app = express();

//Connect to MongoDB Atlas 
connectDB(); 

// Our single Express route
app.use('/graphql', graphqlHTTP({
  schema: schema,
  graphiql: process.env.NODE_ENV === 'development',

}));

app.listen(port, console.log(`Server is running on port ${port}.`));
