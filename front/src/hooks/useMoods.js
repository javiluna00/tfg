import Axios from "@/components/AxiosSubmit"
import { useEffect, useState } from "react"
import { toast } from "react-toastify"


function useMoods()
{

    const [moods, setMoods] = useState([])


    const loadMoodsFromAPI = async () => {
        Axios.get(`/moods/`).then((res) => {
            setMoods(res.data)
        })
    }

    const addMood = async (mood, authHeader) => {
        await Axios.post(`/moods/`, mood, {headers: {Authorization: authHeader}}).then((res) => {
            setMoods([...moods, res.data.mood])
            toast.success(res.data.message)
        }).catch((err) => {
            toast.error(err.response.data.message)
        })
    }

    const deleteMood = async (id, authHeader) => {
        await Axios.delete(`/moods/${id}`, {headers: {Authorization: authHeader}}).then((res) => {
            setMoods(moods.filter((mood) => mood.id !== id))
            toast.success(res.data.message)
        }).catch((err) => {
            toast.error(err.response.data.message)
        })
    }

    const updateMood = async (mood, authHeader) => {
        await Axios.patch(`/moods/${mood.id}`, mood, {headers: {Authorization: authHeader}}).then((res) => {
            setMoods(moods.map((mood) => mood.id === res.data.mood.id ? res.data.mood : mood))
            toast.success(res.data.message)
        }).catch((err) => {
            toast.error(err.response.data.message)
        })
    }

    return {moods, loadMoodsFromAPI, addMood, deleteMood, updateMood}

}


export default useMoods