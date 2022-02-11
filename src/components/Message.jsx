import React from 'react';
import { useSelector } from 'react-redux';

const Message = ({message,currentfriend}) => {
     const {myInfo} = useSelector(state=>state.auth);
  return (
       <div className='message-show'>
            {
                message && message.length > 0 ? message.map(m => 
                    m.senderId === myInfo.id ? <div className='my-message'>
                    <div className='image-message'>
                         <div className='my-text'>
                              <p className='message-text'> {m.message.text} </p>
                         </div>
                    </div>
                    <div className='time'>
                          2 Jan 2022                      
                    </div>
                 </div> : <div className='fd-message'>
                   <div className='image-message-time'>
                   <img src={`./image/${currentfriend.image}`} alt='' />
                   <div className='message-time'>
                        <div className='fd-text'>
               <p className='message-text'>{m.message.text} </p>
                        </div>
                        <div className='time'>
                                3 Jan 2022             
                        </div>
                   </div>
                   </div>
              </div>
                    ) : ''
            }

             



       </div>
  )
};

export default Message;
