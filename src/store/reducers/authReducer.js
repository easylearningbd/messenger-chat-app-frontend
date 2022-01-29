import { REGISTER_FAIL } from "../types/authType";

const authState = {
     loading : true,
     authenticate : false,
     error : '',
     successMessage: '',
     myInfo : ''
}

export const authReducer = (state = authState, action) => {
     const {payload,type} = action;

     if(type === REGISTER_FAIL){
          return {
               ...state,
               error : payload.error,
               authenticate : false,
               myInfo : '',
               loading : true
          }
     }




     return state;
}