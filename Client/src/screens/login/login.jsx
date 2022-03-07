import React from 'react'
import InputComponent from '../../components/input-component/input';
import'./login.css'
import sideimage from  '../../assets/images/login-illustration.png';
import axios from 'axios';
import {Link, Navigate} from 'react-router-dom';

// import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
// import { render } from '@testing-library/react';



class Login extends React.Component{

    constructor() {
        
        super();
        this.changeHandler = this.changeHandler.bind(this);
        this.state = {
          email: "",
          password: "",
          loginAttempts: 3,
          isDisabled: false,
          notRoute: true,

        };
      }



    handleSubmit = (e) => {
        
        e.preventDefault();
        const obj = {
            email:this.state.email,
            password: this.state.password,
        }

        axios.post('http://localhost/register/login.php', obj)
        .then(res => {
            console.log(res.data);
            console.log(this.state.loginAttempts);

            if(this.state.loginAttempts > 0){

                if(res.data !== '404'){

                    let date = new Date(res.data);
                    let curdate = new Date();
                    let expdate = new Date(res.data);
                    console.log(curdate)
                    console.log(expdate)
                    date.setDate(date.getDate()-10);
                    if(curdate.getYear() === date.getYear() && curdate.getMonth() === date.getMonth() && curdate.getDay() === date.getDay()){
                        if(curdate.getTime()>=date.getTime()){
                            alert('Login Success')
                            alert("Password expires in 10 days left");
                        }
                    }else if(curdate.getTime()>=expdate.getTime()){
                        alert('Login Success')
                        alert("Password Expired, please change password");
                        this.setState({notRoute: false});
                    }
                             
                    
                }else{
                    this.setState((prevState)=>({loginAttempts: prevState.loginAttempts-1}));
                    alert("Login Failed. Please try again.");
                }
            }else{
                this.setState({isDisabled: true});
                // Lock Login Button for 5 minutes and add 3 again to loginAttempts variable
                setTimeout(()=> {
                    this.setState({isDisabled: false})
                    this.setState({loginAttempts: 3})
                }, 30000);
                alert("Too many failed attempts, try again after 5 minutes.");
            }

        })
        .catch(error => {
            console.log(error.response);
            alert("Error");
        })
        
    }

    changeHandler = (e) => {
        e.preventDefault();
        const { name, value } = e.target;
        this.setState({ [name]: value });
    }
      
render(){
    return(

    <div className='grid'>
        <div>
      
        <form className='form' onSubmit={this.handleSubmit}>
        <h2>LOGIN</h2>
        <h3>PAGE</h3>
        <div className='container'>
        <InputComponent label={'email'} placeholder={'i.e. JonnJonzz@email.com'} onChange = {this.changeHandler} name={'email'} type={'email'} id={'email'}/>
        <InputComponent label={'password'} placeholder={'Jonn#191281'} name={'password'} onChange = {this.changeHandler} type={'password'} id={'password'}/>
     
        </div>
       
      
   

        <input type={'submit'} disabled={this.state.isDisabled} className='submit' value={'Login'}/>
        </form>
        </div>
        <div>
        
        <div className='container-fixed'>
            
        <img src={sideimage} alt='register illustration' />
        <Link to ={{pathname:'/'}}>
            <h1 className='toSignInButton'>Don't have an account yet? Sign up</h1>
        </Link>
        {!this.state.notRoute && <Navigate to="/changepassword" replace ={true}/>}
        </div>
        </div>
       
        
    </div>
)}
}
export default Login;