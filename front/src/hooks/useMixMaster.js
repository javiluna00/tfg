import { useState } from 'react'
import image_mix from '@/assets/images/mixmaster/mix.png'
import image_mixmaster from '@/assets/images/mixmaster/mixmaster.png'
import image_ep from '@/assets/images/mixmaster/ep.png'
import image_misbeats from '@/assets/images/mixmaster/mixmisbeats.png'
import { toast } from 'react-toastify'


const useMixMaster = ({AxiosPrivate}) => {
  const [tarifas, setTarifas] = useState([])
  const [mixMasterProjects, setMixMasterProjects] = useState([])
  const [mixMasterProjectsLoading, setMixMasterProjectsLoading] = useState(false)

  const createMixMasterProject = async (data) => {
    setMixMasterProjectsLoading(true)
    await AxiosPrivate.post('/mixmaster/', data, 
      {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      }
    ).then((res) => {
      toast.success(res.data.message)
    }).catch((err) => {
      toast.error(err.response.data.message)
    }).finally(() => {
      setMixMasterProjectsLoading(false)
    })
  }

  const getAllMixMasterProjects = async () => {
    setMixMasterProjectsLoading(true)
    await AxiosPrivate.get('/mixmaster/').then((res) => {
      setMixMasterProjects(res.data)
    }).catch((err) => {
      toast.error(err.response.data.message)
    }).finally(() => {
      setMixMasterProjectsLoading(false)
    })
  }

  const destroyMixMasterProject = async (id) => {
    setMixMasterProjectsLoading(true)
    await AxiosPrivate.delete(`/mixmaster/${id}`).then((res) => {
      getAllMixMasterProjects()
      toast.success(res.data.message)
    }).catch((err) => {
      toast.error(err.response.data.message)
    })
  }

  const getOneMixMasterProject = async (id) => {
    setMixMasterProjectsLoading(true)
    return await AxiosPrivate.get(`/mixmaster/${id}`).then((res) => {
      return res.data
    }).finally(() => {
      setMixMasterProjectsLoading(false)
    })
  }

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
    loadTarifas,
    createMixMasterProject,
    getAllMixMasterProjects,
    destroyMixMasterProject,
    getOneMixMasterProject,
    mixMasterProjects, 
    mixMasterProjectsLoading
  }
}

export default useMixMaster
