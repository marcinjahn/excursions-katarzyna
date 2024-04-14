import './../css/admin.css';
import { ExcursionsAPI } from './ExcursionsAPI';

const api = new ExcursionsAPI();
builtExcursionsAdminUi();

// api.getExcursionAdmin();
// api.Init()


async function builtExcursionsAdminUi() {
    const excursionsApi = new ExcursionsAPI();
    const excursions = await excursionsApi.createExcursionAdminPanel();

    excursions.forEach((excursion) => {

        const li = document.createElement("li");
        li.className = "excursions__item";

        const header = document.createElement("header");
        const title = document.createElement("h2");
        title.className = "excursions__title";
        title.textContent = excursion.Title;
        
        const description = document.createElement("p");
        description.className = "excursions__description";
        description.textContent = excursion.Description;
        header.appendChild(title);
        header.appendChild(description);

        const form = document.createElement("form");
        form.className = "excursions__form";

        const adultField = document.createElement("div");
        adultField.className = "excursions__field";
        adultField.innerHTML = `
                    <label class="excursions__field-name">
                        Dorosły: <b>${excursion.Adult_cost}</b>PLN
                    </label>
                `;

        const childField = document.createElement("div");
        childField.className = "excursions__field";
        childField.innerHTML = `
                    <label class="excursions__field-name">
                        Dziecko: <b>${excursion.Child_cost}</b>PLN
                    </label>
                `;

        const submitField = document.createElement("div");
        submitField.className = "excursions__field excursions__field--submit";

        const editButton = document.createElement("input");
        editButton.className =
          "excursions__field-input excursions__field-input--edit";
        editButton.value = "edytuj";
        editButton.type = "button";
        editButton.addEventListener("click", (e) =>
          this.openEditPanel(e, excursion.id)
        );

        submitField.appendChild(editButton);

        const deleteButton = document.createElement("input");
        deleteButton.className =
          "excursions__field-input excursions__field-input--remove";
        deleteButton.value = "usuń";
        deleteButton.type = "button";
        deleteButton.onclick = () => this.deleteExcursion(excursion.id);

        submitField.appendChild(deleteButton);

        form.appendChild(adultField);
        form.appendChild(childField);
        form.appendChild(submitField);

        li.appendChild(header);
        li.appendChild(form);

        document.querySelector(".excursions").appendChild(li);
      });

}
