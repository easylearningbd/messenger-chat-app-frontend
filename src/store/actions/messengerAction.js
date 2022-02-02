import axios from 'axios';

export const getFriends = () => async(dispatch) => {
     try{
          const response = await axios.get('/api/messenger/get-friends');
          console.log(response.data);

     }catch (error){
          console.log(error.response.data);
     }
}