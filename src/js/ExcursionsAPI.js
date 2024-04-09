// 1. BRAK walidacja formularzy (sprawdzamy czy jest liczba >=0)
// 2. BRAK walidacja formularza order + realizacja zamówienia jak w 
// poprzednim task'u - LINIA 365+
// 3. BRAK prototype ukrywamy w css, a nie komentujemy w html

// CLIENT
//DO WYJAŚNIENIA wybrać wycieczkę przez wprowadzenie ilości 
//zamawianych biletów w odpowiednie pola formularza i kliknięcie 
//dodaj do zamówienia. Wiąże się to z:
// BRAK WYCIECZEK

// * BRAK walidacją danych  (czy liczba >=0)
// * BRAK dodawaniem zamówienia do panelu z prawej strony, tj. do koszyka 
// * BRAK aktualizowaniem ceny za całość
// 
//2. potwierdzić zamówienie poprzez wprowadzenie imienia, nazwiska oraz adresu email do pola zamówienia i kliknięcie zamawiam. Wiąże się to z:
// * BRAK walidacją danych (na końcu kod z poprzedniego zadania)
// * wysłaniem zamówienia do bazy danych (u nas to będzie API uruchomione dzięki JSON Server)
// * BRAK wyczyszczeniem koszyka ( na końcu kod z poprzedniego zadania)

// ADMIN
// 1. DO WYJAŚNIENIA dodawanie wycieczek / po wpisaniu wycieczki (nazwa, opis, ceny) + dodaj - wycieczka nie pojawia się w panelu admin
// 2. DO WYJAŚNIENIA usuwanie wycieczek /brak wycieczek do usunięcia, więc nie mona sprawdzić
// 3. DO WYJAŚNIENIA modyfikowanie wycieczek / jak przy usuwaniu

class ExcursionsAPI {
    async getExcursionClient(){
        try {
            const response = await fetch('http://localhost:3000/excursions');
            const data = await response.json();
            data.forEach(element => {
                const li = document.createElement('li');
                li.className = 'excursions__item  ';

                const header = document.createElement('header');
                const title = document.createElement('h2');
                title.className = 'excursions__title';
                title.textContent = element.Title;
                const description = document.createElement('p');
                description.className = 'excursions__description';
                description.textContent = element.Description;
                header.appendChild(title);
                header.appendChild(description);

                const form = document.createElement('form');
                form.className = `excursions__form field${element.id}`;
                form.addEventListener("submit",(e)=>{this.addToOrder(e,element.id)})

                const adultField = document.createElement('div');
                adultField.className = 'excursions__field';
                adultField.innerHTML = `
                    <label class="excursions__field-name">
                        Dorosły: <b>${element.Adult_cost}</b>PLN x <input class="excursions__field-input" name="adults" />
                    </label>
                `;

                const childField = document.createElement('div');
                childField.className = 'excursions__field';
                childField.innerHTML = `
                    <label class="excursions__field-name">
                        Dziecko: <b>${element.Child_cost}</b>PLN x <input class="excursions__field-input" name="children" />
                    </label>
                `;

                const submitField = document.createElement('div');
                submitField.className = `excursions__field excursions__field--submit`;

                const submitInput = document.createElement('input');
                submitInput.className = 'excursions__field-input excursions__field-input--submit';
                submitInput.value = 'dodaj do zamówienia';
                submitInput.type = 'submit';
                submitInput.addEventListener('click', (e) => this.addToOrder(e,element.id,element.Title,element.Description,element.Adult_cost,element.Child_cost));
                submitField.appendChild(submitInput)

                form.appendChild(adultField);
                form.appendChild(childField);
                form.appendChild(submitField);

                li.appendChild(header);
                li.appendChild(form);

                document.querySelector('.excursions').appendChild(li);
            });
        } catch (error) {
            console.error('Error fetching excursions:', error);
        }
    }

    async getExcursionAdmin(){
        try {
            const response = await fetch('http://localhost:3000/excursions');
            const data = await response.json();
            data.forEach(element => {
                const li = document.createElement('li');
                li.className = 'excursions__item';

                const header = document.createElement('header');
                const title = document.createElement('h2');
                title.className = 'excursions__title';
                title.textContent = element.Title;
                const description = document.createElement('p');
                description.className = 'excursions__description';
                description.textContent = element.Description;
                header.appendChild(title);
                header.appendChild(description);

                const form = document.createElement('form');
                form.className = 'excursions__form';

                const adultField = document.createElement('div');
                adultField.className = 'excursions__field';
                adultField.innerHTML = `
                    <label class="excursions__field-name">
                        Dorosły: <b>${element.Adult_cost}</b>PLN
                    </label>
                `;

                const childField = document.createElement('div');
                childField.className = 'excursions__field';
                childField.innerHTML = `
                    <label class="excursions__field-name">
                        Dziecko: <b>${element.Child_cost}</b>PLN
                    </label>
                `;

                const submitField = document.createElement('div');
                submitField.className = 'excursions__field excursions__field--submit';

                const editButton = document.createElement('input');
                editButton.className = 'excursions__field-input excursions__field-input--edit';
                editButton.value = 'edytuj';
                editButton.type = 'button';
                editButton.addEventListener('click', (e) => this.OpenEditPanel(e,element.id));
    
                submitField.appendChild(editButton);
    
                const deleteButton = document.createElement('input');
                deleteButton.className = 'excursions__field-input excursions__field-input--remove';
                deleteButton.value = 'usuń';
                deleteButton.type = 'button';
                deleteButton.onclick =() => this.deleteExcursion(element.id);
    
                submitField.appendChild(deleteButton);

                form.appendChild(adultField);
                form.appendChild(childField);
                form.appendChild(submitField);

                li.appendChild(header);
                li.appendChild(form);

                document.querySelector('.excursions').appendChild(li);
            });
        } catch (error) {
            console.error('Error fetching excursions:', error);
        }
    }

    


    async getOrders(){
        try {
            const response = await fetch('http://localhost:3000/orders');
            const data = await response.json();
            let totalCostNumber=0
            data.forEach(element => {
                const li = document.createElement('li');
                li.className = 'summary__item ';
    
                const h3 = document.createElement('h3');
                h3.className = 'summary__title';
    
                const spanName = document.createElement('span');
                spanName.className = 'summary__name';
                spanName.textContent = element.Title;
    
                const strongTotalPrice = document.createElement('strong');
                strongTotalPrice.className = 'summary__total-price';
                strongTotalPrice.textContent = element.Adult_cost * element.Adult_number + element.Child_cost * element.Child_number;
                 totalCostNumber += element.Adult_cost * element.Adult_number + element.Child_cost * element.Child_number
                const removeLink = document.createElement('a');
                removeLink.onclick=()=>this.deleteOrder(element.id);
                removeLink.className = 'summary__btn-remove';
                removeLink.title = 'usuń';
                removeLink.textContent = '   X';
    
                const pPrices = document.createElement('p');
                pPrices.className = 'summary__prices';
                pPrices.textContent = `dorośli: ${element.Adult_number} x ${element.Adult_cost}PLN, dzieci: ${element.Child_number} x ${element.Child_cost}PLN`;
    
                h3.appendChild(spanName);
                h3.appendChild(strongTotalPrice);
                h3.appendChild(removeLink);
    
                li.appendChild(h3);
                li.appendChild(pPrices);
    
                document.querySelector('.panel__summary').appendChild(li);
             document.querySelector('.order__total-price-value').innerHTML= `${totalCostNumber}PLN`

            });
        } catch (error) {
            console.error('Error fetching orders:', error);
        }
    }

    async addToOrder(e,id,title,description,adult_cost,child_cost){
        e.preventDefault();

        let content = document.querySelectorAll(`.field${id}`)
        const formData = {
            "Title": title,
            "Description": description,
            "Adult_cost": adult_cost,
            "Child_cost":child_cost,
          "Adult_number":content[0][0].value,
          "Child_number":content[0][1].value,
  
        };
  
        console.log(formData);
          try {
              const response = await fetch("http://localhost:3000/orders", {
                  method: "POST",
                  headers: {
                      "Content-Type": "application/json",
                  },
                  body: JSON.stringify(formData),
              });
      
              if (!response.ok) {
                  throw new Error("Failed to add new order");
              }
      
              const newExcursion = await response.json();
              console.log("New order added:", newExcursion);
              document.querySelector('.panel__summary').innerHTML=''
              this.getOrders()
          } catch (error) {
              console.error("Error adding new orders:", error);
      }
    }

    async deleteOrder(orderId){
        try {
            const response = await fetch(`http://localhost:3000/orders/${orderId}`, {
                method: 'DELETE'
            });
            const data = await response.json();
            console.log('Order deleted:', data);
            document.querySelector('.panel__summary').innerHTML=''
            this.getOrders();
        } catch (error) {
            console.error('Error deleting order:', error);
        }
    }

    async deleteExcursion(excursionId) {
        try {
            const response = await fetch(`http://localhost:3000/excursions/${excursionId}`, {
                method: 'DELETE'
            });
            const data = await response.json();
            console.log('Excursion deleted:', data);

            document.querySelector('.excursions').innerHTML=''
            this.getExcursionAdmin();
        } catch (error) {
            console.error('Error deleting excursion:', error);
        }
    }
        OpenEditPanel(e,id){
        e.preventDefault();
        const panel = document.querySelector(".panel"); 
        panel.classList.add("disabledPanel")

        const edit_panel = document.querySelector(".edit_panel")
        edit_panel.style.display="block";
        edit_panel.setAttribute("id", id);  

        
    }

    async editExcursion(e){
        e.preventDefault();
        const edit_panel=document.querySelector(".edit_panel");
        let id = edit_panel.id
        console.log(id,edit_panel);

        let content = document.querySelectorAll(`.edit`)
        console.log(content);

        const formData ={
            "Title":content[0][0].value ,
            "Description": content[0][1].value,
            "Adult_cost": content[0][2].value,
            "Child_cost":content[0][3].value 
        }
        try {
            const response = await fetch(`http://localhost:3000/excursions/${id}`, {
                method: "Put",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
            });
    
            if (!response.ok) {
                throw new Error("Failed to edit excursion");
            }
    
            const newExcursion = await response.json();
            console.log("excursion edited:", newExcursion);
            document.querySelector('.excursions').innerHTML=''
            this.getExcursionAdmin()
        } catch (error) {
            console.error("Error editing excursion:", error);
        }
        const panel = document.querySelector(".panel"); 
        panel.classList.remove("disabledPanel")
        document.querySelector(".edit_panel").style.display="none";
    }
    async addNewExcursion(e) {
        e.preventDefault();
      let content = document.querySelectorAll('.form__field')
      console.log(content);
      const formData = {
        "Title":content[0].value,
        "Description":content[1].value,
        "Adult_cost":content[2].value,
        "Child_cost":content[3].value,

      };

      console.log(formData);
        try {
            const response = await fetch("http://localhost:3000/excursions", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
            });
    
            if (!response.ok) {
                throw new Error("Failed to add new excursion");
            }
    
            const newExcursion = await response.json();
            console.log("New excursion added:", newExcursion);
            document.querySelector('.excursions').innerHTML=''
            this.getExcursionAdmin()
        } catch (error) {
            console.error("Error adding new excursion:", error);
        }
    }

    Init(){

    document.querySelector("form").addEventListener("submit",(e)=>{this.addNewExcursion(e)})
    document.querySelector(".edit").addEventListener("submit",(e)=>{this.editExcursion(e)})

    }
    
}
export default ExcursionsAPI;


//WALIDACJA FORMULARZA 'ORDER'
//     const orderForm = document.querySelector('.order');

// orderForm.addEventListener('submit', function(event) {
//     event.preventDefault();

//     const nameInput = document.querySelector('input[name="name"]');
//     const emailInput = document.querySelector('input[name="email"]');

//     const name = nameInput.value.trim();
//     const email = emailInput.value.trim();

//     if (name === '' || email === '' || !email.includes('@')) {
//         const errorElement = document.createElement('p');
//         errorElement.innerText = 'Proszę uzupełnić poprawnie wymagane pola';
//         orderForm.appendChild(errorElement);
//     } else {
//         const totalPrice = document.querySelector('.order__total-price-value').innerText;
//         const formattedTotalPrice = totalPrice.replace('PLN', '');
//         alert(`Dziękujemy za złożenie zamówienia o wartości ${formattedTotalPrice} PLN. Szczegóły zamówienia zostały wysłane na adres e-mail: ${email}.`);

//         nameInput.value = '';
//         emailInput.value = '';

//         const summaryList = document.querySelector('.panel__summary');
//         summaryList.innerHTML = '';

//         totalSum = 0;
//         calculateTotalPrice();
//     }
//     })