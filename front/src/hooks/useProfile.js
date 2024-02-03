import React, { useEffect, useState } from 'react'
import useAuth from './useAuth'
import {authState} from "@/store/authStore";
import { useRecoilState } from 'recoil';

function useProfile() {

    const { userLogged } = useAuth()

    const [auth, setAuth] = useRecoilState(authState)

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

    const saveEditing = ({nombre, email, nombre_artistico}) => {
        
        setAuth({
            ...auth, user : {
                ...auth.user, nombre, email, nombre_artistico
            }
        })

        setIsEditing(false)

        console.log(profileData)
    }

    const modificarDatos = (newData) => {
        setProfileData(newData)
    }

    return { startEditing, saveEditing, profileData, isEditing, modificarDatos }

}

export default useProfile