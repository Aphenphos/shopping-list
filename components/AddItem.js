export default function createNewItem(input, { handleAdd }) {
    
    input.addEventListener('keypress', (e) => {
        if (e.key !== 'Enter' || input.value === '') return;
        handleAdd(input.value);
        input.value = '';
    });

    return () => { };
}

//this is way better than form.