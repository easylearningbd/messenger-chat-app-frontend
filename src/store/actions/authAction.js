import axios from 'axios';
import {REGISTER_FAIL} from "../types/authType";

export const userRegister = (data) => {
     return async (dispatch) => {

          const config = {
               headers: {
                    'Content-Type':'application/josn'
               } 
          }
          try{
               const response = await axios.post('/api/messenger/user-register',data,config);
               console.log(response.data);

          } catch(error){
                dispatch({
                    type: REGISTER_FAIL,
                    payload:{
                         error : error.response.data.error.errorMessage 
                    }
                })
          }

     }
}