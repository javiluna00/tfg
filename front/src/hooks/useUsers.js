import Axios from '@/components/AxiosSubmit'
import React, { useEffect, useState } from 'react'
import useAuthHeader from 'react-auth-kit/hooks/useAuthHeader'

function useUsers() {
  
    
    const [users, setUsers] = useState([])
    const [loading, setLoading] = useState(false)

    const authHeader = useAuthHeader()

    useEffect(() => {
        setLoading(true)
        Axios.get(`/user/`, {headers: {Authorization: authHeader}}).then((res) => {
            setUsers(res.data)
        }).catch((err) => {
            console.log(err)
        })
        .finally(() => {
            setLoading(false) // Se mueve aquí para asegurar que se actualice correctamente
        })
        
    }, [])


    const updateProject = async (id, data) => {
        setLoading(true)
        await Axios.patch(`/user/${id}`, data).then((res) => {
            Axios.get(`/user/`).then((res) => {
                setUsers(res.data)
            }).catch((err) => {
                console.log(err)
            })
        }).catch((err) => {
            console.log(err)
        }).finally(() => {
            setLoading(false)
        })
    }
  
  
    return [users, updateProject, loading]
}

export default useUsers