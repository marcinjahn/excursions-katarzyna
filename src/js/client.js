import './../css/client.css';
import { ExcursionsAPI } from './ExcursionsAPI';
import { isTravelersCountValid, isCustomerDataValid } from './validation';
import { addToBasket, orderBasketItems } from './basket';
import { displayError } from './errors';

buildExcursionsUi();
attachOrderHandler();

async function buildExcursionsUi() {
    const excursionsApi = new ExcursionsAPI();
    const excursions = await excursionsApi.getExcursions();


    excursions.forEach(excursion => {
        const li = document.createElement('li');
        li.className = 'excursions__item  ';

        const header = document.createElement('header');
        const title = document.createElement('h2');
        title.className = 'excursions__title';
        title.textContent = excursion.Title;

        const description = document.createElement('p');
        description.className = 'excursions__description';
        description.textContent = excursion.Description;

        header.appendChild(title);
        header.appendChild(description);

        //LEWA STRONA => TWORZYMY INPUT'Y I OPISY W WYCIECZKACH
        const form = document.createElement('form');
        form.className = `excursions__form field${excursion.id}`;

        const adultContainer = document.createElement('div');
        adultContainer.className = 'excursions__field';
        adultContainer.innerHTML = `
            <label class="excursions__field-name">
                Dorosły: <b>${excursion.Adult_cost}</b>PLN x <input value="0" class="excursions__field-input" name="adults" />
            </label>
        `;

        const childContainer = document.createElement('div');
        childContainer.className = 'excursions__field';
        childContainer.innerHTML = `
            <label class="excursions__field-name">
                Dziecko: <b>${excursion.Child_cost}</b>PLN x <input value="0" class="excursions__field-input" name="children" />
            </label>
        `;

        const submitContainer = document.createElement('div');

        submitContainer.className = `excursions__field excursions__field--submit`;

        //LEWA STRONA => DODAJEMY WYCIECZKĘ DO KOSZYKA
        const submitInput = document.createElement('input');
        submitInput.className = 'excursions__field-input excursions__field-input--submit';
        submitInput.value = 'dodaj do koszyka';
        submitInput.type = 'submit';
        submitInput.addEventListener('click', async (event) => {
            event.preventDefault();
            await handleAddToBasket(excursion, event);
        });

        submitContainer.appendChild(submitInput)

        form.appendChild(adultContainer);
        form.appendChild(childContainer);
        form.appendChild(submitContainer);

        li.appendChild(header);
        li.appendChild(form);

        document.querySelector('.excursions').appendChild(li);
    });
}

async function handleAddToBasket(excursion, e) {
    const form = e.target.parentElement.parentElement;
    const adultsInput = form.childNodes[0].childNodes[1].childNodes[3];
    const childrenInput = form.childNodes[1].childNodes[1].childNodes[3];

    const isValid = isTravelersCountValid(adultsInput.value, childrenInput.value);

    if (isValid) {
        const adults = parseInt(adultsInput.value);
        const children = parseInt(childrenInput.value);

        // const ordersApi = new OrdersApi();

        // await ordersApi.createOrder({
        //     id: new Date().toISOString(), // tworzę "randomowe", unikalne ID
        //     excursion,
        //     Adult_Number: adults,
        //     Child_Number: children
        // });

        adultsInput.value = '0';
        childrenInput.value = '0';

        addToBasket({
            excursion,
            Adult_Number: adults,
            Child_Number: children
        });
    } else {
        displayError(form, "Proszę uzupełnić poprawnie wymagane pola");
    }
}

async function attachOrderHandler() {
    const orderForm = document.querySelector(".panel__order");

    orderForm.addEventListener(
        "submit",
        async (event) => {
            event.preventDefault();

            const nameInput = document.querySelector('input[name="name"]');
            const emailInput = document.querySelector('input[name="email"]');
            const name = nameInput.value.trim();
            const email = emailInput.value.trim();

            if (!isCustomerDataValid(name, email)) {
                displayError(orderForm, "Proszę uzupełnić poprawnie wymagane pola");

                return;
            }

            await orderBasketItems(name, email, orderForm);

            nameInput.value = "";
            emailInput.value = "";
        }
    );
}