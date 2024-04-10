import SkeletionTable from '@/components/skeleton/Table';
import useAuthBien from '@/hooks/useAuthBien';
import React, { useEffect } from 'react'
import { Link, useSearchParams } from 'react-router-dom'

function index() {

    const [searchParams, setSearchParams] = useSearchParams();
    const { verifyAccount, isLoading } = useAuthBien()

    useEffect(() => {
        if(searchParams.get('token'))
            verifyAccount(searchParams.get('token'))
    }, [searchParams])
    if(isLoading) {
        return (
            <div>
                <SkeletionTable />
            </div>
        )
    }
    else
    {
        return (
            <div className='flex flex-col items-center justify-center min-h-screen px-4 py-12 sm:px-6 lg:px-8 bg-zinc-100 gap-4'>
                <h1 className='text-3xl'>¡Cuena activada!</h1>
                <p className='text-lg'>Tu cuenta ha sido activada satisfactoriamente, ahora puedes <Link to="/login" className='text-red-500 cursor-pointer'>iniciar sesion</Link></p>
            </div>   
        )
    }
}

export default index