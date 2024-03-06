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
  
  
    return [projects]
}

export default useProjects