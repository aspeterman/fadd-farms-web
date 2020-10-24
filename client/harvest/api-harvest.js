import queryString from 'query-string'
const create = async (params, credentials, harvest) => {
    try {
        let response = await fetch(`/api/harvests/` + params.plotId, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Authorization': 'Bearer ' + credentials.t
            },
            body: harvest
        })
        return await response.json()
    } catch (err) {
        console.log(err)
    }
}

const read = async (params, signal) => {
    try {
        let response = await fetch('/api/harvests/' + params.harvestId, {
            method: 'GET',
            signal: signal
        })
        return response.json()
    } catch (err) {
        console.log(err)
    }
}

const listHarvestFeed = async (params, credentials, signal) => {
    try {
        let response = await fetch('/api/harvests/feed', {
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

const update = async (params, credentials, harvest) => {
    try {
        let response = await fetch('/api/harvest/' + params.plotId + '/' + params.harvestId, {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Authorization': 'Bearer ' + credentials.t
            },
            body: harvest
        })
        return response.json()
    } catch (err) {
        console.log(err)
    }
}

const remove = async (params, credentials) => {
    try {
        let response = await fetch('/api/harvest/' + params.plotId + '/' + params.harvestId, {
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

const listByPlot = async (params, signal) => {
    try {
        let response = await fetch('/api/harvests/by/' + params.plotId, {
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
        let response = await fetch('/api/harvests/latest', {
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
        let response = await fetch('/api/harvests?' + query, {
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
    listHarvestFeed,
    update,
    remove,
    listByPlot,
    listLatest,
    list
}

