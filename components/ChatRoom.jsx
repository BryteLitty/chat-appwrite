import React, { useState, useEffect } from 'react';
import client, { databases, DATABASE_ID, MESSAGES_COLLECTION_ID } from '@/utilities/appwriteConfig';
import { ID, Query, Role, Permission } from 'appwrite';
import { Trash2 } from 'react-feather';
import Header from './Header';
import { useAuth } from '@/utilities/AuthContext';

const ChatRoom = () => {
  const { user } = useAuth();
  const [messages, setMessages] = useState([]);
  const [messageBody, setMessagesBody] = useState('');
  const options = { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' };

  useEffect(() => {
    getMessages();

  
    const unsubscribe = client.subscribe(`databases.${DATABASE_ID}.collections.${MESSAGES_COLLECTION_ID}.documents`, response => {
      // Callback will be executed on changes for documents A and all files.
      console.log("REAL Time", response);
      setMessages(prevState => [response.payload, ...prevState])

      if(response.events.includes("databases.*.collections.*.documents.*.create")) {
        console.log('A MESSAGE WAS CREATED')
      }

      if(response.events.includes("databases.*.collections.*.documents.*.delete")) {
        console.log('A MESSAGE WAS DELETED')
        setMessages(prevState => prevState.filter(message => message.$id !== response.payload.$id));
      }

    });

    return () => {
      unsubscribe()
    }
    
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    let payload = {
      user_id: user.$id,
      username: user.name,
      body: messageBody
    };

    let permissions = [
      Permission.write(Role.user(user.$id)) 
    ]

    let response = await databases.createDocument(
      DATABASE_ID,
      MESSAGES_COLLECTION_ID,
      ID.unique(),
      payload,
      permissions,
    )
    
    // setMessages(prevState => [response, ...messages])
    setMessagesBody('')
  };

  const getMessages = async () => {
    const response = await databases.listDocuments(
      DATABASE_ID, 
      MESSAGES_COLLECTION_ID,
      [
        Query.orderDesc('$createdAt'),
        Query.limit(5)
      ]
      );
    setMessages(response.documents);
  }

  const deleteMessage = async (message_id) => {
    try {
      await databases.deleteDocument(DATABASE_ID, MESSAGES_COLLECTION_ID, message_id);
      // setMessages(prevState => prevState.filter(message => message.$id !== message_id));
    } catch (error) {
      console.error('Error deleting message:', error);
    }
  }

  return (
    <main className='container'>
      <Header />
      <div className="room--container">
        <form onSubmit={handleSubmit} id="message--form" className="message--form">
          <div>
            <textarea
              required
              maxLength="1000"
              placeholder='Say something...'
              onChange={(e) => {setMessagesBody(e.target.value)}}
              value={messageBody}
            >
            </textarea>
          </div>
          <div className='send-btn--wrapper'>
            <input type="submit" value="Send" className='btn btn--secondary'/>
          </div>
        </form>

        <div>
          {
            messages.length === 0 ? (
              <p>No Messages!</p>
            ) : (
              messages.map(message => (
                <div key={message.$id} className='messages--wrapper'>
                  <div className='message--header'>

                    <p>
                      {message?.username ? (
                          <span className='text-blue-300 font-bold mr-5'>{message.username}</span>
                        ): (
                          <span className='text-blue-300 font-bold mr-5'>Anonymous User</span>
                        )
                      }
                      
                    <small className='message--timestamp my-5'>{new Date(message.$createdAt).toLocaleString(undefined, options)}</small>
                    
                    </p>

                    {
                      message.$permissions.includes(`delete(\"user:${user.$id}\")`) ? (
                       
                        <Trash2 
                          onClick={() => deleteMessage(message.$id)} 
                          className='delete--btn mt-14'
                        />

                      ) : (<p className='mt-20'></p>)
                    }

                  </div>
                  <div>
                    <span className='message--body'>{message.body}</span>
                  </div>
                </div>
              ))
            )
          }
        </div>
      </div>
    </main>
  );
}

export default ChatRoom;
