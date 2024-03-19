import Axios from '@/components/AxiosSubmit'
import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify'

function useProjects() {
  
    
    const [projects, setProjects] = useState([])
    const [activeProjects, setActiveProjects] = useState([])

    const getActiveProjects = async () => {
        await Axios.get(`/project/getVisible`).then((res) => {
            setActiveProjects(res.data)
        })
    }
    const getAllProjects = async (authHeader) => {
        await Axios.get(`/project/`, {
            headers: {
                Authorization: authHeader
            }
        }).then((res) => {
            setProjects(res.data)
        }).catch((err) => {
            toast.error(err.response.data.message)
        })
    }

    const deleteProject = async (id, authHeader) => {
        await Axios.delete(`/project/${id}`, 
        {
            headers: {
                Authorization: authHeader
            }
        }).then((res) => {
            setProjects(projects.filter((project) => project.id !== id))
            toast.success(res.data.message)
        }).catch((err) => {
            console.log(err)
        })
    }

    const updateProject = async (id, data, authHeader) => {

        console.log("newData", data)

        await Axios.post(`/project/${id}?_method=PATCH`, data, {
            headers: {
                "Content-Type": "multipart/form-data",
                Authorization: authHeader,
            }
        }).then((res) => {
            toast.success(res.data.message)
            Axios.get(`/project/`).then((res) => {
                setProjects(res.data)
            }).catch((err) => {
                console.log(err)
            })
        }).catch((err) => {
            console.log(err)
        })
    }

    const getOneProject = async (id, authHeader) => {

        return await Axios.get(`/project/${id}`, {
            headers: {
                Authorization: authHeader
            }
        }).then((res) => {
            return res.data
        })
    }
  
  
    return {projects, activeProjects, getAllProjects, getActiveProjects, deleteProject, updateProject, getOneProject}
}

export default useProjects