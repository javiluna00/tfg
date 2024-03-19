import Axios from '@/components/AxiosSubmit'
import React, { useEffect, useState } from 'react'
import useAuthHeader from 'react-auth-kit/hooks/useAuthHeader'
import { toast } from 'react-toastify'

function useUsers() {
  
    
    const [users, setUsers] = useState([])
    const [loading, setLoading] = useState(false)


    const getAllUsers = async (authHeader) => {
        console.log("hola?")
        setLoading(true)
        Axios.get(`/user/`, {headers: {Authorization: authHeader}}).then((res) => {
            setUsers(res.data)
        }).catch((err) => {
            console.log(err)
        })
        .finally(() => {
            setLoading(false)
        })
    }

    const getOneUser = async (id, authHeader) => {
        return Axios.get(`/user/${id}`, {headers: {Authorization: authHeader}}).then((res) => {
            return res.data.user

        })
    }

    const getAllRoles = async (authHeader) => {
        return Axios.get(`/roles/`, {headers: {Authorization: authHeader}}).then((res) => {
            return res.data
        })
    }

    const updateUser = async (id, data, authHeader) => {
        setLoading(true)
        await Axios.patch(`/user/${id}`, data, {headers: {Authorization: authHeader}}).then((res) => {
            Axios.get(`/user/`).then((res) => {
                setUsers(res.data)
                toast.success(res.data.message)
            }).catch((err) => {
                console.log(err)
            })
        }).catch((err) => {
            console.log(err)
        }).finally(() => {
            setLoading(false)
        })
    }
  
  
    return {users, updateUser, loading, getAllUsers, getOneUser, setLoading, getAllRoles}
}

export default useUsers