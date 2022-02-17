import React from 'react';

const Friends = ({friend}) => {
  return (
       <div className='friend'>
            <div className='friend-image'>
                 <div className='image'>
                 <img src={`./image/${friend.fndInfo.image}`} alt='' />
                 </div>
            </div>

            <div className='friend-name-seen'>
                 <div className='friend-name'>
                      <h4>{friend.fndInfo.userName}</h4>
                 </div>

            </div>

       </div>
  )
};

export default Friends;
