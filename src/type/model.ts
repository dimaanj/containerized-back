type ConversationType = {
  id: string;
  name: string;
};

type MessageType = {
  id: number;
  body: string;
  effectiveDateTime: string;
  authorId: number;
  conversationId: string;
};

type UserType = {
  id: string;
  email: string;
  password: string;
};

export { UserType, ConversationType, MessageType };
