import React from 'react';
import { FaPlusCircle,FaFileImage,FaGift,FaPaperPlane } from "react-icons/fa";

const MessageSend = () => {

     const emojis = [
          '😀', '😃', '😄', '😁',
          '😆', '😅', '😂', '🤣',
          '😊', '😇', '🙂', '🙃',
          '😉', '😌', '😍', '😝',
          '😜', '🧐', '🤓', '😎',
          '😕', '🤑', '🥴', '😱'
      ]


  return (

     <div className='message-send-section'>
          <input type="checkbox" id='emoji' />
             <div className='file hover-attachment'>
                  <div className='add-attachment'>
                         Add Attachment
                  </div>
                  <FaPlusCircle />
                  </div>  

          <div className='file hover-image'>
               <div className='add-image'>
                    Add Image 
               </div>
               <label htmlFor='pic'> <FaFileImage/> </label>
          </div>
          
          <div className='file hover-gift'>
               <div className='add-gift'>
                    Add gift
               </div>
               <FaGift />
          </div>

     <div className='message-type'>
          <input type="text" name='message' id='message' placeholder='Aa' className='form-control'/>

          <div className='file hover-gift'>
               <label htmlFor='emoji'> <FaPaperPlane/> </label>
          </div>
     </div>

     <div className='file'>
     ❤
     </div>

     <div className='emoji-section'>
          <div className='emoji'>
               {
                    emojis.map(e => <span>{e}</span>)
               }

          </div>

     </div>


     </div>

  )
};

export default MessageSend;
