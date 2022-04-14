import axios from 'axios'

const api = axios.create({
    baseURL: 'http://localhost:3001/api'
})

export const getAllUnfinishedJobs = () => api.get(`/jobs`)
export const getAllFinishedJobs = () => api.get(`/jobs/finished`)
export const getJob = (id) => api.get(`/job/${id}`)
export const updateJob = (id, updatedJob) => api.put(`/job/${id}`, updatedJob)
export const deleteJob = (jobId) => api.delete(`/job/${jobId}`)
export const addJob = (jobToAdd) => api.post(`/job`, jobToAdd)
export const uploadFiles = (files,jobId) => api.post(`/uploadAttachments/${jobId}`, files)
export const closeJob = (id) => api.put(`/job/close/${id}`)
export const getEmployees = () => api.get(`/employees`)
export const downloadFiles = (file, data) => api.get(`/downloadAttachments?file=${file}`, data)
export const updateReview = (id, reviewToAdd) => api.post(`job/${id}/review-notes`, reviewToAdd);
export const getReviews = (id) => api.get(`job/${id}/review-notes`)

const apis = {
    getAllUnfinishedJobs,
    getAllFinishedJobs,
    getJob,
    updateJob,
    deleteJob,
    addJob,
    uploadFiles,
    closeJob,
    getEmployees,
    downloadFiles,
    updateReview,
    getReviews
    
}

export default apis
