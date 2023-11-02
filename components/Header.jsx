import React from 'react';
import { useAuth } from '@/utilities/AuthContext';
import { LogOut } from 'react-feather';

const Header = () => {
    const { user, handleUserLogout } = useAuth();
    

  return (
    <div id='header--wrapper'>
        { user ? (
            <>
                Welcome, {user.name}
                <LogOut 
                    className='header--link'
                    onClick={handleUserLogout}
                />
            </>
        ): (
            <button></button>
        )}
    </div>
  )
}

export default Header;