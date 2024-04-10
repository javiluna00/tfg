import Button from '@/components/ui/Button';
import Card from '@/components/ui/Card';
import useMenuHidden from '@/hooks/useMenuHidden';
import useMenulayout from '@/hooks/useMenulayout';
import useSidebar from '@/hooks/useSidebar';
import useWidth from '@/hooks/useWidth';
import React from 'react'
import { Link } from 'react-router-dom';
import SimpleBar from "simplebar-react";

function MenuLateral() {

    const { width, breakpoints } = useWidth();
    const [collapsed] = useSidebar();
    const [menuType] = useMenulayout();
    const [menuHidden] = useMenuHidden();

    return (
        <div
          className={`transition-all duration-150  ${width > breakpoints.xl ? "" : "w-full"} 
        `}
        >
          <Card bodyClass={`bg-white rounded-lg py-6 h-full flex flex-col`} className={`${width > breakpoints.xl ? "" : "w-full"} `}>
            <SimpleBar className="h-full px-6">
              <Link to="/profile" className="text-2xl font-bold"><Button icon="heroicons-outline:home" text="Perfil" className="bg-primary-400 hover:bg-primary-500 duration-150 text-white w-full block " /></Link>
              <Link to="/profile/purchases" className="text-2xl font-bold"><Button icon="heroicons-outline:credit-card" text="Compras" className="bg-primary-400 hover:bg-primary-500 duration-150 text-white w-full block mt-6" /></Link>
              <Link to="/profile/saves" className="text-2xl font-bold"><Button icon="heroicons-outline:heart" text="Guardados" className="bg-primary-400 hover:bg-primary-500 duration-150 text-white w-full block mt-6" /></Link>
            </SimpleBar>
          </Card>
        </div>
  )
}

export default MenuLateral