const SUPABASE_URL = 'https://nmgmdkwatcmqrexvwhql.supabase.co';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5tZ21ka3dhdGNtcXJleHZ3aHFsIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NDc5NzA2MTcsImV4cCI6MTk2MzU0NjYxN30.3xHneXPhk8TMzUGRgqhQh9EMm_NmROG5YLi0ZnrTNUY';

const client = supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

//create a single incomplete todo with the correct property for this user in supabase
export async function createItem(item) {
    const response = await client
        .from('shopping_lists')
        .insert({
            todo: item,
            complete: false,
            user_id: client.auth.user().id
        });

    return checkError(response);
}

//delete all for this user in supabase
export async function deleteAllItems() {
    const response = await client
        .from('shopping_lists')

        //delete all items that belong to this user
        .delete()
        .match({ user_id: client.auth.user().id });

    return checkError(response);
}

//get all shopping lists for this user from supabase
export async function getItems() {
    const response = await client
        .from('shopping_lists')
        .select('*')
        .match({ user_id: client.auth.user().id });

    return checkError(response);
}

//find and update (set complete to true), the item that matches the correct id
export async function buyItem(item) {
    const response = await client
        .from('shopping_lists')
        .update({ complete: true })
        
        //if (as above) your key name is the same as the variable name pointing to the value, you can rewrite it like so
        .match({ user_id: client.auth.user().id, id: item });

    return checkError(response);
}

export function getUser() {
    return client.auth.session() && client.auth.session().user;
}

export function checkAuth() {
    const user = getUser();

    if (!user) location.replace('../');
}

export function redirectIfLoggedIn() {
    if (getUser()) {
        location.replace('./other-page');
    }
}

export async function signupUser(email, password) {
    const response = await client.auth.signUp({ email, password });

    return response.user;
}

export async function signInUser(email, password) {
    const response = await client.auth.signIn({ email, password });

    return response.user;
}

export async function logout() {
    await client.auth.signOut();

    return (window.location.href = '../');
}

function checkError({ data, error }) {
    return error ? console.error(error) : data;
}
