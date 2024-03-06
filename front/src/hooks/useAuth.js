import { useSelector } from "react-redux";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import {authState} from "@/store/authStore";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import useSignIn from "react-auth-kit/hooks/useSignIn";
import useSignOut from "react-auth-kit/hooks/useSignOut";
import useIsAuthenticated from "react-auth-kit/hooks/useIsAuthenticated";
import useAuthUser from "react-auth-kit/hooks/useAuthUser";
import useAuthHeader from "react-auth-kit/hooks/useAuthHeader";
import axios from "axios";
import { useGoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";
import { split } from "postcss/lib/list";
import { useCartActions } from "./useCartActions";

const useAuth = () => {

    const back_url = import.meta.env.VITE_BACK_URL

    const signIn = useSignIn()
    const signOut = useSignOut()
    const authUser = useAuthUser()
    const authHeader = useAuthHeader()

    const isAuthenticated = useIsAuthenticated()

    const {loadCartFromLoggedUser} = useCartActions()

    const navigate = useNavigate()


    const isAdmin = () => {
        if(isAuthenticated() && jwtDecode(split(authHeader, " ")[1]).roles.includes(1))
        return true

        return false
    }

    const [loading, setLoading] = useState(false)


    const userFavved = (beatId) => {
        if(isAuthenticated())
        {
            return userLogged.favorites.includes(beatId)
        }
        else
        {
            return false
        }
    }

    const numFavs = () => {
        if(isAuthenticated())
        {
            return authUser.favorites.length
        }
    }

    const toogleFav = (beatId) => {
        return 0
    }

    const logOut = () => {
        
        signOut()

    }

    const logIn = ({email, password}) => {

        setLoading(true)

        return axios.post (`${back_url}/auth/login`, {
            email,
            password
        }).then((res) => {
            setLoading(false)
            signIn({
                auth:{
                  token: res.data.token,
                  expiresIn: 3600,
                  tokenType: "Bearer",
                },
                userState: {
                    id: res.data.user.id,
                    email: res.data.user.email,
                    name: res.data.user.name,
                    artist_name : res.data.user.artist_name,
                    saves : res.data.saves,
                    bought_beats : res.data.user.bought_beats
                }
            })

            loadCartFromLoggedUser(res.data.cart)

            navigate("/feed")

        }).catch((err) => {
            setLoading(false)
            return err

        })

    }

    const googleLogin = async (access_token) => {


                return axios
                .get(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${access_token}`, {
                    headers: {
                        Authorization: `Bearer ${access_token}`,
                        Accept: 'application/json'
                    }
                })
                .then((resGoogle) => {

                    return axios.post("http://localhost:8000/api/auth/check-user-google", {
                        google_id : resGoogle.data.id,
                        email : resGoogle.data.email
                    }).then((res) => {
                        

                        if(Object.keys(res.data).length == 0)
                        {
                            return {message: "not registered", resGoogle : resGoogle, access_token : access_token}
                        }
                        else
                        {
                            endGoogleLogin(access_token, res.data)
                            return "registered"
                        }
                    }).catch((err) => {
                        toast.error(err.response.data.message)
                    })

                    
                })
                .catch((err) => toast.error(err));
             // Llamada a la función del hook
    }

    const endGoogleLogin = (access_token, res, artist_name) => {

        const {id, google_id, ...userWithoutId} = res 

        const user = {
            ...userWithoutId,
            artist_name : artist_name,
            google_id: google_id
        }
        

        axios.post("http://localhost:8000/api/auth/login-oauth", {
                        user: user,
                        token: access_token
                    }).then((res) => {
                        signIn({
                            auth:{
                              token: res.data.token,
                              expiresIn: 3600,
                              tokenType: "Bearer",
                            },
                            userState: {
                                id: res.data.user.id,
                                email: res.data.user.email,
                                name: res.data.user.name,
                                artist_name : res.data.user.artist_name,
                                saves : res.data.saves,
                                bought_beats : res.data.user.bought_beats,
                                favorites : []
                            }
                        })
                        loadCartFromLoggedUser(res.data.cart)
                        navigate("/feed")
                        toast.success("Sesión iniciada")

                    })
    } 

    const register = async ({email, name, password, artist_name, password_confirmation}) => {
        setLoading(true)
        return await axios.post(`${back_url}/auth/register`, {
                email,
                name,
                password,
                artist_name,
                password_confirmation
            }
        ).then((res) => {
            setLoading(false)
            return {err : null, message : res.data.message}
        }).catch((err) => {
            setLoading(false)
            return {err: err.response.data, message : null}
            
        })
        
    }

    const saveBeat = async (beatId) => {
        if(!isAuthenticated())
        {
            navigate("/login")
        }
        return await axios.post(`${back_url}/action/save`,
        {
            beat_id : beatId,
            user_id : authUser.id
        } ,
        {
            headers : 
                {Authorization : authHeader}
        }).then((res) => {
            console.log("Respuesta guardar beat : ", res)
            return res.data
        }).catch((err) => {
            return err
        })
    }

    return{
        register,
        isAuthenticated,
        logIn, 
        logOut, 
        authUser,
        isLoading : loading,
        numFavs,
        googleLogin, 
        endGoogleLogin,
        saveBeat,
        authHeader,
        isAdmin
    }

}

export default useAuth