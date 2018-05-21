import express from 'express';
import { graphqlExpress, graphiqlExpress } from 'apollo-server-express';
import bodyParser from 'body-parser';
import cors from 'cors';
import { createServer } from 'http';
import { execute, subscribe } from 'graphql';
import { SubscriptionServer } from 'subscriptions-transport-ws';

import { getUserId } from './utils';
import schema from './data/schema';

export function run({ PORT: portFromEnv, rethinkdbConfig, APP_SECRET } = {}) {

  // configure rethinkdb
  let r = require("rethinkdbdash")({
    servers: [
      {
        host: rethinkdbConfig.host,
        port: rethinkdbConfig.port
      }
    ]
  });

  let port = portFromEnv;

  const app = express();

  app.use(cors());
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(bodyParser.json());

  app.use('/graphql', graphqlExpress(async (req) => {

    // if there is a token, get the user object
    let user = null;
    if (req.get('token')) {
      try {
        let userId = getUserId(req.get('token'), APP_SECRET);
        user = await r.db("Metro").table("Users").get(userId);
      } catch (err) {
      } // user remains null if jwt is not valid

    }

    return {
      schema,
      context: {
        secret: APP_SECRET,
        user,
        r
      }
    };

  }));

  app.use('/graphiql', graphiqlExpress({
    endpointURL: '/graphql',
    subscriptionsEndpoint: `ws://localhost:${port}/subscriptions`
  }));

  const ws = createServer(app);

  ws.listen(port, () => {
    console.log(`API Server is now running on http://localhost:${port}/graphql`); // eslint-disable-line no-console
    console.log(
      `GraphiQL is now running on http://localhost:${port}/graphiql`
    )

    new SubscriptionServer({
      execute,
      subscribe,
      schema
    }, {
        server: ws,
        path: "/subscriptions"
      })

  });

  return ws;
}