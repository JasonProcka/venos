import serviceJSON from './service.json';
const GCS = require('@google-cloud/storage')({projectId: 'czernitzki-148120', credentials: serviceJSON});
export default GCS;
