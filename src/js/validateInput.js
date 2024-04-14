
    const inputFormValidation = (idForm) => {
        console.log('działa inputFormValidation');
        // const inputForm = document.querySelector('.field1');
        
        //USTAWIENIE DLA WSZYSTKICH INPUTÓW
        // console.log(id);
        let inputForm = document.querySelector(`.field${idForm}`)
    
        
        const inputChildrenNumber = inputForm.querySelector('input[name="children"]');
        const inputAdultsNumber = inputForm.querySelector('input[name="adults"]');
    
        //ustawiam wartości domyślne inputów na 0
        // inputAdultsNumber.defaultValue = '0';
        // inputChildrenNumber.defaultValue = '0';
    
        const adults = inputAdultsNumber.value.trim();
        const children = inputChildrenNumber.value.trim();
        const regex = /^\d+$/; // sprawdzamy czy input zawiera wyłącznie liczby
        console.log(adults, children);
    
        if (adults === '' || children === '' || !regex.test(adults) || !regex.test(children)) {
        const errorElement = document.createElement('p');
        errorElement.classList.add('error');
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

       const cleanForm = (idForm = 1) => {
            console.log('działa cleanForm');
            let inputForm = document.querySelector(`.field${idForm}`)
    
            let inputChildrenNumber = inputForm.querySelector('input[name="children"]');
            let inputAdultsNumber = inputForm.querySelector('input[name="adults"]');
            let errorElement = inputForm.querySelector('.error');
    
            inputChildrenNumber.value = '';
            inputAdultsNumber.value = '';
    
            
            if(errorElement) {
                errorElement.remove();
            }
        }




    

    export default inputFormValidation;