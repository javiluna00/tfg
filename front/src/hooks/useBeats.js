import CustomAxios from '@/components/api/axios'
import { initialFilterValues } from '@/constant/initialValues'
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

function useBeats () {
  const { AxiosPrivate } = CustomAxios()
  const [activeBeats, setActiveBeats] = useState()
  const [beats, setBeats] = useState()
  const [uploadedProgress, setUploadedProgress] = useState(0)
  const [updatedProgress, setUpdatedProgress] = useState(0)
  const [isLoading, setIsLoading] = useState(false)

  const [filteredBeats, setFilteredBeats] = useState([])
  const [filter, setFilter] = useState(initialFilterValues)

  useEffect(() => {
    if (activeBeats) updateFilteredBeats()
  }, [filter, activeBeats])

  useEffect(() => {
    console.log('Filtered : ', filteredBeats)
  }, [filteredBeats])

  const updateFilteredBeats = () => {
    const filtered = activeBeats.filter(beat => {
      console.log('Beat filtrando : ', beat)
      const { bpm, price, name, genres, moods } = filter
      return (
        beat.bpm >= bpm.bpm_from && beat.bpm <= bpm.bpm_to &&
        beat?.licenses[0]?.pivot.price >= price.price_from && beat?.licenses[0]?.pivot.price <= price.price_to
        // beat.name.includes(name) &&
        // genres.every(genre => beat.genres.includes(genre)) &&
        // moods.every(mood => beat.moods.includes(mood))
      )
    })

    setFilteredBeats(filtered)
  }

  const navigate = useNavigate()

  const loadActiveBeatsFromAPI = async () => {
    setIsLoading(true)
    AxiosPrivate.get('/beat/').then((res) => {
      setActiveBeats(res.data)
    }).catch((err) => {
      console.log(err)
    }).finally(() => {
      setIsLoading(false)
    })
  }

  const getOneBeat = async (id, mode) => { // <----------- Modes : 'full' or 'client'
    setIsLoading(true)
    return await AxiosPrivate.get(`/beat/${id}?_mode=${mode}`).then((res) => {
      return res.data
    }).catch((err) => {
      console.log(err)
    }).finally(() => {
      setIsLoading(false)
    })
  }

  const getRandomBeats = async ({ currentBeatId }) => {
    setIsLoading(true)
    return AxiosPrivate.get(`/beat/random/${currentBeatId}`).then((res) => {
      return res.data
    }).catch((err) => {
      console.log(err)
    }).finally(() => {
      setIsLoading(false)
    })
  }

  const loadAllBeatsFromAPI = async () => {
    setIsLoading(true)
    AxiosPrivate.get('/beat/all').then((res) => {
      setBeats(res.data)
    }).catch((err) => {
      console.log(err)
    }).finally(() => {
      setIsLoading(false)
    })
  }

  const createBeat = async (data) => {
    setIsLoading(true)
    await AxiosPrivate.post('/beat/', data, {
      headers: {
        'Content-Type': 'multipart/form-data'
      },
      onUploadProgress: ({ loaded, total }) => {
        setUploadedProgress(Math.round((loaded / total) * 100))
      }
    }).then((res) => {
      toast.success(res.data.message)
      navigate('/dashboard/beats')
    }).catch((err) => {
      const errors = err.response.data
      for (const error in errors) {
        for (const message of errors[error]) {
          toast.error(message)
        }
      }
    }).finally(() => {
      setIsLoading(false)
    })
  }

  const updateBeat = async (id, data) => {
    setIsLoading(true)
    await AxiosPrivate.post(`/beat/${id}?_method=PATCH`, data, {
      headers: {
        'Content-Type': 'multipart/form-data'
      },
      onUploadProgress: ({ loaded, total }) => {
        setUpdatedProgress(Math.round((loaded / total) * 100))
      }
    }).then((res) => {
      loadAllBeatsFromAPI()
      toast.success(res.data.message)
    }).catch((err) => {
      console.log(err)
    }).finally(() => {
      setIsLoading(false)
    })
  }

  const deleteBeat = (id) => {
    AxiosPrivate.delete(`/beat/${id}`, {

    }).then((res) => {
      loadAllBeatsFromAPI()
      toast.success(res.data.message)
    }).catch((err) => {
      console.log(err)
    })
  }

  return {
    beats,
    activeBeats,
    loadActiveBeatsFromAPI,
    getOneBeat,
    loadAllBeatsFromAPI,
    createBeat,
    updateBeat,
    deleteBeat,
    uploadedProgress,
    updatedProgress,
    isLoading,
    getRandomBeats,
    filteredBeats,
    setFilteredBeats,
    filter,
    setFilter
  }
}

export default useBeats
