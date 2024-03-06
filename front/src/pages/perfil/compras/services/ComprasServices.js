import Axios from "@/components/AxiosSubmit";


const getCompras = async (authHeader) => {
  const response = await Axios.get('/user/purchases', {
    headers: {
      Authorization: authHeader
    }
  });
  return response.data; // Asegúrate de devolver response.data
};



export default getCompras