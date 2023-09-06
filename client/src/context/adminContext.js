import { createContext,useEffect,useState } from "react";

const AdminContext = createContext({})

export const AdminProvider= ({children})=>{
    const [adminToken,setAdminToken] = useState(null)

    return (
        <AdminContext.Provider value={{adminToken,setAdminToken}}>{children}</AdminContext.Provider>
    )
}

export default AdminContext