import { useState } from "react"
import { toast } from "react-toastify"



const useContacto = () => {
    
    const [contactoData, setContactoData] = useState({

        nombre: "",
        email: "",
        asunto: "",
        mensaje: "",

    })

    const checkEmail = (email) => {

        const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    }

    const sendForm = async () => {

        await console.log(contactoData)
        if(contactoData.email !== "" && contactoData.asunto !== "" && contactoData.mensaje !== "" && contactoData.nombre !== ""){
            if(checkEmail(contactoData.email))
            {
                toast.success("Formulario enviado")
                console.log(contactoData)
                clearForm()
            }
            else
            {
                toast.error("Email incorrecto")
            }

        }
        else
        {
            toast.error("Todos los campos son obligatorios.")
        }

    }

    const clearForm = () => {

        setContactoData({
            nombre: "",
            email: "",
            asunto: "",
            mensaje: "",
        })
    }

    return {
        contactoData,
        setContactoData,
        sendForm, 
        clearForm
    }

}

export default useContacto