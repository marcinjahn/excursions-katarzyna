export function displayError(parent, message) {
    const errorElement = document.createElement("p");
    errorElement.innerText = message;
    parent.appendChild(errorElement);

    setTimeout(() => {
        errorElement.remove();
    }, 3000);
}