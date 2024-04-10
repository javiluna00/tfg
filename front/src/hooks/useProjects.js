import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify'

function useProjects ({ AxiosPrivate }) {
  const [projects, setProjects] = useState([])
  const [activeProjects, setActiveProjects] = useState([])

  const getActiveProjects = async () => {
    await AxiosPrivate.get('/project/getVisible').then((res) => {
      setActiveProjects(res.data)
    })
  }
  const getAllProjects = async () => {
    await AxiosPrivate.get('/project/').then((res) => {
      setProjects(res.data)
    }).catch((err) => {
      toast.error(err.response.data.message)
    })
  }

  const createProject = async (data) => {
    AxiosPrivate.post('/project', data, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    }).then((res) => {
      toast.success(res.data.message)
    })
  }

  const deleteProject = async (id) => {
    await AxiosPrivate.delete(`/project/${id}`).then((res) => {
      setProjects(projects.filter((project) => project.id !== id))
      toast.success(res.data.message)
    }).catch((err) => {
      console.log(err)
    })
  }

  const updateProject = async (id, data) => {
    await AxiosPrivate.post(`/project/${id}?_method=PATCH`, data, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    }).then((res) => {
      toast.success(res.data.message)
      getAllProjects()
    }).catch((err) => {
      console.log(err)
    })
  }

  const getOneProject = async (id) => {
    return await AxiosPrivate.get(`/project/${id}`).then((res) => {
      return res.data
    })
  }

  return { projects, activeProjects, getAllProjects, getActiveProjects, createProject, deleteProject, updateProject, getOneProject }
}

export default useProjects
