import { filterStore } from "@/store/filterStore"
import { useRecoilState, useRecoilValue } from "recoil"

const useFilter = () => {

    const [filterOptions, setFilterOptions] = useRecoilState(filterStore)



    return {
        filterOptions, setFilterOptions
    }

}

export default useFilter