
export function Item(item, { handleBuy, handleDelete }) {
    const li = document.createElement('li');
    li.classList.add('item-container');

    const h1 = document.createElement('h1');
    h1.textContent = item.item;
    h1.classList.add('item-name');

    const h2 = document.createElement('h2');
    h2.textContent = item.quantity;
    h2.classList.add('item-quantity');

    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.classList.add('item-checkbox');
    if (item.bought === true) {
        checkbox.checked = true;
        li.classList.add('bought');
    } else {
        checkbox.checked = false;
    }
    // checkbox.checked = false;
    checkbox.addEventListener('click', () => {
        handleBuy(item);
    });

    const button = document.createElement('button');
    button.classList.add('remove-item');
    button.textContent = 'delete';
    button.addEventListener('click', () => {
        handleDelete(item);
    });

    li.append(h1, h2, checkbox, button);

    return li;

}


export default function createListItems(root, {
    handleBuy,
    handleDelete,
}) {

    return ({ items }) => {
        root.innerHTML = '';

        for (const item of items) {
            const li = Item(
                item, {
                    handleBuy,
                    handleDelete,
                });
            root.append(li);
        }
    };
}