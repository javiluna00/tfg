import { useSelector } from "react-redux";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import {authState} from "@/store/authStore";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";


const useAuth = () => {

    const [auth, setAuth] = useRecoilState(authState)
    const [isLogged, setIsLogged] = useState(!!auth.token);
    const navigate = useNavigate()
    const userLogged = auth.user

    useEffect(() => {
        setIsLogged(auth.token ? true : false)
    }, [auth.token])

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
            
            navigate("/feed")
        }
        else
        {
            console.log("No está logeado")
        }

    }

    const logIn = () => {
        if(!isLogged)
        {
            localStorage.setItem("token", "mecagoentupadre")
            localStorage.setItem("user", JSON.stringify({email: "javpuntoillo@gmail.com", password: "123456", id:1, favorites: []}))
            setAuth({
                token: "mecagoentupadre",
                user: {email: "javpuntoillo@gmail.com", password: "123456", id:1, favorites: []},
            })

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
        logOut
    }

}

export default useAuth