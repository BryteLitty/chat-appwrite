import { createContext, useState, useEffect, useContext } from "react";

const AuthContext = createContext();

export const AuthProvider = ({children}) => {

    const [loading, setLoading] = useState(false);
    const [user, setUser] = useState(null);

    useEffect(() => {
        setLoading(true)
    }, [])

    const contextData = {
        user
    };

    return <AuthContext.Provider value={contextData}>
        {loading ? <p>Loading....</p> : children }
    </AuthContext.Provider>
} 

export const useAuth = () => {
    return(useContext(AuthContext))
}

export default AuthContext; 