import React, { useEffect, useRef } from 'react'
import useReproductor from '@/hooks/useReproductor'
import '@/components/partials/reproductor/index.css'
import 'react-h5-audio-player/lib/styles.css'
import useWidth from '@/hooks/useWidth'
import WideHUD from './wideHUD'
import MobileHUD from './mobileHUD'
import useProfile from '@/hooks/useProfile'

function Reproductor ({ setActiveBeat, setModalBeat, AxiosPrivate }) {
  const { reproductorData, setData, porcentajePlayed, setLooping, toogleMute, tooglePlay, setVolume, closeReproductor, toogleFav, favved } = useReproductor({ AxiosPrivate })

  const { saveBeat } = useProfile({ AxiosPrivate })
  const { width, breakpoints } = useWidth()
  const audioRef = useRef()
  const progressBarRef = useRef()

  useEffect(() => {
    if (reproductorData.song) {
      if (reproductorData.isPlaying === true) {
        console.log('Reproduciendo')
        audioRef.current.play()
      } else {
        audioRef.current.pause()
      }
    }
  }, [reproductorData.isPlaying])

  useEffect(() => {
    if (audioRef.current) { audioRef.current.volume = reproductorData.volume / 100 }
  }, [reproductorData.volume])

  useEffect(() => {
    if (reproductorData.song) {
      if (reproductorData.isMuted === true) {
        audioRef.current.muted = true
      } else {
        audioRef.current.muted = false
      }
    }
  }, [reproductorData.isMuted])

  const hdlClickComprar = () => {
    setModalBeat(true)
    setActiveBeat(reproductorData.song)
  }

  const handleLoopButton = (e) => {
    setLooping(!reproductorData.looping)
  }

  const handleFavButton = async (e) => {
    await toogleFav(reproductorData.song.id)
    await saveBeat(reproductorData.song.id)
  }
  const handleMuteButton = (e) => {
    toogleMute()
  }
  const handleTooglePlayButton = () => {
    tooglePlay()
  }

  const handleMoveProgressBar = (e) => {
    const rect = progressBarRef.current.getBoundingClientRect()
    const x = e.clientX - rect.left
    audioRef.current.currentTime = x / progressBarRef.current.offsetWidth * reproductorData.totalDuration
  }

  if (reproductorData.song) {
    return (
      <div className='audio-player'>
        <audio
          src={reproductorData.song_file}
          controls={false}
          ref={audioRef}
          onTimeUpdate={(e) => setData({ ...reproductorData, currentDuration: e.target.currentTime })}
          onLoadedMetadata={(e) => setData({ ...reproductorData, totalDuration: e.target.duration, isPlaying: true })}
          loop={reproductorData.looping}
        />

        {width > breakpoints.md
          ? <WideHUD
              reproductorData={reproductorData}
              hdlClickComprar={hdlClickComprar}
              handleFavButton={handleFavButton}
              handleMuteButton={handleMuteButton}
              handleTooglePlayButton={handleTooglePlayButton}
              handleLoopButton={handleLoopButton}
              handleMoveProgressBar={handleMoveProgressBar}
              audioRef={audioRef}
              progressBarRef={progressBarRef}
              favved={favved}
              porcentajePlayed={porcentajePlayed}
              closeReproductor={closeReproductor}
              setVolume={setVolume}

            />
          : <MobileHUD
              reproductorData={reproductorData}
              hdlClickComprar={hdlClickComprar}
              handleFavButton={handleFavButton}
              handleMuteButton={handleMuteButton}
              handleTooglePlayButton={handleTooglePlayButton}
              handleLoopButton={handleLoopButton}
              handleMoveProgressBar={handleMoveProgressBar}
              audioRef={audioRef}
              progressBarRef={progressBarRef}
              favved={favved}
              porcentajePlayed={porcentajePlayed}
              closeReproductor={closeReproductor}

            />}

      </div>

    )
  } else {
    return (<></>)
  }
}

export default Reproductor
