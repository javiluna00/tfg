import { useSelector } from "react-redux";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import {authState} from "@/store/authStore";
import { useEffect } from "react";


const useAuth = () => {

    const [auth, setAuth] = useRecoilState(authState)

    const isLogged = auth.token ? true : false
    const userLogged = auth.user


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

    useEffect(() => {
        console.log("UserLogged : ", userLogged)
    }, [userLogged])

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
        }
        else
        {
            console.log("No está logeado")
        }

    }

    const logIn = () => {
        console.log("Ha entrado")
        if(!isLogged)
        {
            setAuth({
                token: "mecagoentupadre",
                user: {email: "javpuntoillo@gmail.com", password: "123456", id:1, favorites: []},
            })
            localStorage.setItem("token", "mecagoentupadre")
            localStorage.setItem("user", JSON.stringify({email: "javpuntoillo@gmail.com", password: "123456", id:1, favorites: []}))
        }
        else
        {
            console.log("Está logeado")
        }
    }

    return{
        userLogged,
        isLogged,
        userFavved, 
        toogleFav,
        logIn, 
        logOut
    }

}

export default useAuth