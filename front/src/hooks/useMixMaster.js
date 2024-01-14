import { useState } from "react"

const useMixMaster = () => {
    
    const [tarifas, setTarifas] = useState([])

    const loadTarifas = async () => {

        const tarifasData = [
            {
                id: 1,
                nombre: 'Mix',
                precio: 30,
                description : "Mixing de una canción.",
                new: false,
            },
            {
                id: 2,
                nombre: 'Mix & Master',
                precio: 50,
                description : "Mixing y master de una canción.",
                new: false,
            },
            {
                id: 3,
                nombre: 'Mis beats',
                description : "Mixing y master sobre alguno de mis beats.",
                precio: 30,
                new: true,
            },
            {
                id: 4,
                nombre: 'EP/LP',
                description : "Mixing y master de un EP/LP.",
                precio: "Desde 50€",
                new: true,
            }
        ]

        setTarifas(tarifasData)

    }


    return {
        tarifas,
        setTarifas,
        loadTarifas
    }

}

export default useMixMaster