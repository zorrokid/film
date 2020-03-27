
import * as admin from 'firebase-admin';
import * as functions from 'firebase-functions';

let dbInstance: FirebaseFirestore.Firestore | null = null;

export function initialize() {
    admin.initializeApp(functions.config().firebase);
}

export function getDB(): FirebaseFirestore.Firestore {
    if (!dbInstance) dbInstance = admin.firestore();
    return dbInstance;
}