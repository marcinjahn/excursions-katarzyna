import './../css/client.css';
import { ExcursionsAPI } from './ExcursionsAPI';
import { OrdersApi } from './OrdersApi';

buildExcursionsUi();
refreshOrders();

// api.getExcursionClient();
// api.getOrders();
// api.orderFormSubmit();

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
        description.className ='excursions__description';
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
                Dorosły: <b>${excursion.Adult_cost}</b>PLN x <input class="excursions__field-input" name="adults" />
            </label>
        `;

        const childContainer = document.createElement('div');
        childContainer.className = 'excursions__field';
        childContainer.innerHTML = `
            <label class="excursions__field-name">
                Dziecko: <b>${excursion.Child_cost}</b>PLN x <input class="excursions__field-input" name="children" />
            </label>
        `;

        const submitContainer = document.createElement('div');
        // console.log(submitField);
        submitContainer.className = `excursions__field excursions__field--submit`;

        //LEWA STRONA => DODAJEMY WYCIECZKĘ DO ZAMÓWIENIA
        const submitInput = document.createElement('input');
        submitInput.className = 'excursions__field-input excursions__field-input--submit';
        submitInput.value = 'dodaj do zamówienia';
        submitInput.type = 'submit';
        submitInput.addEventListener('click', async (e) => {
            const ordersApi = new OrdersApi();
            
            await ordersApi.createOrder({
                id: new Date().toISOString(), // tworzę "randomowe", unikalne ID
                excursion,
                Adult_Number: 2, // TODO: Implement
                Child_Number: 1  // TODO: Implement
            });

            refreshOrders();
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

async function refreshOrders() {
    const existingOrders = document.querySelectorAll('summary__item');
    existingOrders.forEach(order => order.remove());


    const ordersApi = new OrdersApi();
    const orders = await ordersApi.getOrders();

    let totalCostNumber = 0;

    orders.forEach(order => {
        const li = document.createElement('li');
        li.className = 'summary__item';

        const h3 = document.createElement('h3');
        h3.className = 'summary__title';

        const spanName = document.createElement('span');
        spanName.className = 'summary__name';
        spanName.textContent = order.excursion.Title;

        const strongTotalPrice = document.createElement('strong');
        strongTotalPrice.className = 'summary__total-price';

        const orderCost = order.excursion.Adult_cost * order.Adult_number + order.excursion.Child_cost * order.Child_number;

        strongTotalPrice.textContent = orderCost;
        totalCostNumber += orderCost;
        const removeLink = document.createElement('a');
  
        removeLink.onclick = () => {
            deleteOrder(order.id);
            li.remove();
        };

        removeLink.className = 'summary__btn-remove';
        removeLink.title = 'usuń';
        removeLink.textContent = 'X';

        const pPrices = document.createElement('p');
        console.log(pPrices);
        pPrices.className = 'summary__prices';
        pPrices.textContent = `dorośli: ${order.Adult_number} x ${order.excursion.Adult_cost}PLN, dzieci: ${order.Child_number} x ${order.excursion.Child_cost}PLN`;

        h3.appendChild(spanName);
        h3.appendChild(strongTotalPrice);
        h3.appendChild(removeLink);

        li.appendChild(h3);
        li.appendChild(pPrices);

        document.querySelector('.panel__summary').appendChild(li);
        document.querySelector('.order__total-price-value').innerHTML= `${totalCostNumber}PLN`
    });
}

async function deleteOrder(id) {
    const ordersApi = new OrdersApi();
    await ordersApi.deleteOrder(id);
}