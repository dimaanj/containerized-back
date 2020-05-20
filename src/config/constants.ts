
const SECURE_STRING = process.env.SECURE_STRING;
const DATABASE_URL = process.env.DATABASE_URL;
const PORT = process.env.PORT;

const TOKEN_EXP_HOURS = 1;
const TOKEN_EXP_HOURS_AS_STRING = '1h';
const CONVERSATION_MIN_MEMBERS = 2;

export { SECURE_STRING, DATABASE_URL, PORT, TOKEN_EXP_HOURS, TOKEN_EXP_HOURS_AS_STRING, CONVERSATION_MIN_MEMBERS };