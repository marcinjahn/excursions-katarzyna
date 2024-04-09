import './../css/admin.css';

import ExcursionsAPI from './ExcursionsAPI';
const api = new ExcursionsAPI();
api.getExcursionAdmin();
api.Init()