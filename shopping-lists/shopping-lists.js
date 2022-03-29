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

const logoutButton = document.getElementById('logout');

logoutButton.addEventListener('click', () => {
    logout();
});
