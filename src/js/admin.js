import './../css/admin.css';

import ExcursionsAPI from './ExcursionsAPI';

console.log('admin');

const api = new ExcursionsAPI();
api.getExcursionAdmin();
api.init()