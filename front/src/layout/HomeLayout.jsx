import React, { Suspense } from 'react'
import { ToastContainer } from 'react-toastify'
import HomeHeader from '@/components/partials/homeheader'
import useWidth from '@/hooks/useWidth'
import useMenulayout from '@/hooks/useMenulayout'
import useMenuHidden from '@/hooks/useMenuHidden'
import useSidebar from '@/hooks/useSidebar'
import { Outlet } from 'react-router-dom'
import Loading from '@/components/Loading'
import Reproductor from '@/components/partials/reproductor'
import LicensesModal from '@/pages/feed/components/LicensesModal'
import Footer from '@/components/partials/footer'
import useAuthBien from '@/hooks/useAuthBien'
import CustomAxios from '@/components/api/axios'

function HomeLayout () {
  const { width, breakpoints } = useWidth()
  const [collapsed] = useSidebar()
  const [menuType] = useMenulayout()
  const [menuHidden] = useMenuHidden()

  const [modalBeat, setModalBeat] = React.useState(false)
  const [activeBeat, setActiveBeat] = React.useState({})
  const { AxiosPrivate } = CustomAxios()

  const { auth, logIn, logOut, register, isAuthenticated, isLoading, isAdmin, endGoogleLogin, googleLogin, sendForgotPassword, sendNewPassword } = useAuthBien()

  const switchHeaderClass = () => {
    if (menuType === 'horizontal' || menuHidden) {
      return 'ltr:ml-0 rtl:mr-0'
    } else if (collapsed) {
      return 'ltr:ml-[72px] rtl:mr-[72px]'
    } else {
      return 'ltr:ml-[248px] rtl:mr-[248px]'
    }
  }

  if (AxiosPrivate) {
    return (
      <>
        <Suspense fallback={<Loading />}>
          <ToastContainer className='mt-[64px]' />
          <HomeHeader className={width > breakpoints.xl ? switchHeaderClass() : ''} isAuthenticated={isAuthenticated} isAdmin={isAdmin} AxiosPrivate={AxiosPrivate} auth={auth} />
          <Outlet context={{ setActiveBeat, setModalBeat, auth, logIn, logOut, register, isAuthenticated, isLoading, isAdmin, endGoogleLogin, googleLogin, AxiosPrivate, sendForgotPassword, sendNewPassword }} />
          <Reproductor setActiveBeat={setActiveBeat} setModalBeat={setModalBeat} AxiosPrivate={AxiosPrivate} />
          <LicensesModal beat={activeBeat} activeModal={modalBeat} setActiveModal={setModalBeat} isAuthenticated={isAuthenticated} AxiosPrivate={AxiosPrivate} />
          <Footer />
        </Suspense>
      </>
    )
  }
}

export default HomeLayout
