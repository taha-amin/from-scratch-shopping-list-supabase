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

const shoppingListsEl = document.querySelector('')

const logoutButton = document.getElementById('logout');

logoutButton.addEventListener('click', () => {
    logout();
});