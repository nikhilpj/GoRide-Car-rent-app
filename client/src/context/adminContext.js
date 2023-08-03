import { createContext,useEffect,useState } from "react";

const AdminContext = createContext({})

export const AdminProvider= ({children})=>{
    const [Token,setToken] = useState(null)

    return (
        <AdminContext.Provider value={{Token,setToken}}>{children}</AdminContext.Provider>
    )
}

export default AdminContext