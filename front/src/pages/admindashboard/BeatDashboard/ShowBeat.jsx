import Breadcrumbs from '@/components/ui/Breadcrumbs'
import React, { useEffect, useState } from 'react'
import ShowBeatForm from './components/ShowBeatForm'
import { useParams, useSearchParams } from 'react-router-dom'
import useBeats from '@/hooks/useBeats'
import useAuthHeader from 'react-auth-kit/hooks/useAuthHeader'
import SkeletionTable from '@/components/skeleton/Table'

function ShowBeat() {

    const {id} = useParams()
    const authHeader = useAuthHeader()
    const {getOneBeat} = useBeats()

    const [beat, setBeat] = useState(null)

    useEffect(() => {
        getOneBeat(id, "full", authHeader).then((res) => {
            setBeat(res)
        }).catch((err) => {
            console.log(err)
        })
    }, [id])

    return (
        <div className='bg-slate-50 py-10 w-full h-full min-h-screen'>
            <div className='container'>
                <Breadcrumbs/>
                {beat != null ? <ShowBeatForm beat={beat} editable={false}/> : <SkeletionTable/>}
            </div>
        </div>
    )
}

export default ShowBeat