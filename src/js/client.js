import './../css/client.css';

import ExcursionsAPI from './ExcursionsAPI';

console.log('client');

const api = new ExcursionsAPI();
api.getExcursionClient();
api.getOrders();
