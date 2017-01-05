import serviceJSON from './service.json';
const GCS = require('@google-cloud/storage')({projectId: 'czernitzki-148120', credentials: serviceJSON});
let DefaultBucket = GCS.bucket('czernitzki-148120.appspot.com');
export {DefaultBucket};
export default GCS;
