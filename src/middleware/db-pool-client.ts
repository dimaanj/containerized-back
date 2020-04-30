import { pool } from '../config/connection-pool';

const dbClientMiddleware = async (
  resolve: any,
  root: any,
  args: any,
  context: any,
  info: any
): Promise<any> => {
  const client = await pool.connect();

  let result;
  try {
    await client.query('BEGIN');

    result = await resolve(
      root,
      args,
      { ...context, poolClient: client },
      info
    );

    await client.query('COMMIT');
  } catch (e) {
    await client.query('ROLLBACK');
    throw e;
  } finally {
    client.release();
  }

  return result;
};

export { dbClientMiddleware };
