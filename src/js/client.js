import './../css/client.css';

import ExcursionsAPI from './ExcursionsAPI';
const api = new ExcursionsAPI();
api.getExcursionClient();
api.getOrders();
