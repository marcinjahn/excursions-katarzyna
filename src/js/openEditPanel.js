const openEditPanel = (e,id) => {
    e.preventDefault();
    const panel = document.querySelector(".panel"); 
    panel.classList.add("disabledPanel")

    const edit_panel = document.querySelector(".edit_panel")
    edit_panel.style.display="block";
    edit_panel.setAttribute("id", id);  
}

export default openEditPanel;