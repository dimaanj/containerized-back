import { head } from 'lodash';
import { MessageType } from '../../type/model';
import { MessageReqType } from '../../type/params';
import { ContextType } from '../../type/context';
import { getConversationById } from './conversation';
import { getUserById } from './auth';
import { MESSAGE_QUERY } from '../../query/message';

const message = {
  conversation: () => ({
  })
};

const messageQuery = {
  messages: async (
    root: any,
    { limit, sortField, sortOrder }: MessageReqType
  ): Promise<MessageType[]> => {
    return [];
  },
};

const messageMutation = {
  createMessage: async (
    root: any,
    { conversationId, body, effectiveDateTime }: MessageReqType,
    { request, poolClient }: ContextType
  ): Promise<MessageType> => {
    if (!request.isAuth) {
      throw new Error('Unauthenticated');
    }

    const isUserExists = !!(await getUserById(
      poolClient,
      'f43ae304-c55a-4213-808c-19af111c0962'
    ));

    const isConversationExists = !!(await getConversationById(
      poolClient,
      conversationId
    ));

    if (!isUserExists) {
      throw new Error('User does not exists!');
    }

    if (!isConversationExists) {
      throw new Error('Conversation does not exists!');
    }

    const res = await poolClient.query(MESSAGE_QUERY.CREATE, [
      body,
      effectiveDateTime,
      'f43ae304-c55a-4213-808c-19af111c0962',
      conversationId,
    ]);

    return head(res.rows);
  },
};

export { message, messageQuery, messageMutation };
