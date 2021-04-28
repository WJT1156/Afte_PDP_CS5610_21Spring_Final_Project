const USER_DATA_URL = ""

//fetch url is determinded by server side
const findUserByUsername = (name) =>
    fetch(`${USER_DATA_URL}/users/${name}`)
        .then(response => response.json)

const findUserById = (id) =>
    fetch(`${USER_DATA_URL}/users/${id}`)
        .then(response => response.json)

const createUser = (user) =>
    fetch(`${USER_DATA_URL}/users`, {
        method: "POST",
        body:JSON.stringify(user),
        headers: {
            'content-type': 'application/json'
        }
    }).then(response => response.json)


const updateUser = (user) =>
    fetch(`${USER_DATA_URL}/users`, {
        method: 'PUT',
        body: JSON.stringify(user),
        headers: {
            'content-type': 'application/json'
        }
    }).then(response => response.json())

const api = {
    findUserByUsername,
    findUserById,
    createUser,
    updateUser
}
export default api