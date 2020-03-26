import { Application } from 'express';
import { create, get, patch, remove } from './controller';
import { isAuthenticated } from '../auth/authenticated';
import { isAuthorized } from '../auth/authorized'; 

export function usersRoutesConfig(app: Application) {
    app.post('/users',
        isAuthenticated,
        isAuthorized({ hasRole: ['admin', 'manager']}),
        create
    );
    // get :id user
    app.get('/users/:id', [
        isAuthenticated,
        isAuthorized({ hasRole: ['admin', 'manager'], allowSameUser: true }),
        get
    ]);
    // updates :id user
    app.patch('/users/:id', [
        isAuthenticated,
        isAuthorized({ hasRole: ['admin', 'manager'], allowSameUser: true }),
        patch
    ]);
    // deletes :id user
    app.delete('/users/:id', [
        isAuthenticated,
        isAuthorized({ hasRole: ['admin', 'manager'] }),
        remove
    ]);
}