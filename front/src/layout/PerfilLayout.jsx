import React, { Suspense } from 'react'
import { ToastContainer } from 'react-toastify'
import HomeHeader from '@/components/partials/homeheader'
import useWidth from '@/hooks/useWidth'
import useMenulayout from '@/hooks/useMenulayout'
import useMenuHidden from '@/hooks/useMenuHidden'
import useSidebar from '@/hooks/useSidebar'
import { Navigate, Outlet } from 'react-router-dom'
import Loading from '@/components/Loading'
import MenuLateral from '@/pages/perfil/MenuLateral'
import LicensesModal from '@/pages/feed/components/LicensesModal'
import Footer from '@/components/partials/footer'
import useAuthBien from '@/hooks/useAuthBien'
import Reproductor from '@/components/partials/reproductor'
import Breadcrumbs from '@/components/ui/Breadcrumbs'
import CustomAxios from '@/components/api/axios'

function PerfilLayout () {
  const { width, breakpoints } = useWidth()
  const [collapsed] = useSidebar()
  const [menuType] = useMenulayout()
  const [menuHidden] = useMenuHidden()

  const [modalBeat, setModalBeat] = React.useState(false)
  const [activeBeat, setActiveBeat] = React.useState({})

  const { auth, logIn, logOut, register, isAuthenticated, isLoading, isAdmin, endGoogleLogin, googleLogin } = useAuthBien()
  const AxiosPrivate = CustomAxios()

  const switchHeaderClass = () => {
    if (menuType === 'horizontal' || menuHidden) {
      return 'ltr:ml-0 rtl:mr-0'
    } else if (collapsed) {
      return 'ltr:ml-[72px] rtl:mr-[72px]'
    } else {
      return 'ltr:ml-[248px] rtl:mr-[248px]'
    }
  }

  if (isAuthenticated() === false) {
    return <Navigate to='/' />
  } else {
    if (AxiosPrivate != null) {
      return (
        <>
          <Suspense fallback={<Loading />}>
            <ToastContainer />
            <div className='bg-zinc-700'>
              <HomeHeader className={width > breakpoints.xl ? switchHeaderClass() : ''} isAuthenticated={isAuthenticated} isAdmin={isAdmin} AxiosPrivate={AxiosPrivate} auth={auth} />
              <div className='flex flex-col container mx-auto gap-4 min-h-screen bg-zinc-700 py-6'>

                <Breadcrumbs />

                <div className={`flex ${width > breakpoints.xl ? 'flex-row justify-center items-start' : ' flex-col justify-center items-center '} w-full  gap-4 bg-zinc-700`}>
                  <MenuLateral />
                  <div className='w-full'><Outlet context={{ setActiveBeat, setModalBeat, auth, logIn, logOut, register, isAuthenticated, isLoading, isAdmin, endGoogleLogin, googleLogin, AxiosPrivate }} /></div>
                  <LicensesModal beat={activeBeat} activeModal={modalBeat} setActiveModal={setModalBeat} isAuthenticated={isAuthenticated} AxiosPrivate={AxiosPrivate} />

                </div>
              </div>
              <Reproductor setActiveBeat={setActiveBeat} setModalBeat={setModalBeat} AxiosPrivate={AxiosPrivate} />
              <Footer />
            </div>
          </Suspense>
        </>
      )
    }
  }
}

export default PerfilLayout
