import express from 'express';
import { getGraphqlConfig } from './middleware/graphql';
import bodyParser from 'body-parser';
import { PORT } from './config/constants';
import { isAuthenticated } from './middleware/auth';

const app = express();

app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

app.use(isAuthenticated);

app.use('/graphql', getGraphqlConfig);

app.listen(PORT, () => {
  console.log(`server started on port ${PORT}`);
});
