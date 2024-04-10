import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { toast } from "react-toastify"



function useBeats({AxiosPrivate}) {
    const [activeBeats, setActiveBeats] = useState()
    const [beats, setBeats] = useState()
    const [uploadedProgress, setUploadedProgress] = useState(0)
    const [updatedProgress, setUpdatedProgress] = useState(0)
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()

    const loadActiveBeatsFromAPI = async () => {
        AxiosPrivate.get(`/beat/`).then((res) => {
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

    const getOneBeat = async (id, mode) => {
        return await AxiosPrivate.get(`/beat/${id}?_mode=${mode}`).then((res) => {
            return res.data
        }).catch((err) => {
            console.log(err)
        })
    }

    const loadAllBeatsFromAPI = async () => {
        AxiosPrivate.get(`/beat/all`).then((res) => {
            setBeats(res.data)
        }).catch((err) => {
            console.log(err)
        })
    }

    const createBeat = async (data) => {
        setLoading(true)
        await AxiosPrivate.post(`/beat/`, data, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
            onUploadProgress: ({loaded, total}) => {
                setUploadedProgress(Math.round((loaded / total) * 100))
            }
        }).then((res) => {
            toast.success(res.data.message)
            navigate("/dashboard/beats")
        }).catch((err) => {
            const errors = err.response.data
            for (const error in errors) {
                for (const message of errors[error]) {
                    toast.error(message)
                }
            }
        }).finally(() => {
            setLoading(false)
        })
    }

    const updateBeat = async (id, data) => {
        setLoading(true)
        await AxiosPrivate.post(`/beat/${id}?_method=PATCH`, data, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
            onUploadProgress: ({loaded, total}) => {
                setUpdatedProgress(Math.round((loaded / total) * 100))
            }
        }).then((res) => {
            loadAllBeatsFromAPI()
            toast.success(res.data.message)
        }).catch((err) => {
            console.log(err)
        }).finally(() => {
            setLoading(false)
        })
    }

    const deleteBeat = (id) => {
        AxiosPrivate.delete(`/beat/${id}`, {

        }).then((res) => {
            loadAllBeatsFromAPI()
            toast.success(res.data.message)
        }).catch((err) => {
            console.log(err)
        })
    }

    return {beats, activeBeats, loadActiveBeatsFromAPI, getOneBeat, loadAllBeatsFromAPI, createBeat, updateBeat, deleteBeat, uploadedProgress, updatedProgress, loading}

}

export default useBeats