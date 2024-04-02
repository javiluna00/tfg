import { useRecoilState } from "recoil"

import { reproductorState } from "@/store/reproductorStore"
import { useEffect, useState } from "react";
import Axios from "@/components/AxiosSubmit";

const useReproductor = ( ) => {

    const [data, setData] = useRecoilState(reproductorState);

    const [shown, setShown] = useState(false);

    const [favved, setFavved] = useState(false);

    const [porcentajePlayed, setPorcentagePlayed] = useState(0);

    useEffect(() => {
        
        if(data.song != null && data.currentDuration != null && data.totalDuration != null)
        {
            setPorcentagePlayed(data.currentDuration/data.totalDuration*100)
        }
    }, [data.currentDuration, data.totalDuration])

    
    const setReproductorData = (song) => {

        console.log("Song es : ", song)

        
            
    }
    const setLooping = (value) => {
        setData({...data, looping : value})
    }
    const toogleMute = () => {
        setData({...data, isMuted : !data.isMuted})
    }

    const setVolume = (value) => {
        setData({...data, volume : value})
    }

    const tooglePlay = () => {
        setData({...data, isPlaying : !data.isPlaying})
    }

    const closeReproductor = () => {
        
        setData({...data, song : null, isPlaying : false, currentDuration : 0, totalDuration : 0, looping : false, volume : 100, isMuted : false})
        setShown(false)

    }

    const reproducirCancion = (song) => {
        if(song != null)
        {
            
            Axios.get(`/beat/${song.id}/tagged`, { responseType: 'blob'}).then((res) => {
                const audioBlob = new Blob([res.data], {type: 'audio/mpeg'});
                setData({song : song, song_file: URL.createObjectURL(audioBlob), isPlaying : true, currentDuration : 0, totalDuration : res.data.length, isPlaying:false, looping : false, volume : 100, isMuted : false} )
                setShown(true)
            }).catch((err) => {
                console.log(err)
            })
            
        }
        else
        {
            console.log("Por qué entra aquí si song no es null?")
            setData({song : null, isPlaying : false, currentDuration : 0, totalDuration : 0, looping : false, volume : 100, isMuted : false})
            setPorcentagePlayed(0)
            setShown(false)
        }
    }

    const toogleFav = () => {
        if(data.song != null)
        {
            setFavved(!favved)
        }
    }

    return {reproductorData : data, setData, setReproductorData, porcentajePlayed, setLooping, toogleMute, tooglePlay, setVolume, shown, closeReproductor, reproducirCancion, toogleFav, favved}

}

export default useReproductor