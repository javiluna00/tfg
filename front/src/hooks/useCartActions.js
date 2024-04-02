import { useRecoilState, useSetRecoilState } from 'recoil';
import { cartState } from '../store/cartStore';
import useAuth from './useAuth';
import { useEffect } from 'react';
import Axios from '@/components/AxiosSubmit';
import useAuthHeader from 'react-auth-kit/hooks/useAuthHeader';
import { toast } from 'react-toastify';
import { loadStripe } from '@stripe/stripe-js';



export function useCartActions() {


    const [cart, setCart] = useRecoilState(cartState);



    useEffect(() => {
        localStorage.setItem('cart', JSON.stringify(cart));
        console.log("Cart es : ", cart)
    }, [cart]);

    const addToCart = async (beat_id, license_id, authHeader, isAuthenticated) => {

        if(isAuthenticated)
        {

            await Axios.post("cart/addItem", {beat_id : beat_id, license_id : license_id},
                {
                    headers: 
                    {
                        Authorization: authHeader
                    },
                })
                .then((res) => {
                    clearCart()
                    for (let i = 0; i < res.data.cart.items.length; i++) {
                        setCart((cart) => [...cart, res.data.cart.items[i]]);
                    }
                    toast.success(res.data.message)
                })
                .catch((err) => {
                    console.log(err.response.data);
                    toast.error(err.response.data.message)
                });
        }
        else
        {
                await Axios.get(`/beatlicense/getOne`, {params : {beat_id : beat_id, license_id : license_id}}).then((res) => {
                    const itemExists = cart.find(item => item.id === res.data.id);
                    if(!itemExists)
                    {
                        setCart((cart) => [...cart, res.data]);
                        toast.success("Beat añadido al carrito")
                    }
                    else
                    {
                        toast.error("Ese beat ya está en tu carrito")
                    }
                    
                }).catch((err) => {
                    console.log(err)
                })
        }

        // setCart(
        //     (cart) => 
        //     {
        //         return [...cart, newItem]   
        //     });
    };

    const loadCartFromLoggedUser = (userCart) => {

            clearCart()
            if(userCart)
            {
                for (let item of userCart.items) {
                    setCart((cart) => [...cart, item]);
                }
            }


    }

    const subTotalPrice = () => {
        return parseFloat(cart.reduce((acc, item) => acc + item.price, 0)).toFixed(2);
    }

    const discountPrice = () => {
        
    }

    const totalPrice = () => {
        return parseFloat(cart.reduce((acc, item) => acc + item.price, 0)).toFixed(2);
    }   

    const removeItem = (beat_license_id, authHeader, isAuthenticated) => {
        
        if(!beat_license_id)
        {
            return
        }
        else
        {
            if(isAuthenticated)
            {
                Axios.post("cart/removeItem", {beat_license_id : beat_license_id},
                {
                    headers: 
                    {
                        Authorization: authHeader
                    },
                })
                .then((res) => {
                    clearCart()
                    for (let i = 0; i < res.data.cart.items.length; i++) {
                        setCart((cart) => [...cart, res.data.cart.items[i]]);
                    }
                    toast.success(res.data.message)
                })
                .catch((err) => {
                    console.log(err);
                    toast.error(err.response.data.message)
                });
            }
            else
            {
                setCart((cart) => cart.filter((item) => item.id !== beat_license_id));
            }
            
        }

    }

    const clearCart = () => {
            setCart([]);
    }

    const pay = async (email, isLogged, authHeader) => {

        const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PK)

        const stripe = await stripePromise;

        if(isLogged)
        {

            await Axios.post("cart/payLogged", {
                cart : cart,
                email : email,
                isLogged : isLogged
            },
            {
                headers:
                {
                    Authorization: authHeader
                }
            }
            ).then((res) => {
    
                console.log(res.data)
                stripe.redirectToCheckout({sessionId : res.data.id})
    
            }).catch((err) => {
                console.log(err);
            })
        }
    }

    const isEmpty = () => {
        return cart.length === 0;
    }

    return { addToCart, totalPrice, removeItem, cart, clearCart, loadCartFromLoggedUser, pay, isEmpty };
}