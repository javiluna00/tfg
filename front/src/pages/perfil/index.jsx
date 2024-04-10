import React, { useEffect } from "react";
import { Link, useOutletContext } from "react-router-dom";
import Card from "@/components/ui/Card";
import useWidth from "@/hooks/useWidth";
import Button from "@/components/ui/Button";
import DatosPerfilCard from "./components/DatosPerfilCard";
import TopBar from "./components/TopBar";
import useProfile from "@/hooks/useProfile";
import SkeletionTable from "@/components/skeleton/Table";
import { useRecoilState } from "recoil";
import { authAtom } from "@/store/authStoreBien";



const Perfil = () => {

  const { width, breakpoints } = useWidth();
  const {AxiosPrivate} = useOutletContext()
  const {profileData, loadProfileData, loading} = useProfile({AxiosPrivate})
  const [auth, setAuth] = useRecoilState(authAtom)

  useEffect(() => {
    loadProfileData()
  }, [])


  return (
    <div className=" w-full">
      <div className="flex">


        <div className="flex-grow">
          {loading == true ? 
          
            <SkeletionTable/> 

          :          
            <div className="space-y-5 profile-page">
              
              <TopBar user={auth?.user} />

              <div className="rounded-lg grid grid-cols-12 gap-6 bg-white dark:bg-slate-800 mb-6">
                
                <DatosPerfilCard user={auth?.user} AxiosPrivate={AxiosPrivate}/>

                <div className="lg:col-span-8 col-span-12">
                  <Card title="Acciones">
                    <Button className="w-full bg-primary-500 text-white hover:bg-primary-600 transition-all duration-150" variant="outlined" >Cambiar contraseña</Button>
                    <Button className="w-full bg-primary-500 text-white hover:bg-primary-600 transition-all duration-150 my-2" variant="outlined" onClick={() => { logOut() }} >Cerrar sesión</Button>
                  </Card>
                </div>

              </div>
            </div>
          }
        </div>
      </div>
    </div>
  );
};

export default Perfil;
