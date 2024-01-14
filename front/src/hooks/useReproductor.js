import { useRecoilState } from "recoil"

import { reproductorState } from "@/store/reproductorStore"
import { useEffect, useState } from "react";

const useReproductor = ( ) => {

    const [data, setData] = useRecoilState(reproductorState);

    const [porcentajePlayed, setPorcentagePlayed] = useState(0);

    useEffect(() => {
        if(data.currentDuration != null && data.totalDuration != null)
        {
            setPorcentagePlayed(data.currentDuration/data.totalDuration*100)
        }
    }, [data.currentDuration, data.totalDuration])

    useEffect(() => {
        console.log("porcentajePlayed : ", porcentajePlayed)
    }, [porcentajePlayed])

    const setReproductorData = (song) => {
        if(song != null)
        {
            console.log("Nueva song sonando : ", song)
            setData({song : song, isPlaying : true, currentDuration : 0, totalDuration : song.duration, looping : false, volume : 100, isMuted : false} )
        }
            
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

    return {reproductorData : data, setReproductorData, porcentajePlayed, setLooping, toogleMute, tooglePlay, setVolume}

}

export default useReproductor