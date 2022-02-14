import React,{ useEffect,useState,useRef } from 'react';
import { FaEllipsisH,FaEdit,FaSistrix } from "react-icons/fa";
import ActiveFriend from './ActiveFriend';
import Friends from './Friends';
import RightSide from './RightSide';
import {useDispatch ,useSelector } from 'react-redux';
import { getFriends,messageSend,getMessage,ImageMessageSend } from '../store/actions/messengerAction';

import {io} from 'socket.io-client';

const Messenger = () => {

 const scrollRef = useRef();
 const socket = useRef();


 const {friends,message} = useSelector(state => state.messenger );
 const {myInfo} = useSelector(state => state.auth);

 const [currentfriend, setCurrentFriend] = useState('');
 const [newMessage, setNewMessage] = useState('');

 const [activeUser, setActiveUser] = useState([]);
 const [socketMessage, setSocketMessage] = useState('');
 const [typingMessage, setTypingMessage] = useState('');

 useEffect(() => {
    socket.current = io('ws://localhost:8000');
    socket.current.on('getMessage',(data) => {
        setSocketMessage(data);
    })

    socket.current.on('typingMessageGet',(data) => {
     setTypingMessage(data);
 })

},[]);


useEffect(() => {
    if(socketMessage && currentfriend){
         if(socketMessage.senderId === currentfriend._id && socketMessage.reseverId === myInfo.id){
              dispatch({
                   type: 'SOCKET_MESSAGE',
                   payload : {
                        message: socketMessage
                   }
              })
         }
    }
    setSocketMessage('')
 },[socketMessage]);



useEffect(() => {
     socket.current.emit('addUser', myInfo.id, myInfo)
 },[]);

 useEffect(() => {
     socket.current.on('getUser', (users)=>{
          const filterUser = users.filter(u => u.userId !== myInfo.id)
          setActiveUser(filterUser);
     })
 },[]);



 

 const inputHendle = (e) => {
     setNewMessage(e.target.value);

     socket.current.emit('typingMessage',{
          senderId : myInfo.id,
          reseverId : currentfriend._id,
          msg : e.target.value
     })

 }
 
 const sendMessage = (e) => {
     e.preventDefault();
     const data = {
          senderName : myInfo.userName,
          reseverId : currentfriend._id,
          message : newMessage ? newMessage : '❤'
     }

     socket.current.emit('sendMessage',{
          senderId: myInfo.id,
          senderName: myInfo.userName,
          reseverId: currentfriend._id,
          time: new Date(),
          message : {
               text : newMessage ? newMessage : '❤',
               image : ''
          }
     })
     socket.current.emit('typingMessage',{
          senderId : myInfo.id,
          reseverId : currentfriend._id,
          msg : ''
     })

     dispatch(messageSend(data));
     setNewMessage('')
 }


 console.log(currentfriend);   



     const dispatch = useDispatch();
     useEffect(() => {
          dispatch(getFriends());
     },[]);

     useEffect(() => {
         if(friends && friends.length > 0)
         setCurrentFriend(friends[0])
       
     },[friends]);


     useEffect(() => {
          dispatch(getMessage(currentfriend._id))
      },[ currentfriend?._id]);
 
      useEffect(() => {
          scrollRef.current?.scrollIntoView({behavior: 'smooth'}) 
      },[ message]);
 

     const emojiSend = (emu) => {
          setNewMessage(`${newMessage}`+  emu);
          socket.current.emit('typingMessage',{
               senderId : myInfo.id,
               reseverId : currentfriend._id,
               msg : emu
          })
     }

     const ImageSend = (e) => {

          if(e.target.files.length !== 0){
               const imagename = e.target.files[0].name;
               const newImageName = Date.now() + imagename;

               socket.current.emit('sendMessage',{
                    senderId: myInfo.id,
                    senderName: myInfo.userName,
                    reseverId: currentfriend._id,
                    time: new Date(),
                    message : {
                         text : '',
                         image : newImageName
                    }
               })

               const formData = new FormData();

               formData.append('senderName',myInfo.userName);
               formData.append('imageName',newImageName);
               formData.append('reseverId',currentfriend._id);
               formData.append('image', e.target.files[0]);
               dispatch(ImageMessageSend(formData));
                
          }


         
     }


  return (
       <div className='messenger'>
<div className='row'>
     <div className='col-3'>
          <div className='left-side'>
               <div className='top'>
                    <div className='image-name'>
                         <div className='image'>
                              <img src={`./image/${myInfo.image}`} alt='' />

                         </div>
                         <div className='name'>
                         <h3>{myInfo.userName} </h3>
                         </div>
                       </div>

                       <div className='icons'>
                            <div className='icon'>
                              <FaEllipsisH />
                            </div>
                            <div className='icon'>
                                  <FaEdit/> 
                            </div>
                       </div>
               </div>

               <div className='friend-search'>
                    <div className='search'>
                    <button> <FaSistrix /> </button>
                    <input type="text" placeholder='Search' className='form-control' />
                    </div>
               </div>

               <div className='active-friends'>
     {
        activeUser && activeUser.length > 0 ? activeUser.map(u =>  <ActiveFriend setCurrentFriend = {setCurrentFriend} user={u} />) : ''  
     }
                        
               </div>

               <div className='friends'>
     {
          friends && friends.length>0 ? friends.map((fd) => <div onClick={()=> setCurrentFriend(fd)} className={currentfriend._id === fd._id ? 'hover-friend active' : 'hover-friend' }> 
          <Friends friend={fd} />
          </div> ) : 'No Friend'
     } 
                    
                    

               </div>

          </div>
                      
                 </div>

     {
          currentfriend ?  <RightSide 
          currentfriend={currentfriend}
          inputHendle={inputHendle}
          newMessage={newMessage}
          sendMessage={sendMessage}
          message={message}
          scrollRef= {scrollRef}
          emojiSend = {emojiSend}
          ImageSend= {ImageSend}
          activeUser = {activeUser}
          typingMessage = {typingMessage}
          /> : 'Please Select your Friend'
     }
                

            </div>

       </div>
  )
};

export default Messenger;
