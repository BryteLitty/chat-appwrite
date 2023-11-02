import React, {useState} from 'react';
import { useAuth } from '@/utilities/AuthContext';
import Link from 'next/link';

const Register = () => {
    const { handleUserRegister } = useAuth();
    const [credentials, setCredentials] = useState({
        name: "",
        email:"", 
        password1:"",
        password2:"",
    });

    const handleInputChange = (e) => {
        let name = e.target.name;
        let value = e.target.value;

        setCredentials({...credentials, [name]:value})
    }

  return (
    <div className='auth--container'>
      <div className="form--wrapper">
        <form onSubmit={(e) => {handleUserRegister(e, credentials)}}>

            <div className="field--wrapper">
                <label>Username:</label>
                <input 
                required
                type="text"
                name="name"
                placeholder="Choose a username"
                value={credentials.name}
                onChange={(e) => {handleInputChange(e)}}
                />
            </div>

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
              name="password1"
              placeholder="Enter password"
              value={credentials.password1}
              onChange={(e) => {handleInputChange(e)}}
            />
          </div>

          <div className="field--wrapper">
            <label>Confirm Password:</label>
            <input 
              required
              type="password"
              name="password2"
              placeholder="Confirm password"
              value={credentials.password2}
              onChange={(e) => {handleInputChange(e)}}
            />
          </div>

          <div className="field--wrapper">

            <input 
              type="submit" 
              value="Login"
              className='btn btn--lg btn--main w-full mt-5'
            />

          </div>
        </form>
        
        <p className='my-5'>Already have an account? <Link href="/login">Login</Link>
        </p>

      </div>
    </div>
  )
}

export default Register;