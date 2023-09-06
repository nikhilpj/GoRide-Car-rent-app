import { createContext ,useState } from "react";
import {  RecaptchaVerifier, getAuth,signInWithPhoneNumber } from "firebase/auth";

const UserContext = createContext({})

export const UserProvider = ({children})=>{

    const [Token,setToken] = useState(null)

    function setUpRecaptcha(number){

        const auth = getAuth()
        const Recaptcha = new RecaptchaVerifier(auth, 'recaptcha-container', {})
        Recaptcha.render()
        return signInWithPhoneNumber(auth,number,Recaptcha)
    }

    const contextValue = {
        setUpRecaptcha: setUpRecaptcha,
      };

    return (
        <UserContext.Provider value={{setUpRecaptcha,Token,setToken}}>{children}</UserContext.Provider>
    )
}

export default UserContext


