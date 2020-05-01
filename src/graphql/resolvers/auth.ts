import { PoolClient } from 'pg';
import { head } from 'lodash';
import * as bcrypt from 'bcrypt';
import { sign } from 'jsonwebtoken';
import { UserType } from '../../type/model';
import { ContextType } from '../../type/context';
import { UserReqType, AuthDataType } from '../../type/params';
import { USER_QUERY } from '../../query/user';
import { SECURE_STRING, TOKEN_EXP_HOURS, TOKEN_EXP_HOURS_AS_STRING } from '../../config/constants';

const user = {};

const userQuery = {
  login: async (
    _: any,
    { email, password }: UserReqType,
    { request, poolClient }: ContextType
  ): Promise<AuthDataType> => {
    if (request.isAuth) {
      throw new Error('Logout to login!');
    }

    const user = await getUserByEmail(poolClient, email);
    if (!user) {
      throw new Error('User does not exists!');
    }

    const isCorrectPassword = await bcrypt.compare(password, user.password);
    if (!isCorrectPassword) {
      throw new Error('Password is incorrect');
    }

    const token = await sign(
      {
        userId: user.id,
        email: user.email,
      },
      SECURE_STRING,
      { expiresIn: TOKEN_EXP_HOURS_AS_STRING }
    );

    return {
      token,
      userId: user.id,
      tokenExp: TOKEN_EXP_HOURS,
    };
  },
};

const userMutation = {
  createUser: async (
    _: any,
    { email, password }: UserReqType,
    { request, poolClient }: ContextType
  ): Promise<UserType> => {
    if (request.isAuth) {
      throw new Error('Logout to create a new account!');
    }

    const isUserExists = !!(await getUserByEmail(poolClient, email));
    if (isUserExists) {
      throw new Error('User already exists!');
    }

    const hashedPassword = await bcrypt.hash(password, 12);
    const res = await poolClient.query(USER_QUERY.CREATE, [
      email,
      hashedPassword,
    ]);

    return head(res.rows);
  },
};

const getUsersByIds = async (
  poolClient: PoolClient,
  ids: string[]
): Promise<UserType[]> =>
  (await poolClient.query(USER_QUERY.GET_BY_IDS, [ids])).rows;

const getUserById = async (
  poolClient: PoolClient,
  id: string
): Promise<UserType> =>
  head((await poolClient.query(USER_QUERY.GET_BY_ID, [id])).rows);

const getUserByEmail = async (
  poolClient: PoolClient,
  email: string
): Promise<UserType> =>
  head((await poolClient.query(USER_QUERY.GET_BY_EMAIL, [email])).rows);

const getUsersByConversationId = async (
  poolClient: PoolClient,
  conversationId: string
): Promise<UserType[]> =>
  (await poolClient.query(USER_QUERY.GET_BY_CONVERSATION_ID, [conversationId]))
    .rows;

export {
  user,
  userQuery,
  userMutation,
  getUsersByIds,
  getUserById,
  getUsersByConversationId,
};
