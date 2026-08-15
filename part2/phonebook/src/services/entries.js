import axios from 'axios'

const baseUrl = import.meta.env.VITE_BASE_URI || 'http://localhost:3001/api/persons'

const getAll = () => {
    const request = axios.get(baseUrl)
    return request.then(response => response.data)
}

const create = (newEntry) => {
    const request = axios.post(baseUrl, newEntry)
    return request.then(response => response)
}

const remove = (id) => {
    const request = axios.delete(`${baseUrl}/${id}`)
    return request.then(response => response.data)
}

const update = (id, updatedEntry) => {
    const request = axios.put(`${baseUrl}/${id}`, updatedEntry)
    return request.then(response => response)
}

export default {getAll, create, remove, update}