import React, { useEffect, useState } from 'react'
import ReactTable from '@/components/partials/reacttable/ReactTable'
import Axios from '@/components/AxiosSubmit'
import getCompras from './services/ComprasServices'
import SkeletionTable from '@/components/skeleton/Table'
import useAuthHeader from 'react-auth-kit/hooks/useAuthHeader'
import Dropdown from '@/components/ui/Dropdown'
import { Icon } from '@iconify/react'
import { Menu } from '@headlessui/react'
import dayjs from 'dayjs'
import Button from '@/components/ui/Button'



function Compras() {

  const actions = [
    {
      name: "Ver",
      icon: "heroicons-outline:eye",
    },
    {
      name: "Responder",
      icon: "heroicons:pencil-square",
    },
    {
      name: "Marcar como no leído",
      icon: "heroicons-outline:eye-slash",
    }
  ];
  
  const COLUMNS = [
      {
        header: 'ID',
        accessorKey: 'id',
        cell: (row) => {
          return <span>{row.getValue()}</span>;
        },
      },
      {
        header: 'Beat',
        accessorFn: (row) => row.beat_cover_path ? row.beat_cover_path : row.beat_name, // Esto asegura que el valor accesible sea el correcto.
        cell: ({row}) => {
          // Aquí puedes acceder a los valores de la fila actual y renderizar contenido basado en ellos.
          const { beat_cover_path, beat_name } = row.original; // Accede a las propiedades directamente desde row.original
          return (
            <div className='flex flex-col justify-center'>
              {/* Ejemplo de cómo podrías usar beat_cover_path y beat_name */}
              {beat_cover_path && (
                <img src={beat_cover_path} alt={beat_name} className="h-24 w-24 rounded-lg" />
              )
              }
              
              <span className='text-lg font-bold mt-2'>{beat_name}</span>
              
            </div>
          );
        },
      },
      {
        header: "Precio", 
        accessorFn: ({price}) => price,
        cell: (row) => {
          return <span>{parseFloat(row.getValue(), 10).toFixed(2)}€</span>;
        }
      },
      {
        header: 'Fecha de compra',
        accessorFn : ({bought_at}) => dayjs(bought_at).format('DD/MM/YYYY'),
      },
      {
        header: "Acciones",
        cell: (row) => {
          return (
            <div className='flex justify-center items-center gap-5'>
              <Button icon="heroicons-outline:download" text="Descargar" onClick={() => handleDownload(row)}/>
              <Dropdown
                classMenuItems="right-0 w-[140px] top-[110%] "
                label={
                  <span className="block bg-red-500 rounded-full h-10 w-10 text-white flex justify-center items-center">
                    <Icon icon="heroicons-outline:dots-vertical" />
                  </span>
                }
              >
                <div className="divide-y divide-slate-100 dark:divide-slate-800">
                  {actions.map((item, i) => (
                    <Menu.Item key={i}>
                      <div
                        className={`
                    
                      ${
                        item.name === "delete"
                          ? "bg-danger-500 text-danger-500 bg-opacity-30   hover:bg-opacity-100 hover:text-white"
                          : "hover:bg-slate-900 hover:text-white dark:hover:bg-slate-600 dark:hover:bg-opacity-50"
                      }
                       w-full border-b border-b-gray-500 border-opacity-10 px-4 py-2 text-sm  last:mb-0 cursor-pointer 
                       first:rounded-t last:rounded-b flex  space-x-2 items-center rtl:space-x-reverse `}
                      >
                        <span className="text-base">
                          <Icon icon={item.icon} />
                        </span>
                        <span>{item.name}</span>
                      </div>
                    </Menu.Item>
                  ))}
                </div>
              </Dropdown>
            </div>
          );
        },
      },
    ];

  const handleDownload = (row) => {
    console.log("Row : ", row.getValue())
  }

  const [data, setData] = useState([])
  const [loading, setLoading] = useState(false)

  const authHeader = useAuthHeader()

  useEffect(() => {
    getCompras(authHeader).then((purchaseData) => {
      const validData = purchaseData.map((purchase) => {
        return {
          id: purchase.id,
          beat_name: purchase.beat.name,
          beat_cover_path : purchase.beat.cover_path,
          price: purchase.price,
          bought_at: purchase.created_at,
          license_name: purchase.license.name,
          beat_license_id: purchase.beat_license_id
        }
      })
      setData(validData); // Actualiza el estado con los datos obtenidos
      setLoading(false); // Oculta el indicador de carga
    }).catch((error) => {
      console.error("Error al obtener las compras", error);
      setLoading(false); // Asegúrate de ocultar el indicador de carga incluso si hay un error
    });
  }, []); 

  useEffect(() => {
    console.log("Data del useEffect", data)
  }, [data])



  return (
    <div className='flex'>
        
        <div className='flex grow px-6 my-[30px] w-full'>
        {loading ? <SkeletionTable /> :  <ReactTable name={"Historial de compras"} columns={COLUMNS} data={data} />}
        </div>
    </div>
  )
}

export default Compras