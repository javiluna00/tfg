
import { initialFilterValues } from "@/constant/initialValues"
import { reproductorState } from "@/store/reproductorStore"
import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { beatState } from "@/store/beatStore";
import Axios from "@/components/AxiosSubmit";
const useBeatFinder = ( ) => {

    const [beatData, setBeatData] = useRecoilState(beatState);
    const [genres, setGenres] = useState([]);
    const [moods, setMoods] = useState([]);


    useEffect(() => {

        foundBeats();

        console.log("Filter : ", beatData.filter)

    }, [beatData.filter])




    const loadGenresFromAPI = async () => {
        Axios.get(`/genres/`).then((res) => {
            setGenres(res.data.map((genre) => {
                return {
                    name: genre.name,
                    active: false,
                    label : genre.name
                }
            }))
        }) 
    }

    const loadMoodsFromAPI = async () => {
        Axios.get(`/moods/`).then((res) => {
            setMoods(res.data.map((mood) => {
                return {
                    name: mood.name,
                    active: false,
                    label : mood.name
                }
            }))
        })
    }



    const loadBeatsFromAPI = async () => {
        
        await Axios.get(`/beat/`).then((res) => {
            setBeatData({...beatData, allBeats: res.data.data, filteredBeats: res.data.data, beatsPopulares: res.data.data, filter: initialFilterValues});
        }).catch((err) => {
            console.log(err)
        })

    }

    const foundBeats = () => {
        
        const foundBeatsResult = beatData.allBeats.filter((beat) => {
            for (const key in beatData.filter) {
                if(key === "name")
                {
                    if(!beat.name.toLowerCase().includes(beatData.filter.name.toLowerCase())) {
                        return false;
                    }
                }
                if(key === "bpm")
                {

                    if(beat.bpm < beatData.filter.bpm.bpm_from || beat.bpm > beatData.filter.bpm.bpm_to) {
                        return false;
                    }
                }
                if(key === "genres")
                {
                    if(!beat.genres.some((genre) => beatData.filter.genres.includes(genre.name))) {
                        return false;
                    }
                }
            }
            return true;
        });
        setBeatData({...beatData, filteredBeats: foundBeatsResult})

    }

    return {filter : beatData.filter, filteredBeats: beatData.filteredBeats, allBeats: beatData.allBeats, beatsPopulares: beatData.beatsPopulares, beatData, setBeatData, loadBeatsFromAPI, loadGenresFromAPI, loadMoodsFromAPI, genres, moods, setGenres, setMoods}

}

export default useBeatFinder