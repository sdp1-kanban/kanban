import axios from 'axios'

const api = axios.create({
    baseURL: 'http://localhost:3001/api'
})

export const getAllUnfinishedJobs = () => api.get(`/jobs`)
export const getJob = (id) => api.get(`/job/${id}`)
export const updateJob = (id, updatedJob) => api.put(`/job/${id}`, updatedJob)

const apis = {
    getAllUnfinishedJobs,
    getJob,
    updateJob
}

export default apis
