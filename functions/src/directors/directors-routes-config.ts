import { Application } from 'express';
import { create, all } from './directors-controller';

export function directorsRoutesConfig(app: Application, db: FirebaseFirestore.Firestore) {

    app.get('/test', (req, res) => {
        res.send('Get called');
    });

    app.post('/director', create);

    app.get('/directors', all);
}