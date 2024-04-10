import { useRecoilState } from 'recoil'
import { cartAtom } from '../store/cartStore'
import { useEffect } from 'react'
import { toast } from 'react-toastify'
import { loadStripe } from '@stripe/stripe-js'

export function useCartActions ({ AxiosPrivate }) {
  const [cart, setCart] = useRecoilState(cartAtom)

  useEffect(() => {
    window.localStorage.setItem('cart', JSON.stringify(cart))
  }, [cart])

  const addToCart = async ({ beatId, licenseId, isAuthenticated }) => {
    if (isAuthenticated) {
      await AxiosPrivate.post('cart/addItem', { beat_id: beatId, license_id: licenseId })
        .then((res) => {
          clearCart()
          for (let i = 0; i < res.data.cart.items.length; i++) {
            setCart((cart) => [...cart, res.data.cart.items[i]])
          }
          toast.success(res.data.message)
        })
        .catch((err) => {
          console.log(err.response.data)
          toast.error(err.response.data.message)
        })
    } else {
      await AxiosPrivate.get('/beatlicense/getOne', { params: { beatId, licenseId } }).then((res) => {
        const itemExists = cart.find(item => item.id === res.data.id)
        if (!itemExists) {
          setCart((cart) => [...cart, res.data])
          toast.success('Beat añadido al carrito')
        } else {
          toast.error('Ese beat ya está en tu carrito')
        }
      }).catch((err) => {
        console.log(err)
      })
    }
  }

  const loadCartFromLoggedUser = (userCart) => {
    clearCart()
    if (userCart) {
      for (const item of userCart.items) {
        setCart((cart) => [...cart, item])
      }
    }
  }

  const subTotalPrice = () => {
    return parseFloat(cart.reduce((acc, item) => acc + item.price, 0)).toFixed(2)
  }

  const discountPrice = () => {

  }

  const totalPrice = () => {
    return parseFloat(cart.reduce((acc, item) => acc + item.price, 0)).toFixed(2)
  }

  const removeItem = (beatLicenseId, isAuthenticated) => {
    if (beatLicenseId) {
      if (isAuthenticated) {
        AxiosPrivate.post('cart/removeItem', { beat_license_id: beatLicenseId })
          .then((res) => {
            clearCart()
            for (let i = 0; i < res.data.cart.items.length; i++) {
              setCart((cart) => [...cart, res.data.cart.items[i]])
            }
            toast.success(res.data.message)
          })
          .catch((err) => {
            console.log(err)
            toast.error(err.response.data.message)
          })
      } else {
        setCart((cart) => cart.filter((item) => item.id !== beatLicenseId))
      }
    }
  }

  const clearCart = () => {
    setCart([])
  }

  const pay = async (email, isLogged) => {
    const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PK)

    const stripe = await stripePromise

    if (isLogged) {
      await AxiosPrivate.post('cart/payLogged', {
        cart,
        email,
        isLogged
      }).then((res) => {
        console.log(res.data)
        stripe.redirectToCheckout({ sessionId: res.data.id })
      }).catch((err) => {
        console.log(err)
      })
    }
  }

  const isEmpty = () => {
    return cart.length === 0
  }

  return { addToCart, totalPrice, removeItem, cart, clearCart, loadCartFromLoggedUser, pay, isEmpty }
}
