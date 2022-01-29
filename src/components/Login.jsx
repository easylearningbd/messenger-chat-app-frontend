import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { userLogin } from '../store/actions/authAction';

const Login = () => {


     const [state, setState] = useState({
          email: '',
          password : ''
     });

     const inputHendle = e => {
          setState({
               ...state,
               [e.target.name] : e.target.value 
          })
     }

     const login = (e) => {
          e.preventDefault();
          console.log(state);
     }

     return (
          <div className='register'>
          <div className='card'>
               <div className='card-header'>
          <h3>Login</h3>
               </div>

     <div className='card-body'>
          <form onSubmit={login}>
                

               <div className='form-group'>
                    <label htmlFor='email'>Email</label>
               <input type="email" onChange={inputHendle} name="email" value={state.email} className='form-control' placeholder='Email' id='email' /> 
               </div>

               <div className='form-group'>
                    <label htmlFor='password'>Password</label>
               <input type="password"  onChange={inputHendle} name="password" value={state.password} className='form-control' placeholder='Password' id='password' /> 
               </div> 


               <div className='form-group'>
               <input type="submit" value="login" className='btn' />
               </div>


               <div className='form-group'>
     <span><Link to="/messenger/register"> Don't have any Account </Link></span>
               </div>  
          </form> 
     </div>


               </div> 

     </div>
     
          )
};

export default Login;
