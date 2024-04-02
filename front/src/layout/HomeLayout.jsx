import React, {Suspense} from 'react'
import { ToastContainer } from 'react-toastify'
import HomeHeader from "@/components/partials/homeheader";
import useWidth from '@/hooks/useWidth';
import useMenulayout from "@/hooks/useMenulayout";
import useMenuHidden from '@/hooks/useMenuHidden';
import useSidebar from '@/hooks/useSidebar';
import Home from '@/pages/home';
import { Outlet } from 'react-router-dom';
import Loading from "@/components/Loading";
import Reproductor from "@/components/partials/reproductor";
import ReproductorMobile from "@/components/partials/reproductormobile"
import LicensesModal from '@/pages/feed/components/LicensesModal';
import Footer from '@/components/partials/footer';
function HomeLayout() {


    const { width, breakpoints } = useWidth();
    const [collapsed] = useSidebar();
    const [menuType] = useMenulayout();
    const [menuHidden] = useMenuHidden();

    const [modalBeat, setModalBeat] = React.useState(false);
    const [activeBeat, setActiveBeat] = React.useState({});



    const switchHeaderClass = () => {
        if (menuType === "horizontal" || menuHidden) {
          return "ltr:ml-0 rtl:mr-0";
        } else if (collapsed) {
          return "ltr:ml-[72px] rtl:mr-[72px]";
        } else {
          return "ltr:ml-[248px] rtl:mr-[248px]";
        }
      };


    return (
        <>
            <Suspense fallback={<Loading />}>
              <ToastContainer className={"mt-[64px]"}/>
              <HomeHeader className={width > breakpoints.xl ? switchHeaderClass() : ""} />
              {<Outlet context={{setActiveBeat, setModalBeat}}/>}
              <Reproductor setActiveBeat={setActiveBeat} setModalBeat={setModalBeat}/>
              <LicensesModal beat={activeBeat} activeModal={modalBeat} setActiveModal={setModalBeat}/> 
              <Footer />
            </Suspense>
        </>
    )
}

export default HomeLayout