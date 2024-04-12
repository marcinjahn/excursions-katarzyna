   //WALIDACJA FORMULARZY 'INPUT'
//   export default function inputFormValidation() {
//     console.log('działa validate.js');
//     // const inputForm = document.querySelector('.excursions__form');
    
//     // inputForm.addEventListener('submit', async function(event) {
//     // event.preventDefault();
    
//     const inputChildrenNumber = document.querySelector('input[name="children"]');
//     const inputAdultsNumber = document.querySelector('input[name="adults"]');
//     const adults = inputAdultsNumber.value.trim();
//     const children = inputChildrenNumber.value.trim();
//     const regex = /^\d+$/; // sprawdzamy czy input zawiera wyłącznie liczby
//     console.log(adults, children);

//     if (adults === '' || children === '' || !regex.test(adults) || !regex.test(children)) {
//     const errorElement = document.createElement('p');
//     errorElement.innerText = 'Proszę uzupełnić poprawnie wymagane pola';
//     orderForm.appendChild(errorElement);
//     return false;

//     } else {
//     // let totalPrice = document.querySelector('.order__total-price-value');
//     // const formattedTotalPrice = totalPrice.innerText.replace('PLN', '');
//     // alert(`Dziękujemy za złożenie zamówienia o wartości ${formattedTotalPrice} PLN. Szczegóły zamówienia zostały wysłane na adres e-mail: ${email}.`);
    
//     // nameInput.value = '';
//     // emailInput.value = '';
//     // //create there readOrders() and getOrders()
//     // await this.readOrders();
//     // await this.getOrders();
//     // totalPrice.innerHTML="0PLN"
//     return true;
//     }
//     };