import axios from 'axios'

const api = axios.create({
    baseURL: 'http://localhost:3001/api'
})

export const getAllUnfinishedJobs = () => api.get(`/jobs`)
export const getJob = (id) => api.get(`/job/${id}`)
export const updateJob = (id, updatedJob) => api.put(`/job/${id}`, updatedJob)
export const deleteJob = (jobId) => api.delete(`/job/${jobId}`)
export const addJob = (jobToAdd) => api.post(`/job`, jobToAdd)

const apis = {
    getAllUnfinishedJobs,
    getJob,
    updateJob,
    deleteJob,
    addJob
}

export default apis
