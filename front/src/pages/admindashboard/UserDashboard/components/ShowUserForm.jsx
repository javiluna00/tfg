import SkeletionTable from '@/components/skeleton/Table'
import Button from '@/components/ui/Button'
import useUsers from '@/pages/admindashboard/UserDashboard/hooks/useUsers'
import React, { useEffect, useState } from 'react'
import useAuthHeader from 'react-auth-kit/hooks/useAuthHeader'
import { useForm } from 'react-hook-form'
import { useParams } from 'react-router-dom'
import CustomSelector from '../../BeatDashboard/components/CustomSelector'


function ShowUserForm({editable = false}) {

    const {id} = useParams()

    const {users, getAllUsers, getOneUser, loading, setLoading, getAllRoles, updateUser} = useUsers()
    const authHeader = useAuthHeader()
    const [user, setUser] = useState({})
    const [allRoles, setAllRoles] = useState([])
    const { register, handleSubmit, reset, formState: { errors } } = useForm();
    const [selectedRoles, setSelectedRoles] = useState([])
    useEffect(() => {
        setLoading(true)
        getOneUser(id, authHeader).then((res) => {
            setUser(res)
            setSelectedRoles(res.roles.map(role => role.name))
            reset(res)
            setLoading(false)
        }).catch((err) => {
            console.log(err)
        })

        getAllRoles(authHeader).then((res) => {
            setAllRoles(res)
        })
    }, [])

    const onSubmit = (data) => {
        updateUser(user.id, {roles: selectedRoles}, authHeader)
    }

    const handleClickRole = (e) => {
        console.log(e.target.value)
    }

    if(loading)
    {
        return <div><SkeletionTable/></div>
    }
    return (
    <div className='w-full'>
        <div className="w-[70%] mx-auto flex flex-col justify-center items-center">
            {loading ? <SkeletionTable/> : 
                <div className='w-full flex flex-col justify-center items-center gap-5'>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <h2 className='text-3xl text-zinc-900 font-bold mb-5'>{editable ? "Editar" : "Ver"} usuario</h2>
                        <div className='w-full flex justify-center items-center gap-5'>
                        
                            <div className='w-full flex flex-col justify-start items-start gap-5 mt-5'>
                                <span className='class-label block text-sm font-medium mb-2.5 pt-1'>Nombre</span>
                                <input type="text" className='w-full bg-zinc-100 px-5 py-3 rounded border border-zinc-300 focus:border-primary-500 focus:outline-none cursor-not-allowed' disabled={true} label="Nombre" placeholder="Nombre del usuario" name="name" defaultValue={user.name} />
                                <span className='class-label block text-sm font-medium mb-2.5 pt-1'>Nombre artístico</span>
                                <input type="text" className='w-full bg-zinc-100 px-5 py-3 rounded border border-zinc-300 focus:border-primary-500 focus:outline-none cursor-not-allowed' disabled={true} label="Nombre artístico" placeholder="Nombre artístico" name="artistic_name" defaultValue={user.artist_name ? user.artist_name : ""}  />
                                <span className='class-label block text-sm font-medium mb-2.5 pt-1'>E-mail</span>
                                <input type="text" className='w-full bg-zinc-100 px-5 py-3 rounded border border-zinc-300 focus:border-primary-500 focus:outline-none cursor-not-allowed' disabled={true} label="Email" placeholder="Email" name="email" defaultValue={user.email} />
                                <div className='flex justify-center items-center gap-5'>
                                    {/* {allRoles.map((role, index) => {
                                        return <span key={index} value={role.id} className={`${user.roles.map(r => r.name).includes(role.name) ? "bg-zinc-800 text-white" : "bg-zinc-100"} px-3 rounded border border-zinc-300 ${!editable ? "cursor-not-allowed" : "cursor-pointer"}`} onClick={(e) => handleClickRole(e)}>{role.name}</span>
                                    })} */}
                                    {selectedRoles && <CustomSelector disabled={!editable} name={"roles"} values={allRoles} selected={selectedRoles} setSelected={setSelectedRoles}/>}
                                    
                                </div>

                            </div>
                        </div>

                        {editable && <Button type='submit' text="Guardar" className="btn-primary w-full mt-5" />}
                    </form>

                </div>
            }
        </div>
    </div>
    )
}

export default ShowUserForm