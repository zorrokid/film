import { Request, Response } from 'express';
import * as admin from 'firebase-admin';

export async function isAuthenticated(request: Request, response: Response, next: Function) {

    console.log('isAuthenticated');
    const { authorization } = request.headers;


    if (!authorization || !authorization.startsWith('Bearer')) {
        return unauthorized(response);
    }

    const split = authorization.split('Bearer');


    if (split.length !== 2) {
        return unauthorized(response);
    }

    const token = split[1];

    try {
        const decodedToken: admin.auth.DecodedIdToken = await admin.auth().verifyIdToken(token);
        console.log(`decodedToken`, JSON.stringify(decodedToken));
        response.locals = { 
            ...response.locals, 
            uid: decodedToken.uid, 
            role: decodedToken.role, 
            email: decodedToken.email 
        };
        return next();
    }
    catch (error) {
        console.error(`${error.code} -  ${error.message}`);
        return unauthorized(response);
    }
}

function unauthorized(response: Response) {
    return response.status(401).send({ message: 'Unauthorized' });
}