import React from 'react'
import PrivateRoute from '@/components/PrivateRoutes';
import ChatRoom from '@/components/ChatRoom';

const index = () => {
  return (
    <PrivateRoute>
      <ChatRoom />
    </PrivateRoute>
  )
}

export default index;