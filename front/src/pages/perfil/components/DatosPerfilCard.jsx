import Button from '@/components/ui/Button'
import Card from '@/components/ui/Card'
import useProfile from '@/hooks/useProfile'
import { Icon } from '@iconify/react'
import React from 'react'

function DatosPerfilCard() {

    const { startEditing, saveEditing, profileData, isEditing, modificarDatos } = useProfile()

  return (
    <div className="lg:col-span-4 col-span-12">
    <Card title="Info" className="w-full">
      <div className="text-base text-slate-600 dark:text-slate-300 leading-7 flex justify-end mb-3">
        <Icon icon="heroicons:pencil-square" className={"text-2xl text-slate-600 dark:text-slate-300 cursor-pointer"} alt="Editar" onClick={startEditing}/>
      </div>
      <ul className={`list space-y-8 ${ isEditing ? "border-2 border-red-200" : "" } rounded-lg p-6 box-content`}>
        <li className="flex space-x-3 rtl:space-x-reverse">
          <div className="flex-none text-2xl text-slate-600 dark:text-slate-300">
            <Icon icon="heroicons:envelope" />
          </div>
          <div className="flex-1">
            <div className="uppercase text-xs text-slate-500 dark:text-slate-300 mb-1 leading-[12px]">
              EMAIL
            </div>
            <input type="text" disabled={!isEditing} value="javpuntoillo@gmail.com"
              href="mailto:someone@example.com"
              className={`text-base text-slate-600 dark:text-slate-50 p-3 bg-slate-100 dark:bg-slate-900 rounded-md w-full ${ !isEditing ? "hover:cursor-not-allowed" : "" }`}
            />

          </div>
        </li>

        <li className="flex space-x-3 rtl:space-x-reverse">
          <div className="flex-none text-2xl text-slate-600 dark:text-slate-300">
            <Icon icon="heroicons:user" />
          </div>
          <div className="flex-1">
            <div className="uppercase text-xs text-slate-500 dark:text-slate-300 mb-1 leading-[12px]">
              Nombre completo
            </div>
            <input type="text" disabled={!isEditing} value="Javier Luna"
              className={`text-base text-slate-600 dark:text-slate-50 p-3 bg-slate-100 dark:bg-slate-900 rounded-md w-full ${ !isEditing ? "hover:cursor-not-allowed" :"" }`}
            />

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
            <input type="text" disabled={!isEditing} value="Lambda Beats"
              className={`text-base text-slate-600 dark:text-slate-50 p-3 bg-slate-100 dark:bg-slate-900 rounded-md w-full ${ !isEditing ? "hover:cursor-not-allowed" : "" }`}/>
              
          </div>
        </li>

      </ul>
      {isEditing 
      && 
        <div className='flex justify-start items-center mt-3'>
            <Button className="w-full bg-primary-500 text-white hover:bg-primary-600 transition-all duration-150" variant="outlined" onClick={saveEditing}>Guardar</Button>
            <Button className="w-full bg-primary-500 text-white hover:bg-primary-600 transition-all duration-150 ml-2" variant="outlined">Cancelar</Button>
        </div>
      }
      
    </Card>
  </div>
  )
}

export default DatosPerfilCard