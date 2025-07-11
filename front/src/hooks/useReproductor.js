import { useRecoilState } from 'recoil'
import { reproductorState } from '@/store/reproductorStore'
import { useEffect, useState } from 'react'
import useProfile from './useProfile'
import { authAtom } from '@/store/authStoreBien'
import CustomAxios from '@/components/api/axios'

const useReproductor = () => {
  const { AxiosPrivate } = CustomAxios()
  const [data, setData] = useRecoilState(reproductorState)
  const [shown, setShown] = useState(false)
  const [favved, setFavved] = useState()
  const [porcentajePlayed, setPorcentagePlayed] = useState(0)
  const { setSaves } = useProfile({ AxiosPrivate })
  const [auth] = useRecoilState(authAtom)

  useEffect(() => {
    if (data.song != null && data.currentDuration != null && data.totalDuration != null) {
      setPorcentagePlayed(data.currentDuration / data.totalDuration * 100)
    }
  }, [data.currentDuration, data.totalDuration])

  useEffect(() => {
    if (data?.song != null && auth?.user != null) {
      if (auth.user.saves.filter((beat) => beat.id === data.song.id).length > 0) {
        setFavved(true)
      } else {
        setFavved(false)
      }
    }
  }, [data.song])

  const setReproductorData = (song) => {
    console.log('Song es : ', song)
  }
  const setLooping = (value) => {
    setData({ ...data, looping: value })
  }
  const toogleMute = () => {
    setData({ ...data, isMuted: !data.isMuted })
  }

  const setVolume = (value) => {
    setData({ ...data, volume: value })
  }

  const tooglePlay = () => {
    setData({ ...data, isPlaying: !data.isPlaying })
  }

  const closeReproductor = () => {
    setData({ ...data, song: null, isPlaying: false, currentDuration: 0, totalDuration: 0, looping: false, volume: 100, isMuted: false })
    setShown(false)
  }

  const reproducirCancion = (song) => {
    console.log('Ha entrado en reproducirCancion')
    if (song != null) {
      // Primero actualizamos el estado para indicar que estamos cargando
      setData({ 
        ...data, 
        song, 
        isPlaying: false, // Inicialmente false mientras carga
        currentDuration: 0,
        totalDuration: 0,
        looping: false,
        volume: 100,
        isMuted: false
      })
      
      AxiosPrivate.get(`/beat/${song.id}/tagged`, { responseType: 'blob' })
        .then((res) => {
          const audioBlob = new Blob([res.data], { type: 'audio/mpeg' })
          const audioUrl = URL.createObjectURL(audioBlob)
          
          // Actualizamos el estado con la URL del audio y activamos la reproducción
          setData(prevData => ({ 
            ...prevData,
            song_file: audioUrl,
            isPlaying: true
          }))
          
          setShown(true)
      
          // Registramos la reproducción
          AxiosPrivate.post('/beatAction/play', { beat_id: song.id })
            .catch((err) => {
              console.log('Error al registrar reproducción:', err)
            })
        })
        .catch((err) => {
          console.log('Error al cargar el audio:', err)
          // En caso de error, limpiamos el estado
          setData({ 
            song: null, 
            isPlaying: false, 
            currentDuration: 0, 
            totalDuration: 0, 
            looping: false, 
            volume: 100, 
            isMuted: false 
          })
        })
    } else {
      setData({ song: null, isPlaying: false, currentDuration: 0, totalDuration: 0, looping: false, volume: 100, isMuted: false })
      setPorcentagePlayed(0)
      setShown(false)
    }
  }

  const toogleFav = () => {
    if (data.song != null) {
      setFavved(!favved)
      AxiosPrivate.post('/beatAction/save', { beat_id: data.song.id }).then((res) => {
        setSaves(res.data.saves)
      })
    }
  }

  return { reproductorData: data, setData, setReproductorData, porcentajePlayed, setLooping, toogleMute, tooglePlay, setVolume, shown, closeReproductor, reproducirCancion, toogleFav, favved }
}

export default useReproductor
