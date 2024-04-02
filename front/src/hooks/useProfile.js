import React, { useEffect, useState } from 'react'
import useAuth from './useAuth'
import { profileState } from '@/store/profileStore';
import { useRecoilState } from 'recoil';

function useProfile() {

    const [profileData, setProfileData] = useRecoilState(profileState)

    const loadProfileData = (newProfileData) => {

        setProfileData(newProfileData)
    }


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

    const cancelEditing = () => {
        setIsEditing(false)
        
    }

    const modificarDatos = (newData) => {
        setProfileData(newData)
    }

    return {loadProfileData, startEditing, saveEditing, profileData, modificarDatos, cancelEditing}

}

export default useProfile