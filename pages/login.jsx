import React, { useEffect, useState} from 'react'
import { useRouter } from 'next/router';
import { useAuth } from '@/utilities/AuthContext';


const LoginPage = () => {
  const router = useRouter();
  const {user} = useAuth();
  const [credentials, setCredentials] = useState({email:"", password:""})

  useEffect(() => {
    if(user){
      router.push('/')
    }
  }, []);

  const handleInputChange = (e) => {
    let name = e.target.name;
    let value = e.target.value;

    setCredentials({...credentials, [name]:value})
    console.log("CREDS:", credentials)
  }

  return (
    <div className='auth--container'>
      <div className="form--wrapper">
        <form>
          <div className="field--wrapper">
            <label>Email:</label>
            <input 
              required
              type="email"
              name="email"
              placeholder="Enter your email..."
              value={credentials.email}
              onChange={(e) => {handleInputChange(e)}}
            />
          </div>

          <div className="field--wrapper">
            <label>Password:</label>
            <input 
              required
              type="password"
              name="password"
              placeholder="Enter your email..."
              value={credentials.password}
              onChange={(e) => {handleInputChange(e)}}
            />
          </div>

          <div className="fild--wrapper">

            <input 
              type="submit" 
              value="Login"
              className='btn btn--lg btn--main w-full mt-5'
            />

          </div>
        </form>
      </div>
    </div>
  )
}

export default LoginPage;