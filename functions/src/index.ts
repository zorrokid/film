import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import * as express from 'express';
import * as bodyParser from "body-parser";

admin.initializeApp(functions.config().firebase);
const db = admin.firestore();

const app = express();
const main = express();

main.use('/api/v1', app);
main.use(bodyParser.json());

export const webApi = functions.https.onRequest(main);

app.get('/test', (req, res) => {
    res.send('Get called');
})

interface IDirector {
    firstName: string,
    lastName: string
}

const directorsCollection = 'directors';

app.post('/director', async (request, response) => {
    try {
      const { firstName, lastName } = request.body;
      const director: IDirector = {
          firstName,
          lastName
      } 
      const directorRef = await db.collection(directorsCollection).add(director);
      const directorFromDb = await directorRef.get();
  
      response.json({
        id: directorFromDb.id,
        data: directorFromDb.data()
      });
  
    } catch(error) {  
      response.status(500).send("Got error " + error.message);
  
    }
  });


interface IDirectorResult {
  id: string,
  director: IDirector
}

  app.get('/directors', async (_request, response) => {
    try {

      const directorsSnapshot = await db.collection(directorsCollection).get();
      const directors: IDirectorResult[] = [];

      directorsSnapshot.forEach(
        (d: any) => {
          directors.push({
            id: d.id,
            director: d.data()
          });
        }
      );

      response.json(directors);

    } catch (error) {
      response.status(500).send("Got error " + error.message);
    }
  });