import Firebase from 'firebase';
import config from '../client/src/shared/config'
Firebase.initializeApp(config);
export default Firebase;
