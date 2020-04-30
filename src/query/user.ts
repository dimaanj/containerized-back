const USER_QUERY = {
  CREATE:
    'INSERT INTO end_user (email, password) VALUES ($1, $2) RETURNING id, email',
  GET_BY_ID: 'SELECT * FROM end_user WHERE id=$1::uuid',
  GET_BY_EMAIL: 'SELECT * FROM end_user WHERE email=$1',
  GET_BY_IDS: 'SELECT * FROM end_user WHERE id IN (select(unnest($1::uuid[])))',
  GET_BY_CONVERSATION_ID:
    'SELECT end_user.id, end_user.email  FROM end_user ' +
    'INNER JOIN conversation_user ON conversation_user.user_id=end_user.id ' +
    'INNER JOIN conversation ON conversation.id=conversation_user.conversation_id ' +
    'WHERE conversation.id=$1',
};

export { USER_QUERY };
