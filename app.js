import { getUser, signOut } from './services/auth-service.js';
import { protectPage } from './utils.js';
import createUser from './components/User.js';
import { getAllItems, createItem, deleteItem, updateItem, deleteAllItems } from './services/Item-service.js';
import createListItems from './components/Items.js';
// State
let user = null;
let items = [];
const inputForm = document.getElementById('user-inputs');
const deleteAllButton = document.getElementById('delete-all');

//form
inputForm.addEventListener('submit', async (e)=> {
    e.preventDefault();
    const data = new FormData(inputForm);
    const item = await createItem({
        item: data.get('name'),
        quantity: data.get('quantity'),
        bought: false,
        user_id: user.id
    });
    items.push(item);
    display();
});


deleteAllButton.addEventListener('click', async () => {
    items = [];
    await deleteAllItems();

    display();
});

// Action Handlers

async function handleBuy(item) {
    item.bought = !item.bought;
    await updateItem(item);

    display();
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
