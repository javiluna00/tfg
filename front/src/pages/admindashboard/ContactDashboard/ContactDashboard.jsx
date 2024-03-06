import Breadcrumbs from '@/components/ui/Breadcrumbs'
import React, { useEffect, useState } from 'react'
import ContactTable from './components/ContactTable'
import Axios from '@/components/AxiosSubmit';
import useAuth from '@/hooks/useAuth';
import Dropdown from '@/components/ui/Dropdown';
import { Menu } from '@headlessui/react';
import { Icon } from '@iconify/react';
import dayjs from 'dayjs';
import SkeletionTable from '@/components/skeleton/Table';



function ContactDashboard() {

  const {authHeader} = useAuth()

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
      header: 'Nombre',
      accessorKey: 'name',
    },
    {
      header: 'Email',
      accessorKey: 'email',
    },
    {
      header: 'Nombre artístico',
      accessorFn : ({artistic_name}) => artistic_name ? artistic_name : '-',
    },
    {
      header: 'Asunto',
      accessorKey: 'subject',
      cell: (row) => {
        return <span className='text-blue-500 cursor-pointer hover:underline font-bold'>{row.getValue()}</span>;
      }
    },
    {
      header: 'Leído',
      accessorKey : 'read',
      cell: (row) => {
        console.log("Row : ", row.getValue())
        if(row.getValue() == 0) {
          return <span className='text-danger-500'>No</span>
        } else {
          return <span className='text-success-500'>Si</span>
        }
      }
    },
    {
      header: 'Fecha',
      accessorKey: 'created_at',
      cell : (row) => {
        return <span>{dayjs(row.getValue()).format('DD/MM/YYYY')}</span>
      }
    },
    {
      header: "Acciones",
      cell: (row) => {
        return (
          <div>
            <Dropdown
              classMenuItems="right-0 w-[140px] top-[110%] "
              label={
                <span className="text-xl text-center block w-full">
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

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true)
    Axios.get('/contacto/', {
      headers: 
        {Authorization : authHeader}
    }).then((res) => {
      setData(res.data.data)
    })
    setLoading(false)
  }, [])


  
  return (
    <div className='w-full h-full py-10 bg-slate-50'>
        
        <div className='container min-h-[85vh]'>
            
            <div>
              <Breadcrumbs/>
            </div>

            {!loading 
            
            ?

              data.length > 0 ?
              
                <div className='mt-10'>
                  <ContactTable columns={COLUMNS} data={data}/>
                </div>
              
              :
            
              <div className='mt-10'>
                <h3>No hay mensajes de contacto</h3>
              </div>
              
              
              
            :

            <div className='mt-10'>
              <SkeletionTable />
            </div>
              
            }

            

        </div>

    </div>
  )
}

export default ContactDashboard