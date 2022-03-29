//import necessary files from respective files
import {
    checkAuth,
    createItem,
    buyItem,
    getItems,
    logout,
    deleteAllItems,
} from '../fetch-utils.js';
import { renderItem } from '../render-utils.js';

checkAuth();

const shoppingListsEl = document.querySelector('.shopping-lists');
const shoppingListForm = document.querySelector('.shopping-list-form');
const logoutButton = document.getElementById('logout');
const deleteButton = document.querySelector('.delete-button');

shoppingListForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    //get data from the form
    const data = new FormData(shoppingListForm);

    //on submit, create a shopping list, reset the form, and display the shopping list
    const shoppingList = data.get('shopping-list');

    //call our createToDo function
    await createItem(shoppingList);

    shoppingListForm.reset();

    //refetch and reappend
    fetchAndDisplayList();
});

async function fetchAndDisplayList() {
    //fetch the shopping lists
    const shoppingLists = await getItems();

    shoppingListsEl.textContent = '';

    //display the list of shopping items
    for (let shoppingList of shoppingLists) {
        const shoppingListEl = renderItem(shoppingList);

        //be sure to give each item an event listener
        //on click, complete that todo
        shoppingListEl.addEventListener('click', async () => {
            await buyItem(shoppingList.id);

            fetchAndDisplayList();
        });

        shoppingListEl.append(shoppingListEl);
    }
}

//add an on load listener that fetches and displays shopping list on load
window.addEventListener('load', async () => {
    fetchAndDisplayList();
});

logoutButton.addEventListener('click', () => {
    logout();
});

deleteButton.addEventListener('click', async () => {
    //delete all items
    await deleteAllItems();

    //refetch and display the updated list of todos
    await fetchAndDisplayList();
});