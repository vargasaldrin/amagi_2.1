/* GLOBAL VARIABLES */
const displayList = document.getElementById('list')
const checkChar = /^[a-zA-Z]+$/;
const guestList = []

// Iterates through the guestList and renders a name card for each index
renderList = () => {
    displayList.innerHTML = ""
    for(let i = 0; i < guestList.length; i++) {
        // Create a name card element
        const card = document.createElement('div')
        card.className = "card"

        // Create div for name
        const name = document.createElement('div')
        name.className = "name"
        name.textContent = guestList[i]

        // Create remove button
        const remove = document.createElement('button')
        remove.className = "remove"
        remove.textContent = "remove"
        remove.addEventListener('click', () => removeCard(i))

        // Create edit button
        const edit = document.createElement('button')
        edit.className = "edit"
        edit.textContent = "edit"
        edit.addEventListener('click', (e) => editCard(e, i))
        
        // Append all elements to DOM
        card.appendChild(name)
        card.appendChild(remove)
        card.appendChild(edit)
        displayList.appendChild(card)
    }
}

// Removes a name card from the list
removeCard = (index) => {
    guestList.splice(index, 1)
    renderList()
}

// Edits the name from the name card
editCard = (e, index) => {
    // Store first and last child of name card into variables for editing
    const cardName = e.target.parentElement.firstChild
    const oldButton = e.target.parentElement.lastChild

    // Create input element
    const inputName = document.createElement("input")
    inputName.type = "text"
    inputName.id = "nameValue"
    inputName.className = "name_edit"
    inputName.value = guestList[index]

    // Render input element in name card
    cardName.innerHTML = ""
    cardName.appendChild(inputName)
    
    // Create edit button
    const cardSave = document.createElement("button")
    cardSave.className = "save"
    cardSave.textContent = "save"
    cardSave.addEventListener('click', (e) =>{ 
        // Check if input has been filled correctly, calls saveCard() if passed
        const checkName = inputName.value.replace(/\s+/g, '')
        if(checkName.match(checkChar) && inputName.value.length < 18) {
            guestList[index] = inputName.value
            return saveCard(e, index)
        } else {
            alert("Please enter alphabets and spaces only and must be less than 18 characters long")
        }
    })

    oldButton.parentNode.replaceChild(cardSave, oldButton);
}

// Saves the name to guestList and edit the name from the name card
saveCard = (e, index) => {
    // Store first and last child of name card into variables for editing
    const cardName = e.target.parentElement.firstChild
    const oldButton = e.target.parentElement.lastChild

    //Change input element in name card into it's stored value
    cardName.innerHTML = guestList[index]

    // Create save button
    const cardEdit = document.createElement("button")
    cardEdit.className = "edit"
    cardEdit.textContent = "edit"
    cardEdit.addEventListener('click', (e) => editCard(e, index))

    // replace
    oldButton.parentNode.replaceChild(cardEdit, oldButton);
}

// Adds input value to guestList array and calls the renderList function
submit.addEventListener('click', (e) => {
    e.preventDefault;
    const name = document.getElementById('name').value
    const nameCheck = name.replace(/\s+/g, '')
    // Check if input field is filled correctly, call renderList if passed
    if(nameCheck.match(checkChar) && name.length < 18) {
        guestList.push(name)
        renderList()
    } else {
        alert("Please enter alphabets and spaces only and must be less than 18 characters long");
    }
    document.getElementById('name').value = ""
})