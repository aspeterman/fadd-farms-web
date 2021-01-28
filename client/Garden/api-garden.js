const create = async (params, credentials, garden) => {
    try {
        let response = await fetch('/api/garden/new/' + params.userId, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Authorization': 'Bearer ' + credentials.t
            },
            body: garden
        })
        return await response.json()
    } catch (err) {
        console.log(err)
    }
}

const update = async (params, credentials, garden) => {
    try {
        let response = await fetch('/api/garden/update/', {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + credentials.t
            },
            body: JSON.stringify({ userId: params.userId, gardenId: params.gardenId, garden: garden })
        })
        return await response.json()
    } catch (err) {
        console.log(err)
    }

}

const getOne = async (params, credentials) => {
    try {
        let response = await fetch('/api/garden/' + params.gardenId, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + credentials.t
            }
        })
        return await response.json()
    } catch (err) {
        console.log(err)
    }
}

const listByUser = async (params, credentials) => {
    try {
        let response = await fetch('/api/garden/by/' + params.userId, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + credentials.t
            }
        })
        return await response.json()
    } catch (err) {
        console.log(err)
    }
}

const listGardenSchema = async (params, credentials, signal) => {
    try {
        let response = await fetch('/api/garden/feed/' + params.userId, {
            method: 'GET',
            signal: signal,
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + credentials.t
            }
        })
        return await response.json()
    } catch (err) {
        console.log(err)
    }
}

const remove = async (params, credentials) => {
    try {
        let response = await fetch('/api/garden/' + params.gardenId, {
            method: 'DELETE',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + credentials.t
            }
        })
        return await response.json()
    } catch (err) {
        console.log(err)
    }
}


const like = async (params, credentials, gardenId) => {
    try {
        let response = await fetch('/api/garden/like/', {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + credentials.t
            },
            body: JSON.stringify({ userId: params.userId, gardenId: gardenId })
        })
        return await response.json()
    } catch (err) {
        console.log(err)
    }
}


const unlike = async (params, credentials, gardenId) => {
    try {
        let response = await fetch('/api/gardem/unlike/', {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + credentials.t
            },
            body: JSON.stringify({ userId: params.userId, gardenId: gardenId })
        })
        return await response.json()
    } catch (err) {
        console.log(err)
    }
}


const comment = async (params, credentials, gardenId, comment) => {
    try {
        let response = await fetch('/api/garden/comment/', {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + credentials.t
            },
            body: JSON.stringify({ userId: params.userId, gardenId: gardenId, comment: comment })
        })
        return await response.json()
    } catch (err) {
        console.log(err)
    }
}


const uncomment = async (params, credentials, gardenId, comment) => {
    try {
        let response = await fetch('/api/garden/uncomment/', {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + credentials.t
            },
            body: JSON.stringify({ userId: params.userId, gardenId: gardenId, comment: comment })
        })
        return await response.json()
    } catch (err) {
        console.log(err)
    }
}


export {
    listGardenSchema,
    listByUser,
    create,
    update,
    getOne,
    remove,
    like,
    unlike,
    comment,
    uncomment
}

