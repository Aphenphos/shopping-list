import { getUser, signOut } from './services/auth-service.js';
import { protectPage } from './utils.js';
import createUser from './components/User.js';
import { getAllItems, createItem, deleteItem, updateItem } from './services/Item-service.js';
import createListItems from './components/Items.js';
// State
let user = null;
let items = [];
const inputForm = document.getElementById('user-inputs');

//form
inputForm.addEventListener('submit', async (e)=> {
    e.preventDefault();
    const data = new FormData(inputForm);
    console.log(data.get('name'));
    const item = await createItem({
        item: data.get('name'),
        quantity: data.get('quantity'),
        bought: false,
        user_id: user.id
    });
    console.log(item);
    items.push(item);
});


// Action Handlers

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


function display() {
    User({ user });
    Items({ items });
}

handlePageLoad();
