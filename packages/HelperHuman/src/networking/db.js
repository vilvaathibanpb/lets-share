const url = "https://helper-human-api.herokuapp.com";

const getUsersAtPincode = async (pin) => {
    try {
        const response = await fetch(`${url}/users/${pin}`);
        const data = await response.json();
        return data;
    } catch (error) {
        console.log(error)
    }
}

const getRequestsAtPincode = async (pin) => {
    try {
        const response = await fetch(`${url}/requests/${pin}`);
        const data = await response.json();
        return data;
    } catch (error) {
        console.log(error)
    }
}

const getAvailableItemsAtPincode = async (pin) => {
    try {
        const response = await fetch(`${url}/shared/${pin}`);
        const data = await response.json();
        return data;
    } catch (error) {
        console.log(error)
    }
}

const createUser = async (body) => {
    console.log('body', body)
    try {
        const response = await fetch(`${url}/users/create`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(body)
        });
        const data = await response.json();
        return data;
    } catch (error) {
        console.log(error)
    }
}

const createRequest = async (body) => {
    try {
        const response = await fetch(`${url}/requests/create`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(body)
        });
        const data = await response.json();
        return data;
    } catch (error) {
        console.log(error)
    }
}

module.exports = {
    getRequestsAtPincode,
    getUsersAtPincode,
    getAvailableItemsAtPincode,
    createRequest,
    createUser,
};