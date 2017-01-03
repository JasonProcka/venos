

import util from 'util';
import serviceJSON from './service.json';
const Admin = require('firebase-admin');



Admin.initializeApp({
  credential: Admin.credential.cert(serviceJSON),
  databaseURL: "https://czernitzki-148120.firebaseio.com/"
});


export default Admin;
