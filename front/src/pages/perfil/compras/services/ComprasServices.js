import CustomAxios from "@/components/api/axios";
import { useEffect, useState } from "react";

function ComprasServices() {

    const {AxiosPrivate} = CustomAxios()
    const [purchases, setPurchases] = useState([])
    const [loading, setLoading] = useState(false)

  useEffect(() => {
    console.log("El estado de compras es : ", purchases)
  }, [purchases])

    const getPurchases = async () => {
      setLoading(true)
      AxiosPrivate.get('/user/purchases').then((response) => {

        const purchasesData = response.data

        const parsedPurchasesData = purchasesData.map((purchase) => {
          return {
            id: purchase.id,
            beat_name: purchase.beat.name,
            beat_cover_path : purchase.beat.cover_path,
            price: purchase.price,
            bought_at: purchase.created_at,
            license_name: purchase.license.name,
            beat_license_id: purchase.beat_license_id,
            download_key: purchase.download_key
          }
        })
        setPurchases(parsedPurchasesData);
      }).catch((err) => {
        console.log(err)
      }).finally(() => {
        setLoading(false)
      })
    };


    return {
      getPurchases,
      purchases,
      loading
    }
}





export default ComprasServices