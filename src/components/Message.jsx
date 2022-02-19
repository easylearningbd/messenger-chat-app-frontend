import moment from 'moment';
import React from 'react';
import { useSelector } from 'react-redux';

const Message = ({message,currentfriend,scrollRef,typingMessage}) => {
     const {myInfo} = useSelector(state=>state.auth);
  return (
       <>
       <div className='message-show'>
            {
                message && message.length > 0 ? message.map(m => 
                    m.senderId === myInfo.id ? <div ref={scrollRef} className='my-message'>
                    <div className='image-message'>
                         <div className='my-text'>
 <p className='message-text'> {m.message.text === '' ? <img src={`./image/${m.message.image}`} />  : m.message.text } </p>
                         </div>
                    </div>
                    <div className='time'>
        {moment(m.createdAt).startOf('mini').fromNow() }                
                    </div>
                 </div> : <div ref={scrollRef} className='fd-message'>
                   <div className='image-message-time'>
                   <img src={`./image/${currentfriend.image}`} alt='' />
                   <div className='message-time'>
                        <div className='fd-text'>
               <p className='message-text'> {m.message.text === '' ? <img src={`./image/${m.message.image}`} />  : m.message.text }  </p>
                        </div>
                        <div className='time'>
              {moment(m.createdAt).startOf('mini').fromNow() }             
                        </div>
                   </div>
                   </div>
              </div>
                    ) : <div className='friend_connect'>
              <img src={`./image/${currentfriend.image}`} alt='' />
              <h3>{currentfriend.userName} Connect You </h3>
              <span> {moment(currentfriend.createdAt).startOf('mini').fromNow() } </span>
                          </div>
            }
 

       </div>
       {
            typingMessage && typingMessage.msg && typingMessage.senderId === currentfriend._id ? <div className='typing-message'>
            <div className='fd-message'>
                        <div className='image-message-time'>
                        <img src={`./image/${currentfriend.image}`} alt='' />
                        <div className='message-time'>
                             <div className='fd-text'>
                    <p className='time'>Typing Message.... </p>
                             </div>
                             
                        </div>
                        </div>
                   </div>
     
            </div> : ''
       }

       

       </>
  )
};

export default Message;
