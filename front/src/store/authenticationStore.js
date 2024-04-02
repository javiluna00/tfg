import createStore from "react-auth-kit/createStore";
import createRefresh from 'react-auth-kit/createRefresh';
import Axios from "@/components/AxiosSubmit";

const refresh = createRefresh({
    interval: 10, // The time in sec to refresh the Access token,
    refreshApiCallback: async (param) => {
      try {
        const response = await Axios.post("/auth/refresh", param, {
          headers: {'Authorization': `Bearer ${param.authToken}`}
        })
        console.log("Refreshing")
        return {
          isSuccess: true,
          newAuthToken: response.data.token,
          newAuthTokenExpireIn: 10,
          newRefreshTokenExpiresIn: 60
        }
      }
      catch(error){
        console.error(error)
        return {
          isSuccess: false
        } 
      }
    }
  })
  


export const store = createStore({
    authName: "_auth",
    authType: "cookie",
    cookieDomain: window.location.hostname,
    cookieSecure: window.location.protocol === "https:",
    // refresh: refresh
})