import React from 'react';
import moment from 'moment';

const Friends = (props) => {
     const {fndInfo,msgInfo} = props.friend;
     const myId = props.myId;

  return (
       <div className='friend'>
            <div className='friend-image'>
                 <div className='image'>
                 <img src={`./image/${fndInfo.image}`} alt='' />
                 </div>
            </div>

            <div className='friend-name-seen'>
                 <div className='friend-name'>
                      <h4>{fndInfo.userName}</h4>
                      <div className='msg-time'>
     {
          msgInfo && msgInfo.senderId  === myId ? <span>You </span> : <span> {fndInfo.userName + ' '} </span>
     }
     {
          msgInfo && msgInfo.message.text ? <span>{msgInfo.message.text.slice(0, 10)}</span> : msgInfo && msgInfo.message.image ? <span>Send A image </span> : <span>Connect You </span>
     }
     <span>{msgInfo ? moment(msgInfo.createdAt).startOf('mini').fromNow() : moment(fndInfo.createdAt).startOf('mini').fromNow()}</span>

                      </div>
                 </div>

     {
          myId === msgInfo?.senderId?
          <div className='seen-unseen-icon'>
                <img src={`./image/${fndInfo.image}`} alt='' />
         </div> :
         <div className='seen-unseen-icon'>
              <div className='seen-icon'>

                   </div>

              </div>
     }


            </div>

       </div>
  )
};

export default Friends;
