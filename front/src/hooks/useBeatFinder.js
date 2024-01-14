
import { initialFilterValues } from "@/constant/initialValues"
import { reproductorState } from "@/store/reproductorStore"
import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { beatState } from "@/store/beatStore";

const useBeatFinder = ( ) => {

    const [beatData, setBeatData] = useRecoilState(beatState);
    // Resto del código...
    // Cuando necesites modificar los beats, puedes hacerlo con setBeatData
    // Por ejemplo: setBeatData({...beatData, filteredBeats: newFilteredBeats});

    useEffect(() => {
        console.log("El BeatData es : ", beatData)
        //foundBeats();
      }, [beatData]);

    useEffect(() => {

        foundBeats();

    }, [beatData.filter])


    useEffect(() => {

        const beatsPopulares = [
            {id: 1, name: "Beats 1", image: "https://picsum.photos/200/300?random=1", bpm: 120, escala: "C", precio: 50, duration: 180, new: Math.random() < 0.5},
            {id: 2, name: "Beats 2", image: "https://picsum.photos/200/300?random=2", bpm: 130, escala: "D", precio: 60, duration: 200, new: Math.random() < 0.5},
            {id: 3, name: "Beats 3", image: "https://picsum.photos/200/300?random=3", bpm: 140, escala: "Em", precio: 70, duration: 220, new: Math.random() < 0.5},
            {id: 4, name: "Beats 4", image: "https://picsum.photos/200/300?random=4", bpm: 150, escala: "F", precio: 80, duration: 240, new: Math.random() < 0.5},
            {id: 5, name: "Beats 5", image: "https://picsum.photos/200/300?random=5", bpm: 160, escala: "G", precio: 90, duration: 260, new: Math.random() < 0.5}
        ];
        const allBeats = [
            {id: 1, name: "Beats 1", image: "https://picsum.photos/200/300?random=6", bpm: 120, escala: "C", precio: 50, duration: 180, new: Math.random() < 0.5},
            {id: 2, name: "Beats 2", image: "https://picsum.photos/200/300?random=7", bpm: 130, escala: "D", precio: 60, duration: 200, new: Math.random() < 0.5},
            {id: 3, name: "Beats 3", image: "https://picsum.photos/200/300?random=8", bpm: 140, escala: "Em", precio: 70, duration: 220, new: Math.random() < 0.5},
            {id: 4, name: "Beats 4", image: "https://picsum.photos/200/300?random=9", bpm: 150, escala: "F", precio: 80, duration: 240, new: Math.random() < 0.5},
            {id: 5, name: "Beats 5", image: "https://picsum.photos/200/300?random=10", bpm: 160, escala: "G", precio: 90, duration: 260, new: Math.random() < 0.5},
            {id: 6, name: "Beats 6", image: "https://picsum.photos/200/300?random=11", bpm: 170, escala: "Am", precio: 100, duration: 280, new: Math.random() < 0.5},
            {id: 7, name: "Beats 7", image: "https://picsum.photos/200/300?random=12", bpm: 180, escala: "Bm", precio: 110, duration: 300, new: Math.random() < 0.5},
            {id: 8, name: "Beats 8", image: "https://picsum.photos/200/300?random=13", bpm: 190, escala: "C#M", precio: 120, duration: 320, new: Math.random() < 0.5},
            {id: 9, name: "Beats 9", image: "https://picsum.photos/200/300?random=14", bpm: 200, escala: "D#M", precio: 130, duration: 340, new: Math.random() < 0.5},
            {id: 10, name: "Beats 10 asdada y el ultimo que cierre la puerta", image: "https://picsum.photos/200/300?random=15", bpm: 210, escala: "E#M", precio: 140, duration: 360, new: Math.random() < 0.5}
        ];
        setBeatData({...beatData, allBeats: allBeats, filteredBeats: allBeats, beatsPopulares: beatsPopulares, filter: initialFilterValues});
    }, [])


    
    const foundBeats = () => {
        
        const foundBeatsResult = beatData.allBeats.filter((beat) => {
            for (const key in beatData.filter) {
                if(key === "name")
                {
                    if(!beat[key].toLowerCase().includes(beatData.filter[key].toLowerCase())) {
                        return false;
                    }
                }
                if(key === "bpm")
                {

                    if(beat.bpm < beatData.filter.bpm.bpm_from || beat.bpm > beatData.filter.bpm.bpm_to) {
                        return false;
                    }
                }
                if(key === "precio")
                {
                    if(beat.precio < beatData.filter.precio.precio_from || beat.precio > beatData.filter.precio.precio_to) {
                        return false;
                    }
                }

            }
            return true;
        });
        setBeatData({...beatData, filteredBeats: foundBeatsResult})

    }

    return {filter : beatData.filter, filteredBeats: beatData.filteredBeats, allBeats: beatData.allBeats, beatsPopulares: beatData.beatsPopulares, beatData, setBeatData}

}

export default useBeatFinder