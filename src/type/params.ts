import { UserType, ConversationType, MessageType } from './model';

type UserReqType = {} & UserType;

type MessageReqType = {
  limit: number;
  sortField: string;
  sortOrder: string;
} & MessageType;

type ConversationReqType = {
  ids: string[];
} & ConversationType;

type AuthDataType = {
  userId: string;
  token: string;
  tokenExp: number;
};

export { UserReqType, MessageReqType, ConversationReqType, AuthDataType };
