import { client } from './client.js';


export async function getAllItems() {
    const response = await client
        .from('items')
        .select()
        .order('created_at', { ascending: true });

    return response.data;
}

export async function updateItem(item) {
    const response = await client
        .from('items')
        .update(item)
        .match({ id: item.id });
    return response.data;
}

export async function createItem(item) {
    const response = await client
        .from('items')
        .insert(item)
        .single();
    return response.data;
}
export async function deleteItem(item) {
    const response = await client
        .from('items')
        .delete()
        .match({ id: item.id })
        .single();

    return response.data;
}