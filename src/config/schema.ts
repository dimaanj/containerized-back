import { gql } from 'apollo-server';

const typeDefs = gql`
  type User {
    id: ID!
    email: String!
    password: String!
  }

  type Message {
    id: ID!
    body: String!
    author: User!
  }

  type Query {
    messages: [Message]!
    me: User
  }

  type MessageUpdateResponse {
    success: Boolean!
    message: Message
  }

  type Mutation {
    sendMessage(body: String!): MessageUpdateResponse!
    removeMessage(messageId: ID!): MessageUpdateResponse!
    login(email: String): String # login token
  }
`;

export { typeDefs };