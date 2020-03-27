import * as functions from 'firebase-functions';
import * as express from 'express';
import * as bodyParser from "body-parser";
import * as cors from 'cors';
import { usersRoutesConfig } from './users/users-routes-config';
import { directorsRoutesConfig } from './directors/directors-routes-config';

import { initialize } from './firebase/init';

import * as admin from 'firebase-admin';

initialize();


const db = admin.firestore();

const app = express();
// const main = express();

//app.use('/api/v1');
app.use(bodyParser.json());
app.use(cors({ origin: true }));

usersRoutesConfig(app);
directorsRoutesConfig(app, db);

export const webApi = functions.https.onRequest(app);

