import Axios from '@/components/AxiosSubmit'
import React, { useEffect, useState } from 'react'

function useProjects() {
  
    
    const [projects, setProjects] = useState([])

    useEffect(() => {
      Axios.get(`/project/`).then((res) => {
        console.log("Projects : ", res.data)
        setProjects(res.data)
      })    
    }, [])

    const deleteProject = async (id) => {
        await Axios.delete(`/project/${id}`).then((res) => {
            setProjects(projects.filter((project) => project.id !== id))
        }).catch((err) => {
            console.log(err)
        })
    }

    const updateProject = async (id, data) => {
        await Axios.patch(`/project/${id}`, data).then((res) => {
            Axios.get(`/project/`).then((res) => {
                setProjects(res.data)
            }).catch((err) => {
                console.log(err)
            })
        }).catch((err) => {
            console.log(err)
        })
    }
  
  
    return [projects, deleteProject, updateProject]
}

export default useProjects