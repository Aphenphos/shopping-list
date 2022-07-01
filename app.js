import { getUser, signOut } from './services/auth-service.js';
import { protectPage } from './utils.js';
import createUser from './components/User.js';
import { getAllItems, createItem, deleteItem, updateItem } from './services/Item-service.js';
import createListItems from './components/Items.js';
import createNewItem from './components/AddItem.js';
// State
let user = null;
let items = [];


// Action Handlers

async function handleAdd(itemName, quantity) {
    const item = await createItem({
        name: itemName,
        quantity: quantity,
        bought: false,
    });
    items.push(item);
}

async function handleBuy(item) {
    item.bought = true;
    const index = item.indexOf(item);
    items[index] = await updateItem(item);
}

async function handleDelete(item) {
    const index = items.indexOf(item);
    await deleteItem(item);
    items.splice(index, 1);

    display();
}

async function handlePageLoad() {
    user = getUser();
    protectPage(user);

    items = await getAllItems();

    display();
}

async function handleSignOut() {
    signOut();
}

// Components 
const User = createUser(
    document.querySelector('#user'),
    { handleSignOut }
);

const Items = createListItems(document.querySelector('#list-container'), {
    handleBuy,
    handleDelete,
});

const AddItem = createNewItem(document.querySelector('#user-inputs'), {
    handleAdd
});

function display() {
    User({ user });
    Items({ items });
    AddItem();
}

handlePageLoad();
