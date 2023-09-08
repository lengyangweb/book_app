export const userLoader = async () => {
    const users = await getUsers();

    return users;
}

const getUsers = async () => {
    const res = await fetch('https://jsonplaceholder.typicode.com/users', {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    });

    if (!res) throw new Error('Fail to fetch users data.')

    const users = await res.json();

    return users;
}