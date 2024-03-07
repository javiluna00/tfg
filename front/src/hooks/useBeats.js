import Axios from "@/components/AxiosSubmit"
import { useEffect, useState } from "react"



function useBeats() {

    const [beats, setBeats] = useState()


    useEffect(() => {
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

            setBeats(formattedData)

        }).catch((err) => {
            console.log(err)
        })
    }, [])

    return [beats]

}

export default useBeats