import { useState } from 'react'
import image_mix from '@/assets/images/mixmaster/mix.png'
import image_mixmaster from '@/assets/images/mixmaster/mixmaster.png'
import image_ep from '@/assets/images/mixmaster/ep.png'
import image_misbeats from '@/assets/images/mixmaster/mixmisbeats.png'

const useMixMaster = () => {
  const [tarifas, setTarifas] = useState([])

  const loadTarifas = async () => {
    const tarifasData = [
      {
        id: 1,
        nombre: 'Mix',
        precio: '30€',
        description: 'Mixing de una canción.',
        new: false,
        image: image_mix
      },
      {
        id: 2,
        nombre: 'Mix & Master',
        precio: '50€',
        description: 'Mixing y master de una canción.',
        new: false,
        image: image_mixmaster
      },
      {
        id: 3,
        nombre: 'Mis beats',
        description: 'Mixing y master sobre mis beats.',
        precio: '40€',
        new: true,
        image: image_misbeats,
        ribon: 'Recomendado',
        destacado: true
      },
      {
        id: 4,
        nombre: 'EP/LP',
        description: 'Mixing y master de un EP/LP.',
        precio: 'Desde 100€',
        new: true,
        image: image_ep
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
