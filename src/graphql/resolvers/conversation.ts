import { PoolClient } from 'pg';
import { difference, isEmpty, head } from 'lodash';
import { ConversationType, UserType } from '../../type/model';
import { ConversationReqType } from '../../type/params';
import { ContextType } from '../../type/context';
import { getUsersByIds, getUsersByConversationId } from './auth';
import { CONVERSATION_QUERY } from '../../query/conversation';
import { CONVERSATION_MIN_MEMBERS } from '../../config/constants';

const conversation = {
  members: async (
    parent: ConversationType,
    args: any,
    { poolClient }: ContextType
  ): Promise<UserType[]> => getUsersByConversationId(poolClient, parent.id),
};

const conversationQuery = {};

const conversationMutation = {
  createConversation: async (
    _: any,
    { ids, name }: ConversationReqType,
    { request, poolClient }: ContextType
  ): Promise<ConversationType> => {
    if (!request.isAuth) {
      throw new Error('Unauthenticated');
    }

    const users = await getUsersByIds(poolClient, ids);
    if (isEmpty(users)) {
      throw new Error(`Users with ids: ${ids} do not exist`);
    }

    const userIds = users.map((user: UserType) => user.id);
    const notExistingUserIds = difference(userIds, ids);
    if (!isEmpty(notExistingUserIds)) {
      throw new Error(`Users with ids: ${notExistingUserIds} do not exist`);
    }

    if (userIds.length < CONVERSATION_MIN_MEMBERS) {
      throw new Error('Conversation must has more than one member!');
    }

    const conversation = head(
      (await poolClient.query(CONVERSATION_QUERY.CREATE, [name])).rows
    );

    await poolClient.query(CONVERSATION_QUERY.CREATE_CONVERSATION_USERS, [
      userIds,
      Array(userIds.length).fill(conversation.id),
    ]);

    return conversation;
  },
  deleteConversation: async (
    _: any,
    { id }: ConversationReqType,
    { request, poolClient }: ContextType
  ): Promise<ConversationType> => {
    if (!request.isAuth) {
      throw new Error('Unauthenticated');
    }

    const isConversationExists = await getConversationById(poolClient, id);
    if (!isConversationExists) {
      throw new Error('Conversation does not exists!');
    }

    return head((await poolClient.query(CONVERSATION_QUERY.DELETE, [id])).rows);
  },
};

const getConversationById = async (
  poolClient: PoolClient,
  id: string
): Promise<ConversationType> =>
  head(
    (await poolClient.query('SELECT FROM conversation WHERE id=$1', [id])).rows
  );

export {
  conversation,
  conversationQuery,
  conversationMutation,
  getConversationById,
};
