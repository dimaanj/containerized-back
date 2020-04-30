const CONVERSATION_QUERY = {
  CREATE: 'INSERT INTO conversation (name) values($1) RETURNING id, name',
  CREATE_CONVERSATION_USERS: 'INSERT INTO conversation_user (user_id, conversation_id) SELECT * FROM UNNEST ($1::uuid[], $2::uuid[])',
  DELETE: 'DELETE FROM conversation WHERE id=$1 '
};

export { CONVERSATION_QUERY };
