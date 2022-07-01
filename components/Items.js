
export function Item({ item, handleBought, handleDelete}) {
    const li = document.createElement('li');
    li.classList.add('item-container');
    if (item.bought) {
        li.classList.add('bought');
    }

    const h1 = document.createElement('h1');
    h1.textContent = item.name;
    h1.classList.add('item-name');

    const h2 = document.createElement('h2');
    h2.textContent = item.quantity;
    h2.classList.add('item-quantity');

    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.classList.add('item-checkbox');
    checkbox.checked = item.bought;
    checkbox.addEventListener('click', () => {
        handleBought(item);
    });

    const button = document.createElement('button');
    button.classList.add('remove-item');
    button.addEventListener('click', () => {
        handleDelete(item);
    });

}


export default function createListItems(root, {
    handleBought,
    handleDelete,
}) {

    return ({ items }) => {
        root.innerHTML = '';

        for (const item of items) {
            const li = Item({
                item,
                handleBought,
                handleDelete,
            });
            root.append(li);
        }
    };
}