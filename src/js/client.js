import './../css/client.css';

import ExcursionsAPI from './ExcursionsAPI';

console.log('client');

const myClassX = new ExcursionsAPI();
myClassX.addExcursion({
    name: 'Ogrodzieniec',
    description: "Lorem Ipsum",
    adultPrice: 90,
    childPrice: 50
});