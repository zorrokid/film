
import * as admin from 'firebase-admin';
import * as functions from 'firebase-functions';

export function initialize() {
    admin.initializeApp(functions.config().firebase);
}