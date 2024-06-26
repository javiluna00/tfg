import { authAtom } from '@/store/authStoreBien'
import Axios from 'axios'
import { useRecoilState } from 'recoil'

function useRefresh () {
  const [auth, setAuth] = useRecoilState(authAtom)

  const refresh = () => {
    return Axios.get('http://localhost:8000/api/auth/refresh', {
      withCredentials: true,
      headers: {
        Authorization: `Bearer ${auth?.token}`
      }
    }).then((res) => {
      console.log('Response : ', res)
      setAuth({
        ...auth,
        token: res.data.access_token
      })
      window.localStorage.setItem('token', res.data.access_token)
      return res.data.access_token
    }).catch((err) => {
      console.log('Error del refresh : ', err.response.data.message)
    })
  }

  return { refresh }
}

export default useRefresh
