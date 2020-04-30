import { assign } from 'lodash';
import { userQuery, userMutation, user } from './resolvers/auth';
import {
  messageQuery,
  messageMutation,
  message,
} from './resolvers/message';
import { conversation, conversationQuery, conversationMutation } from './resolvers/conversation';

const resolvers = {
  conversation,
  message,
  user,
  Query: assign({}, userQuery, messageQuery, conversationQuery),
  Mutation: assign({}, userMutation, messageMutation, conversationMutation),
};

export { resolvers };
