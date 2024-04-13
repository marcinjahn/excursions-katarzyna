const inputFormValidation = () => {
    console.log('działa validate.js');
    const inputForm = document.querySelector('.field1');
    
    //USTAWIENIE DLA WSZYSTKICH INPUTÓW
    // let inputForm = document.querySelectorAll(`.field${id}`)
    
    const inputChildrenNumber = inputForm.querySelector('input[name="children"]');
    const inputAdultsNumber = inputForm.querySelector('input[name="adults"]');

    //ustawiam wartości domyślne inputów na 0
    inputAdultsNumber.defaultValue = '0';
    inputChildrenNumber.defaultValue = '0';

    const adults = inputAdultsNumber.value.trim();
    const children = inputChildrenNumber.value.trim();
    const regex = /^\d+$/; // sprawdzamy czy input zawiera wyłącznie liczby
    console.log(adults, children);

    if (adults === '' || children === '' || !regex.test(adults) || !regex.test(children)) {
    const errorElement = document.createElement('p');
    errorElement.style.color = 'red';
    errorElement.innerText = 'Proszę uzupełnić poprawnie wymagane pola';
    console.log(inputForm);
    inputForm.appendChild(errorElement);
    return false;

    } else {
    // let totalPrice = document.querySelector('.order__total-price-value');
    // const formattedTotalPrice = totalPrice.innerText.replace('PLN', '');
    // alert(`Dziękujemy za złożenie zamówienia o wartości ${formattedTotalPrice} PLN. Szczegóły zamówienia zostały wysłane na adres e-mail: ${email}.`);
    
    // nameInput.value = '';
    // emailInput.value = '';
    // //create there readOrders() and getOrders()
    // await this.readOrders();
    // await this.getOrders();
    // totalPrice.innerHTML="0PLN"
    return true;
    }
    };

    export default inputFormValidation;