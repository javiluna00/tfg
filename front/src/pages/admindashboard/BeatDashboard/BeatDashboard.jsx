import Breadcrumbs from '@/components/ui/Breadcrumbs'
import Dropdown from '@/components/ui/Dropdown';
import useBeats from '@/hooks/useBeats';
import React, { useEffect } from 'react'
import SkeletionTable from '@/components/skeleton/Table';
import { Menu } from '@headlessui/react';
import { Icon } from '@iconify/react';
import ReactTable from '@/components/partials/reacttable/ReactTable';
import dayjs from 'dayjs';
import { Link, useNavigate } from 'react-router-dom';
import Button from '@/components/ui/Button';
import useAuthHeader from 'react-auth-kit/hooks/useAuthHeader';
import Switch from '@/components/ui/Switch';
import Modal from '@/components/ui/Modal';



function BeatDashboard() {

  const actions = [
    {
        name: "Ver",
        icon: "heroicons-outline:eye",
        link: "/dashboard/beats/show/"
    },
    {
        name: "Editar",
        icon: "heroicons:pencil-square",
        link: "/dashboard/beats/edit/"
    },
    {
        name: "eliminar",
        icon: "heroicons-outline:trash",
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
        cell: (row) => {
            return <span className='font-bold'>{row.getValue()}</span>;
        }
    },
    {
        header: 'Cover',
        accessorKey: 'cover_path',
        cell: (row) => {
            return (
                <img src={row.getValue()} className="w-10 h-10" />
            )
        }
    },
    {
        header: 'Stock',
        accessorKey: 'stock',
    },
    {
        header: 'Exclusivo', 
        accessorFn : ({still_exclusive}) => still_exclusive ? 'Sí' : 'No',
    },

    {
        header: 'Fecha de subida',
        accessorFn: ({created_at}) => dayjs(created_at).format('DD-MM-YYYY HH:mm:ss'),
    },
    {
        header: 'Active',
        cell: (row) => {
  
          const [activeSwitch, setActiveSwitch] = React.useState(row.row.original.active);
  
          const handleSwitchActive = (row) => {
            setActiveSwitch(!activeSwitch);
            updateBeat(row.row.original.id, {active: activeSwitch ? 0 : 1}, authHeader)
          }

          return (
            <Switch
            activeClass="bg-primary-500"
            value={activeSwitch}
            onChange={() => handleSwitchActive(row)}
          />
          )
        }
      },
    {
        header: "Acciones",
        cell: (row) => {
            return (
              <div className='flex justify-start items-center gap-5'>
                  <div className="divide-y divide-slate-100 dark:divide-slate-800 flex justify-start items-center gap-1">
                    {actions.map((item, i) => (
                      <div key={i}>
                        {item.name === "eliminar" ? 
                        
                        <Modal
                          title='¿Estas seguro de eliminar este beat?'
                          label='Eliminar'
                          centered
                          labelClass={"bg-danger-500 text-danger-500 bg-opacity-30 w-full h-9 hover:bg-opacity-100 hover:text-white flex justify-center items-center"}
                          uncontrol
                        >
                          <div className='flex justify-center items-center gap-10'>
                            <Button text="Eliminar" className="btn-danger" onClick={(e) => handleDeleteBeat(e, row)}/>
                          </div>
                        </Modal>
                        
                        : 
    
                        <div
                        style={{zIndex:10}}
                        className={`
                    
                      ${
                        item.name === "eliminar"
                          ? "bg-danger-500 text-danger-500 bg-opacity-30   hover:bg-opacity-100 hover:text-white"
                          : "hover:bg-slate-900 hover:text-white dark:hover:bg-slate-600 dark:hover:bg-opacity-50"
                      }
                       w-full border-b border-b-gray-500 border-opacity-10 px-4 py-2 text-sm  last:mb-0 cursor-pointer 
                       first:rounded-t last:rounded-b flex  space-x-2 items-center rtl:space-x-reverse `}
    
                       onClick={() => navigate(item.link + row.row.original.id)}
                      >
                        <span className="text-base">
                          <Icon icon={item.icon} />
                        </span>
                        <span>{item.name}</span>
                      </div>                   
                        
                      }
                        
    
                      </div>
                    ))}
                  </div>
              </div>
            );
          },
        },
  ]

  const authHeader = useAuthHeader()
  const {beats, activeBeats, loadActiveBeatsFromAPI, loadAllBeatsFromAPI, updateBeat, deleteBeat} = useBeats()
  const navigate = useNavigate()



  const handleDeleteBeat = (e, row) => {
    e.preventDefault()
    deleteBeat(row.row.original.id, authHeader)
  }

  useEffect(() => {
    loadAllBeatsFromAPI(authHeader)
  }, [])

  return (
    <div className='w-full h-full py-10 bg-zinc-50 min-h-screen'>
        
        <div className='container'>
            
            <div>
              <Breadcrumbs/>
            </div>

            <div className='w-full p-5 flex justify-start items-center gap-5'>
                <Link to="/dashboard/beats/moods"><Button text="Gestionar moods" className='btn btn-dark bg-zinc-900'/></Link>
                <Link to="/dashboard/beats/genres"><Button text="Gestionar géneros" className='btn btn-dark bg-zinc-900'/></Link>
            </div>

            {!beats ? <SkeletionTable/> : 
            <div className='mt-10'>
              <ReactTable name={"Beats"} columns={COLUMNS} data={beats} hasNewButton={true} newEntityUrl={"/dashboard/beats/new"}/>
            </div>
            }
            
            

        </div>

    </div>
  )
}

export default BeatDashboard