import axios from 'axios'

const api = axios.create({
    baseURL: 'http://localhost:3001/api'
})

export const getAllUnfinishedJobs = () => api.get(`/jobs`)
export const deleteJob = (jobId) => api.delete(`/job/${jobId}`)

const apis = {
    getAllUnfinishedJobs,
    deleteJob
}

export default apis
