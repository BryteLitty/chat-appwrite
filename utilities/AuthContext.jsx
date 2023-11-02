import { createContext, useState, useEffect, useContext } from "react";
import { account } from "./appwriteConfig";
import { useRouter } from "next/router";
import { ID } from "appwrite";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);

  useEffect(() => {
    getUserOnLoad()
  }, []);

  const getUserOnLoad = async () => {
    try {
      const accountDetails = await account.get();
      setUser(accountDetails)
    }catch(err){
      console.log(err)
    }
    setLoading(false)
  }

  const handleUserLogin = async (e, credentials) => {
    e.preventDefault();
    e.target.value = ""
    try {
      const response = await account.createEmailSession(
        credentials.email,
        credentials.password
        )
        console.log('LOGGED_IN', response)
        
        const accoutDetails = await account.get();

        setUser(accoutDetails);

        router.push('/');
         

    }catch (err) {
      console.log(err)
    }
  }


  // handle User Registration
  const handleUserRegister =  async (e, credentials) => {
    e.preventDefault();

    if (credentials.password1 !== credentials.password2) {
      alert('Password do not match!');
      return;
    }
    
    try {
      let response = await account.create(
        ID.unique(),
        credentials.email,
        credentials.password1,
        credentials.name,
      )
    
    await account.createEmailSession(credentials.email, credentials.password1)

    const accountDetails = await account.get();
    setUser(accountDetails)
    router.push('/')

    } catch(error) {
      console.error(error)
    }
  }

  // handle logout
  const handleUserLogout = async () => {
    await account.deleteSession('current');
    setUser(null)
    // setLoading(true)
    router.push('/login')
  }

  const contextData = {
    user,
    handleUserLogin,
    handleUserLogout,
    handleUserRegister,
  };

  return (
    <AuthContext.Provider value={contextData}>
      {loading ? <p>Loading....</p> : children}
    </AuthContext.Provider>
  );
};


export const useAuth = () => {return useContext(AuthContext)}


export default AuthContext;
