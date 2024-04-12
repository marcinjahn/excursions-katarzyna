import './../css/client.css';
// import inputFormValidation from './validate';
import ExcursionsAPI from './ExcursionsAPI';

const api = new ExcursionsAPI();
api.getExcursionClient();
api.getOrders();
api.orderFormSubmit();

// const inputForm = document.querySelector('.field1');
// console.log(inputForm);
// inputForm.addEventListener('submit', inputFormValidation);
    