import React, {Suspense} from 'react'
import { ToastContainer } from 'react-toastify'
import HomeHeader from "@/components/partials/homeheader";
import useWidth from '@/hooks/useWidth';
import useMenulayout from "@/hooks/useMenulayout";
import useMenuHidden from '@/hooks/useMenuHidden';
import useSidebar from '@/hooks/useSidebar';
import Home from '@/pages/home';
import { Navigate, Outlet } from 'react-router-dom';
import Loading from "@/components/Loading";
import Reproductor from "@/components/partials/reproductor";
import ReproductorMobile from "@/components/partials/reproductormobile"
import MenuLateral from '@/pages/perfil/MenuLateral';
import useAuth from '@/hooks/useAuth';
import LicensesModal from '@/pages/feed/components/LicensesModal';
import Footer from '@/components/partials/footer';



function PerfilLayout() {


    const { width, breakpoints } = useWidth();
    const [collapsed] = useSidebar();
    const [menuType] = useMenulayout();
    const [menuHidden] = useMenuHidden();

    const [modalBeat, setModalBeat] = React.useState(false);
    const [activeBeat, setActiveBeat] = React.useState({});


    const { isAuthenticated } = useAuth();

    const switchHeaderClass = () => {
        if (menuType === "horizontal" || menuHidden) {
          return "ltr:ml-0 rtl:mr-0";
        } else if (collapsed) {
          return "ltr:ml-[72px] rtl:mr-[72px]";
        } else {
          return "ltr:ml-[248px] rtl:mr-[248px]";
        }
      };

    if(isAuthenticated() === false)
    {
        return <Navigate to="/feed" />
    }
    else{
      return (
          <>
              <Suspense fallback={<Loading />}>
                <ToastContainer />
                <HomeHeader className={width > breakpoints.xl ? switchHeaderClass() : ""} />
                <div className={`${width > breakpoints.xl ? "flex justify-center items-start gap-4" : ""} bg-zinc-700`}>
                  <MenuLateral/>
                  <div className='w-full'><Outlet context={{setActiveBeat, setModalBeat}}/></div>
                  <LicensesModal beat={activeBeat} activeModal={modalBeat} setActiveModal={setModalBeat}/> 
                
                </div>
                <Reproductor setActiveBeat={setActiveBeat} setModalBeat={setModalBeat}/>
                <Footer />
              </Suspense>
          </>
      )
    }
}

export default PerfilLayout