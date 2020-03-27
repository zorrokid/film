import { Request, Response } from 'express';
import { handleError } from '../util/error';
import { getDB } from '../firebase/init';

interface IDirector {
    firstName: string,
    lastName: string
}

interface IDirectorResult {
    id: string,
    director: IDirector
  }


const directorsCollection = 'directors';

export async function create(request: Request, response: Response) {
    try {
        const { firstName, lastName } = request.body;
        const director: IDirector = {
            firstName,
            lastName
        } 
        const directorRef = await getDB().collection(directorsCollection).add(director);
        const directorFromDb = await directorRef.get();
    
        return response.json({
            id: directorFromDb.id,
            data: directorFromDb.data()
        });
    
    } catch(error) {  
        return handleError(response, error);
    }
}

export async function all(request: Request, response: Response) {
    try {
        const directorsSnapshot = await getDB().collection(directorsCollection).get();
        const directors: IDirectorResult[] = [];

        directorsSnapshot.forEach(
            (d: any) => {
            directors.push({
                id: d.id,
                director: d.data()
            });
            }
        );

        return response.json(directors);

    } catch (err) {
        return handleError(response, err)
    }
}
