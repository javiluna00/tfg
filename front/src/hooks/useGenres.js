import { useEffect, useState } from "react"
import { toast } from "react-toastify"

function useGenres({AxiosPrivate}){

    const [genres, setGenres] = useState([])


    const loadGenresFromAPI = async () => {
        AxiosPrivate.get(`/genres/`).then((res) => {
            setGenres(res.data)
        })
    }

    const addGenre = async (genre) => {
        await AxiosPrivate.post(`/genres/`, genre).then((res) => {
            setGenres([...genres, res.data.genre])
            toast.success(res.data.message)
        }).catch((err) => {
            console.log(err)
        })
    }

    const deleteGenre = async (id) => {
        await AxiosPrivate.delete(`/genres/${id}`).then((res) => {
            setGenres(genres.filter((genre) => genre.id !== id))
            toast.success(res.data.message)
        }).catch((err) => {
            console.log(err)
        })
    }

    const updateGenre = async (genre) => {
        await AxiosPrivate.patch(`/genres/${genre.id}`, genre).then((res) => {
            setGenres(genres.map((genre) => genre.id === res.data.genre.id ? res.data.genre : genre))
            toast.success(res.data.message)
        }).catch((err) => {
            console.log(err)
        })
    }

    return {genres, loadGenresFromAPI, addGenre, deleteGenre, updateGenre}

}

export default useGenres