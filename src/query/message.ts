const MESSAGE_QUERY = {
  CREATE:
    'INSERT INTO message (body, effective_date_time, author_id, conversation_id) values($1, $2, $3, $4) RETURNING id, body, effective_date_time, author_id',
};

export { MESSAGE_QUERY };
