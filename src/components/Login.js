import React, { useEffect, useState } from "react"
import axios from "axios"
import { useNavigate, Link } from "react-router-dom"


function Login() {

    const history=useNavigate();

    const [email,setEmail]=useState('')
    const [password,setPassword]=useState('')

    async function submit(e){
        e.preventDefault();

        try{

            await axios.post("http://localhost:8000/",{
                email,password
            })
            .then(res=>{
                if(res.data=="exist"){
                    history("/home",{state:{id:email}})
                }
                else if(res.data=="notexist"){
                    alert("User have not sign up")
                }
            })
            .catch(e=>{
                alert("wrong details")
                console.log(e);
            })

        }
        catch(e){
            console.log(e);

        }

    }


    return (
        <div className="login"style={styles.container}>
            <br/>

            <h1>Login</h1>

            <form action="POST" >
                <input type="email" onChange={(e) => { setEmail(e.target.value) }} placeholder="Email" style={styles.input} />
                <br/>
                <input type="password" onChange={(e) => { setPassword(e.target.value) }} placeholder="Password"  style={styles.input}/><br/>
            
                <input type="submit" onClick={submit} style={styles.button}/>

            </form>

            <br />
            <p>OR</p>
            <br />

            <Link to="/signup">Signup Page</Link>

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
  };

export default Login