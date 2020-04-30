import express from 'express';
import expressGraphql from 'express-graphql';
import * as path from 'path';
import fs from 'fs';
import { makeExecutableSchema } from 'graphql-tools';
import { applyMiddleware } from 'graphql-middleware';
import { resolvers } from '../graphql';
import { dbClientMiddleware } from './db-pool-client';

const schemaFile = path.join(__dirname, '../../schema.graphql');
const typeDefs = fs.readFileSync(schemaFile, 'utf8');
const schema = makeExecutableSchema({ typeDefs, resolvers });
const schemaWithMiddleware = applyMiddleware(
  schema,
  dbClientMiddleware
);
const getGraphqlConfig = async (
  request: express.Request,
  response: express.Response
) => {
  expressGraphql({
    schema: schemaWithMiddleware,
    graphiql: true,
    context: { request, response },
  })(request, response);
};

export { getGraphqlConfig };
