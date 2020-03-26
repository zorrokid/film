import { Application } from 'express';

interface IDirector {
    firstName: string,
    lastName: string
}

interface IDirectorResult {
    id: string,
    director: IDirector
  }

const directorsCollection = 'directors';


export function directorsRoutesConfig(app: Application, db: FirebaseFirestore.Firestore) {


    app.get('/test', (req, res) => {
        res.send('Get called');
    });

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
}