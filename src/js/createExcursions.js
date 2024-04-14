const createExcursions = (element) => {
    //LEWA STRONA => TWORZYMY WYCIECZKI - TYTUŁ, OPIS
    const li = document.createElement('li');
    li.className = 'excursions__item  ';

    const header = document.createElement('header');
    const title = document.createElement('h2');
    title.className = 'excursions__title';
    title.textContent = element.Title;
    
    const description = document.createElement('p');
    description.className ='excursions__description';
    description.textContent = element.Description;
    
    header.appendChild(title);
    header.appendChild(description);

    //LEWA STRONA => TWORZYMY INPUT'Y I OPISY W WYCIECZKACH
    const form = document.createElement('form');
    form.className = `excursions__form field${element.id}`; //DODANIE KLASY field1
    console.log(element.id);
    // form.addEventListener("submit", (e) => {
    //     this.addToOrder(e, element.id)
    // })

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
    // console.log(submitField);
    submitField.className = `excursions__field excursions__field--submit`;

    //LEWA STRONA => DODAJEMY WYCIECZKĘ DO ZAMÓWIENIA
    const submitInput = document.createElement('input');
    submitInput.className = 'excursions__field-input excursions__field-input--submit';
    submitInput.value = 'dodaj do zamówienia';
    submitInput.type = 'submit';
    submitInput.addEventListener('click', (e) => this.addToOrder
        (
        e,
        element.id,
        element.Title,
        element.Description,
        element.Adult_cost,
        element.Child_cost
        ));

    submitField.appendChild(submitInput)

    form.appendChild(adultField);
    form.appendChild(childField);
    form.appendChild(submitField);

    li.appendChild(header);
    li.appendChild(form);

    document.querySelector('.excursions').appendChild(li);
}

export default createExcursions;