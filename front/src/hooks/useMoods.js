import { useEffect, useState } from "react"
import { toast } from "react-toastify"


function useMoods({AxiosPrivate})
{
    const [moods, setMoods] = useState([])
    const loadMoodsFromAPI = async () => {
        AxiosPrivate.get(`/moods/`).then((res) => {
            setMoods(res.data)
        })
    }

    const addMood = async (mood) => {
        await AxiosPrivate.post(`/moods/`, mood).then((res) => {
            setMoods([...moods, res.data.mood])
            toast.success(res.data.message)
        }).catch((err) => {
            toast.error(err.response.data.message)
        })
    }

    const deleteMood = async (id) => {
        await AxiosPrivate.delete(`/moods/${id}`).then((res) => {
            setMoods(moods.filter((mood) => mood.id !== id))
            loadMoodsFromAPI()
            toast.success(res.data.message)
        }).catch((err) => {
            toast.error(err.response.data.message)
        })
    }

    const updateMood = async (mood) => {
        await AxiosPrivate.patch(`/moods/${mood.id}`, mood).then((res) => {
            setMoods(moods.map((mood) => mood.id === res.data.mood.id ? res.data.mood : mood))
            toast.success(res.data.message)
        }).catch((err) => {
            toast.error(err.response.data.message)
        })
    }

    return {moods, loadMoodsFromAPI, addMood, deleteMood, updateMood}

}


export default useMoods