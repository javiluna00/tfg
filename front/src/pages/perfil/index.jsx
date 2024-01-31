import React from "react";
import { Link } from "react-router-dom";
import Icon from "@/components/ui/Icon";
import Card from "@/components/ui/Card";
import BasicArea from "../chart/appex-chart/BasicArea";
import SimpleBar from "simplebar-react";

// import images
import ProfileImage from "@/assets/images/users/user-1.jpg";
import useWidth from "@/hooks/useWidth";
import Button from "@/components/ui/Button";
import Menulateral from "./MenuLateral";

const Perfil = () => {

  const { width, breakpoints } = useWidth();

  return (
    <div className="my-[30px] w-full">
      <div className="flex">


        <div className="flex-grow px-6">
          <div className="space-y-5 profile-page">
            <div className="profile-wrap px-[35px] pb-10 pt-10 rounded-lg bg-white dark:bg-slate-800 lg:flex lg:space-y-0  justify-between items-end relative z-[1]">
              
              <div className="profile-box flex-none md:text-start text-center">
                <div className="md:flex items-end md:space-x-6 rtl:space-x-reverse">
                  <div className="flex-none">
                  </div>
                  <div className="flex-1">
                    <div className="text-2xl font-medium text-slate-900 dark:text-slate-200 mb-[3px]">
                      Albert Flores
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-4 profile-info-500 md:flex md:text-start text-center flex-1 max-w-[516px] md:space-y-0 space-y-4 bg-white">
                <div className="flex-1">
                  <div className="text-base text-slate-900 dark:text-slate-300 font-medium mb-1">
                    3
                  </div>
                  <div className="text-sm text-slate-600 font-light dark:text-slate-300">
                    Beats comprados
                  </div>
                </div>

                <div className="flex-1">
                  <div className="text-base text-slate-900 dark:text-slate-300 font-medium mb-1">
                    6
                  </div>
                  <div className="text-sm text-slate-600 font-light dark:text-slate-300">
                    Beats guardados
                  </div>
                </div>

              </div>
            </div>
            <div className="rounded-lg grid grid-cols-12 gap-6 bg-white dark:bg-slate-800">
              <div className="lg:col-span-4 col-span-12">
                <Card title="Info">
                  <ul className="list space-y-8">
                    <li className="flex space-x-3 rtl:space-x-reverse">
                      <div className="flex-none text-2xl text-slate-600 dark:text-slate-300">
                        <Icon icon="heroicons:envelope" />
                      </div>
                      <div className="flex-1">
                        <div className="uppercase text-xs text-slate-500 dark:text-slate-300 mb-1 leading-[12px]">
                          EMAIL
                        </div>
                        <a
                          href="mailto:someone@example.com"
                          className="text-base text-slate-600 dark:text-slate-50"
                        >
                          info-500@dashcode.com
                        </a>
                      </div>
                    </li>

                    <li className="flex space-x-3 rtl:space-x-reverse">
                      <div className="flex-none text-2xl text-slate-600 dark:text-slate-300">
                        <Icon icon="heroicons:user" />
                      </div>
                      <div className="flex-1">
                        <div className="uppercase text-xs text-slate-500 dark:text-slate-300 mb-1 leading-[12px]">
                          Nombre de usuario
                        </div>
                        <p
                          className="text-base text-slate-600 dark:text-slate-50"
                        >
                          javinuevo
                        </p>
                      </div>
                    </li>

                    <li className="flex space-x-3 rtl:space-x-reverse">
                      <div className="flex-none text-2xl text-slate-600 dark:text-slate-300">
                        <Icon icon="heroicons:academic-cap" />
                      </div>
                      <div className="flex-1">
                        <div className="uppercase text-xs text-slate-500 dark:text-slate-300 mb-1 leading-[12px]">
                          Nombre artístico
                        </div>
                        <div className="text-base text-slate-600 dark:text-slate-50">
                          Lambda Beats
                        </div>
                      </div>
                    </li>
                  </ul>
                </Card>
              </div>
              <div className="lg:col-span-8 col-span-12">
                <Card title="Acciones">
                  <Button className="w-full bg-primary-500 text-white hover:bg-primary-600 transition-all duration-150" variant="outlined" >Cambiar contraseña</Button>
                  <Button className="w-full bg-primary-500 text-white hover:bg-primary-600 transition-all duration-150 my-2" variant="outlined" >Cerrar sesión</Button>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Perfil;
