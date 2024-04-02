import Axios from "@/components/AxiosSubmit"
import { useEffect, useState } from "react"
import { toast } from "react-toastify"



function useBeats() {
    const [activeBeats, setActiveBeats] = useState()
    const [beats, setBeats] = useState()
    const [uploadedProgress, setUploadedProgress] = useState(0)
    const [updatedProgress, setUpdatedProgress] = useState(0)
    const [loading, setLoading] = useState(false)

    const loadActiveBeatsFromAPI = async () => {
        Axios.get(`/beat/`).then((res) => {
            const formattedData = res.data.map((beat) => {
                return {
                    id: beat.id,
                    name: beat.name,
                    cover_path: beat.cover_path,
                    stock: beat.stock,
                    still_exclusive : beat.still_exclusive,
                    created_at : beat.created_at,
                    updated_at : beat.updated_at
                }
            })
            setActiveBeats(formattedData)
        }).catch((err) => {
            console.log(err)
        })
    }

    const getOneBeat = async (id, mode, authHeader) => {
        return await Axios.get(`/beat/${id}?_mode=${mode}`, mode == "full" && {headers: {Authorization: authHeader}}).then((res) => {
            return res.data
        }).catch((err) => {
            console.log(err)
        })
    }

    const loadAllBeatsFromAPI = async (authHeader) => {
        Axios.get(`/beat/all`, {headers: {Authorization: authHeader}}).then((res) => {
            setBeats(res.data)
        }).catch((err) => {
            console.log(err)
        })
    }

    const createBeat = async (data, authHeader) => {
        setLoading(true)
        await Axios.post(`/beat/`, data, {
            headers: {
                'Content-Type': 'multipart/form-data',
                Authorization: authHeader
            },
            onUploadProgress: ({loaded, total}) => {
                setUploadedProgress(Math.round((loaded / total) * 100))
            }
        }).then((res) => {
            loadBeatsFromAPI()
        }).catch((err) => {
            console.log(err)
        }).finally(() => {
            setLoading(false)
        })
    }

    const updateBeat = async (id, data, authHeader) => {
        setLoading(true)
        await Axios.post(`/beat/${id}?_method=PATCH`, data, {
            headers: {
                'Content-Type': 'multipart/form-data',
                Authorization: authHeader
            },
            onUploadProgress: ({loaded, total}) => {
                setUpdatedProgress(Math.round((loaded / total) * 100))
            }
        }).then((res) => {
            loadAllBeatsFromAPI(authHeader)
            toast.success(res.data.message)
        }).catch((err) => {
            console.log(err)
        }).finally(() => {
            setLoading(false)
        })
    }

    const deleteBeat = (id, authHeader) => {
        Axios.delete(`/beat/${id}`, {
            headers: {
                Authorization: authHeader
            }
        }).then((res) => {
            loadAllBeatsFromAPI(authHeader)
            toast.success(res.data.message)
        }).catch((err) => {
            console.log(err)
        })
    }

    return {beats, activeBeats, loadActiveBeatsFromAPI, getOneBeat, loadAllBeatsFromAPI, createBeat, updateBeat, deleteBeat, uploadedProgress, updatedProgress, loading}

}

export default useBeats