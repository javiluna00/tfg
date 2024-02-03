import { useSelector } from "react-redux";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import {authState} from "@/store/authStore";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";


const useAuth = () => {

    const [auth, setAuth] = useRecoilState(authState)
    const [isLogged, setIsLogged] = useState(!!auth.token);
    const navigate = useNavigate()
    const userLogged = auth.user

    useEffect(() => {
        setIsLogged(auth.token ? true : false)
    }, [auth.token])


    useEffect(() => {
        if(!isLogged)
        {
            localStorage.removeItem("token")
            localStorage.removeItem("user")
        }
        else
        {
            localStorage.setItem("token", auth.token)
            localStorage.setItem("user", JSON.stringify(userLogged))
        }
    }, [auth])

    useEffect(() => {
        console.log("isLogged : ", isLogged)
    }, [isLogged])

    const userFavved = (beatId) => {
        if(isLogged)
        {
            return userLogged.favorites.includes(beatId)
        }
        else
        {
            return false
        }
    }

    const numFavs = () => {
        if(isLogged)
        {
            return userLogged.favorites.length
        }
    }

    const toogleFav = (beatId) => {
        if(isLogged)
        {
            const favs = userLogged.favorites
            if(favs.includes(beatId))
            {
                console.log("Lo incluye")
                setAuth({
                    token: auth.token,
                    user : {...userLogged, favorites : favs.filter((fav) => fav !== beatId)}
                })
            } 
            else{
                console.log("No lo incluye")
                setAuth({...auth, user : {...userLogged, favorites : [...favs, beatId]}})
            }
            localStorage.setItem("user", JSON.stringify({...userLogged, favorites : favs}))
        }
    }

    const logOut = () => {
        
        if(isLogged)
        {
            setAuth({
                token: null,
                user: null,
            })
            localStorage.removeItem("token")
            localStorage.removeItem("user")
            toast.success("Sesión cerrada")
            navigate("/feed")
        }
        else
        {
            console.log("No está logeado")
        }

    }

    const logIn = ({email, password, nombre, apellidos, nombre_artistico,imagen,  id, token}) => {
        if(!isLogged)
        {
            localStorage.setItem("token", token)
            localStorage.setItem("user", JSON.stringify({email: email, nombre: nombre + " " + apellidos, imagen: imagen, nombre_artistico: nombre_artistico || "Sin datos", id, favorites: []}))
            setAuth({
                token: token,
                user: {email: email, nombre: nombre + " " +  apellidos, imagen: imagen, nombre_artistico: nombre_artistico  || "Sin datos", id, favorites: []},
            })
            toast.success("Sesión iniciada")
        }
        else
        {
            console.log("Está logeado")
        }
    }

    const isUserLogged = () => {
        return isLogged
    }

    return{
        userLogged,
        isLogged,
        isUserLogged,
        userFavved, 
        toogleFav,
        logIn, 
        logOut, 
        numFavs
    }

}

export default useAuth