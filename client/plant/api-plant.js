const create = async (params, credentials, post) => {
    try {
        let response = await fetch('/api/plants/new/' + params.userId, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Authorization': 'Bearer ' + credentials.t
            },
            body: post
        })
        return await response.json()
    } catch (err) {
        console.log(err)
    }
}

const update = async (params, credentials, plant) => {
    try {
        let response = await fetch('/api/plants/' + params.plantId, {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Authorization': 'Bearer ' + credentials.t
            },
            body: plant
        })
        return await response.json()
    } catch (err) {
        console.log(err)
    }
}

const listPlantByUser = async (params, credentials) => {
    try {
        let response = await fetch('/api/plants/by/' + params.userId, {
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

const listPlants = async (params, credentials, signal) => {
    try {
        let response = await fetch('/api/plants/feed/' + params.userId, {
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

const getOne = async (params, credentials) => {
    try {
        let response = await fetch('/api/plants/getone/' + params.plantId, {
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

const activate = async (params, credentials, plantId) => {
    try {
        let response = await fetch('/api/plants/activate/', {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + credentials.t
            },
            body: JSON.stringify({ userId: params.userId, plantId: plantId })
        })
        return await response.json()
    } catch (err) {
        console.log(err)
    }
}
const remove = async (params, credentials) => {
    try {
        let response = await fetch('/api/plants/' + params.plantId, {
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


const like = async (params, credentials, plantId) => {
    try {
        let response = await fetch('/api/plants/like/', {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + credentials.t
            },
            body: JSON.stringify({ userId: params.userId, plantId: plantId })
        })
        return await response.json()
    } catch (err) {
        console.log(err)
    }
}


const unlike = async (params, credentials, plantId) => {
    try {
        let response = await fetch('/api/plants/unlike/', {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + credentials.t
            },
            body: JSON.stringify({ userId: params.userId, plantId: plantId })
        })
        return await response.json()
    } catch (err) {
        console.log(err)
    }
}


const comment = async (params, credentials, plantId, comment) => {
    try {
        let response = await fetch('/api/plants/comment/', {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + credentials.t
            },
            body: JSON.stringify({ userId: params.userId, plantId: plantId, comment: comment })
        })
        return await response.json()
    } catch (err) {
        console.log(err)
    }
}


const uncomment = async (params, credentials, plantId, comment) => {
    try {
        let response = await fetch('/api/plants/uncomment/', {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + credentials.t
            },
            body: JSON.stringify({ userId: params.userId, plantId: plantId, comment: comment })
        })
        return await response.json()
    } catch (err) {
        console.log(err)
    }
}

const plot = async (params, credentials, plantId, plot) => {
    try {
        let response = await fetch('/api/plants/plot/', {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + credentials.t
            },
            body: JSON.stringify({ userId: params.userId, plantId: plantId, plot: plot })
        })
        return await response.json()
    } catch (err) {
        console.log(err)
    }
}


const unplot = async (params, credentials, plantId, plot) => {
    try {
        let response = await fetch('/api/plants/unplot/', {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + credentials.t
            },
            body: JSON.stringify({ userId: params.userId, plantId: plantId, plot: plot })
        })
        return await response.json()
    } catch (err) {
        console.log(err)
    }
}

const createHarvest = async (params, credentials, plantId, plotId, harvest) => {
    try {
        let response = await fetch('/api/plants/harvest/', {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + credentials.t
            },
            body: JSON.stringify({ userId: params.userId, plantId: plantId, plotId: plotId, harvest: harvest })
        })
        return await response.json()
    } catch (err) {
        console.log(err)
    }
}

const unHarvest = async (params, credentials, plantId, harvest) => {
    try {
        let response = await fetch('/api/plants/unharvest/', {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + credentials.t
            },
            body: JSON.stringify({ userId: params.userId, plantId: plantId, harvest: harvest })
        })
        return await response.json()
    } catch (err) {
        console.log(err)
    }
}


export {
    listPlants,
    listPlantByUser,
    create,
    update,
    getOne,
    remove,
    activate,
    like,
    unlike,
    comment,
    uncomment,
    plot,
    unplot,
    createHarvest,
    unHarvest
}

