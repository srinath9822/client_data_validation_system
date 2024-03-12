import React, { useEffect, useState } from "react"
import axios from "axios"
import { useNavigate, Link } from "react-router-dom"


function Login() {
    const history=useNavigate();

    const [email,setEmail]=useState('')
    const [emailError, setEmailError] = useState('');
    const [password,setPassword]=useState('')
    const [passwordError, setPasswordError] = useState('');
    const validatePassword = (password) => {
        // Define your password validation criteria here
        const minLength = 8;
        const hasUppercase = /[A-Z]/.test(password);
        const hasLowercase = /[a-z]/.test(password);
        const hasNumber = /\d/.test(password);
        const hasSpecialCharacter = /[!@#$%^&*]/.test(password);
    
        if (
          password.length < minLength ||
          !hasUppercase ||
          !hasLowercase ||
          !hasNumber ||
          !hasSpecialCharacter
        ) {
          return 'Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one number, and one special character.';
        }
        return '';
      };
      const validateEmail = (email) => {
        // Define a regular expression for email validation
        const emailRegex = /^[A-Za-z0-9._%-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/;
    
        if (!emailRegex.test(email)) {
          return 'Please enter a valid email address.';
        }
        return '';
      };
    async function submit(e){
        e.preventDefault();
        const emailError = validateEmail(email);
        const passwordError = validatePassword(password);
        if (passwordError || emailError) {
          setEmailError(emailError);
          setPasswordError(passwordError);
        } else {

            try{

                await axios.post("http://localhost:8000/signup",{
                    email,password
                })
                .then(res=>{
                    if(res.data=="exist"){
                        alert("User already exists")
                    }
                    else if(res.data=="notexist"){
                        history("/home",{state:{id:email}})
                    }
                })
                .catch(e=>{
                    alert("wrong details")
                    console.log(e);
                })
    
            }
            catch(e){
                console.log(e);
    
            }        }
        

    }


    return (
        <div className="login" style={styles.container}>
            <br/>

            <h1>Signup</h1>

            <form action="POST" >
                <input type="email" onChange={(e) => { setEmail(e.target.value);setEmailError(''); }} placeholder="Email" style={styles.input}/><br/>
                {emailError && <div style={styles.error}>{emailError}</div>}
                <input type="password" onChange={(e) => { setPassword(e.target.value);setPasswordError('');}} placeholder="Password" style={styles.input}/><br/>
                {passwordError && <div style={styles.error}>{passwordError}</div>}
                <input type="submit" onClick={submit} style={styles.button}/>

            </form>

            <br />
            <p>OR</p>
            <br />

            <Link to="/">Login Page</Link>

        </div>
    )
}
const styles = {
    container: {
        textAlign: 'center',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '50vh',
        backgroundColor: 'powderblue',
        marginLeft:'25%',
        marginRight:'25%',
        marginBottom:'20%',
        marrginTop:'25%',
      
    },
    input: {
      width: '40%',
      padding: '10px',
      marginBottom: '10px',
    },
    button: {
      backgroundColor: 'blue',
      color: 'white',
      padding: '10px 20px',
      border: 'none',
      cursor: 'pointer',
    },
    error: {
        color: 'red',
        marginBottom: '10px',
      },
  };

export default Login