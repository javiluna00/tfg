import React, { useEffect, useState } from 'react'
import useAuth from './useAuth'

function useProfile() {

    const { userLogged } = useAuth()

    const [profileData, setProfileData] = useState()
    const [isEditing, setIsEditing] = useState(false)


    useEffect(() => {
        setProfileData({
            nombre: userLogged?.nombre,
            email: userLogged?.email,
            nombre_artistico: userLogged?.nombre_artistico,
        })
    }, [userLogged])


    const startEditing = () => {
        setIsEditing(true)
    }

    const saveEditing = () => {
        setIsEditing(false)
        console.log(profileData)
    }

    const modificarDatos = (newData) => {
        setProfileData(newData)
    }

    return { startEditing, saveEditing, profileData, isEditing, modificarDatos }

}

export default useProfile