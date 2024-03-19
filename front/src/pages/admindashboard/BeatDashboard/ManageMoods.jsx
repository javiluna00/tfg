import Breadcrumbs from '@/components/ui/Breadcrumbs'
import Button from '@/components/ui/Button'
import useMoods from '@/hooks/useMoods'
import { Icon } from '@iconify/react'
import React, { useEffect, useState } from 'react'
import MoodItem from './components/MoodItem'
import Modal from '@/components/ui/Modal'
import useAuthHeader from 'react-auth-kit/hooks/useAuthHeader'

function ManageMoods() {

    const {moods, loadMoodsFromAPI, addMood} = useMoods()

    const [name, setName] = useState('')
    const authHeader = useAuthHeader()

    useEffect(() => {
        loadMoodsFromAPI()
    }, [])

    const handleAddMoodButton = (e) => {
        e.preventDefault()
        addMood({name}, authHeader)
        setName('')
    }

    return (
        <div className='bg-zinc-50 py-10 w-full h-full min-h-screen'>
            <div className='container'>
                <Breadcrumbs/>
                <div className='w-full p-5 rounded bg-white'>
                    <div className='flex justify-between items-center'>
                        <h3 className='text-2xl text-zinc-900 font-medium'>Gestionar moods</h3>
                        <Modal title="Añadir nuevo mood" icon={"heroicons-outline:plus"} label={"Nuevo"} centered uncontrol labelClass={"btn btn-primary"}>
                            <form onSubmit={handleAddMoodButton}>
                                <input type='text' className='w-full p-2 border border-zinc-300 rounded' placeholder='Nombre del mood' value={name} onChange={(e) => setName(e.target.value)}/>
                                <input type='submit' className='btn btn-primary w-full mt-3' value="Añadir" />
                            </form>
                        </Modal>
                    </div>

                    {!moods ? <SkeletionTable/> : 
                    
                    <div className='w-full mt-5 grid lg:grid-cols-6 sm:grid-cols-3 gap-5'>
                        {moods.map((mood) => (
                            <MoodItem key={mood.id} mood={mood}/>
                        ))}
                    </div>

                    }
                </div>
            </div>
        </div>
    )
}

export default ManageMoods