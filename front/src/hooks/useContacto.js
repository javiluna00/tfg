import { useState } from "react"
import { toast } from "react-toastify"
import Axios from "@/components/AxiosSubmit"


const useContacto = () => {
    
    const [contactoData, setContactoData] = useState({

        nombre: "",
        email: "",
        asunto: "",
        mensaje: "",
        artistic_name: ""

    })

    const checkEmail = (email) => {

        const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    }

    const sendForm = async (data) => {

        Axios.post("contacto/", data)
        .then((res) => {
            toast.success(res.data.message)
            clearForm()
        })
        .catch((err) => {
            toast.error(err.response.data.message)
        })

    }



    return {
        contactoData,
        setContactoData,
        sendForm, 
    }

}

export default useContacto