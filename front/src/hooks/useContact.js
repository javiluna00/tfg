import { useState } from 'react'
import { toast } from 'react-toastify'

const useContact = ({ AxiosPrivate }) => {
  const [contacts, setContacts] = useState([])
  const [loading, setLoading] = useState(false)

  const [contactoData, setContactoData] = useState({

    nombre: '',
    email: '',
    asunto: '',
    mensaje: '',
    artistic_name: ''

  })

  const checkEmail = (email) => {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    return re.test(String(email).toLowerCase())
  }

  const sendForm = async (data) => {
    AxiosPrivate.post('contacto/', data)
      .then((res) => {
        toast.success(res.data.message)
        clearForm()
      })
      .catch((err) => {
        toast.error(err.response.data.message)
      })
  }

  const getContacts = () => {
    setLoading(true)
    AxiosPrivate.get('/contacto/').then((res) => {
      setContacts(res.data.data)
    })
    setLoading(false)
  }

  return {
    contactoData,
    setContactoData,
    sendForm,
    getContacts,
    contacts,
    loading
  }
}

export default useContact
