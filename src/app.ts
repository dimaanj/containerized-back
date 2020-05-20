import express from 'express';
import bodyParser from 'body-parser';
const { graphqlExpress } = require('apollo-server-express');
import { typeDefs } from './config/schema';
import { UserAPI } from './datasources/user';
import { pool } from './config/db';

const PORT = 3000;

const app = express();

// bodyParser is needed just for POST.
app.use('/graphql', bodyParser.json(), graphqlExpress({ 
  schema: typeDefs,
  dataSources: () => ({
    userAPI: new UserAPI({ pool })
  })
}));

app.listen(PORT);