import queryString from 'query-string'
const create = async (params, credentials, plot) => {
    try {
        let response = await fetch('/api/plots/by/' + params.plantId, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Authorization': 'Bearer ' + credentials.t
            },
            body: plot
        })
        return response.json()
    } catch (err) {
        console.log(err)
    }
}

const read = async (params, signal) => {
    try {
        let response = await fetch('/api/plots/' + params.plotId, {
            method: 'GET',
            signal: signal
        })
        return response.json()
    } catch (err) {
        console.log(err)
    }
}

const update = async (params, credentials, plot) => {
    try {
        let response = await fetch('/api/plot/' + params.plantId + '/' + params.plotId, {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Authorization': 'Bearer ' + credentials.t
            },
            body: plot
        })
        return response.json()
    } catch (err) {
        console.log(err)
    }
}

const remove = async (params, credentials) => {
    try {
        let response = await fetch('/api/plot/' + params.plantId + '/' + params.plotId, {
            method: 'DELETE',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + credentials.t
            }
        })
        return response.json()
    } catch (err) {
        console.log(err)
    }
}

const listByPlant = async (params, signal) => {
    try {
        let response = await fetch('/api/plots/by/' + params.plantId, {
            method: 'GET',
            signal: signal
        })
        return response.json()
    } catch (err) {
        console.log(err)
    }
}

const listLatest = async (signal) => {
    try {
        let response = await fetch('/api/plots/latest', {
            method: 'GET',
            signal: signal
        })
        return response.json()
    } catch (err) {
        console.log(err)
    }
}

const list = async (params, signal) => {
    const query = queryString.stringify(params)
    try {
        let response = await fetch('/api/plots?' + query, {
            method: 'GET',
            signal: signal
        })
        return response.json()
    } catch (err) {
        console.log(err)
    }
}

export {
    create,
    read,
    update,
    remove,
    listByPlant,
    listLatest,
    list
}

