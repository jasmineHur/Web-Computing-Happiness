import React, { useState } from "react";
import {Input} from "reactstrap";
import "../assets/css/LoginAndRegister.css";

// REST API address
const API_URL = "http://131.181.190.87:3000"
// Email regular expression
const EMAIL_RE = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;


export default function Login(){
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [error, setError] = useState();
    const [isOpen, setIsOpen] = useState([false, ""]);
    const onKeyPress = (e) => { if(e.key == 'Enter') onSubmitHandler()}
    // Catch the email form error
    const onEmailHandler = (event) => {
        setEmail(event.currentTarget.value);
        if(!(EMAIL_RE.test(event.currentTarget.value))) {
            setError("Email form is incorrect")
        } else {
            setError(null);
        }
    }

    // Setting password
    const onPasswordHandler = (event) => { setPassword(event.currentTarget.value) }
    
    // Giving the token to API
    const onSubmitHandler = (event) => {
        
        setIsOpen([
            true, "test"
        ])
        const url = `${API_URL}/user/login`;
        const token = localStorage.getItem("token");
        const headers = {
            accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        }
        return fetch(url, {
            method: "POST",
            headers,
            body: JSON.stringify({email: email, password: password})
        })
        .then((res) => res.json())
        .then((res) => {
            localStorage.setItem("token", res.token)
            if(res.token == null || res.token  == undefined || res.token  == 'undefined') {
                alert(res.message)
            } else {
                window.location.href = '/'
            }
        })
    }

    return (
        <div className="app">
            <h2>Log in</h2>
            <div>
                <Input 
                    id="login-input" 
                    type="email" 
                    placeholder="ID" 
                    name="email"
                    required="required"
                    value = {email || ''}
                    onChange = {onEmailHandler}
                    onKeyPress={onKeyPress}
                />
                {error != null ? <p>Error:{error}</p> : null} 
            </div>
            <div>
                <Input 
                    id="login-input" 
                    type="password" 
                    placeholder="Password" 
                    required="required"
                    value = {password || ''}
                    onChange = {onPasswordHandler}
                    onKeyPress={onKeyPress}
                />
            </div>
            <div>
                <button className="login-button" type="submit" vlaue={isOpen} onClick={onSubmitHandler}>Log on</button>

                {/* <Modal value={isOpen}/> */}
                {/* <Modal2 /> */}
            </div>
            <div className="send-link">
                <a href="register">Register Account</a>
            </div>
        </div>
    );
}

