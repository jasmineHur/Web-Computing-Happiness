import React, { useState } from "react";
import {Input} from "reactstrap";
import "../assets/css/LoginAndRegister.css"

// REST API address
const API_URL = "http://131.181.190.87:3000"
// Email regular expression
const EMAIL_RE = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;


export default function Register(){
    // Initialise all data
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    //  check sencondary password
    const [checkPassword, setCheckPassword] = useState();

    const [error, setError] = useState();

    const onKeyPress = (e) => {if(e.key == 'Enter') onSubmitHandler()}
    const onCheckPasswordHandler = (event) => { setCheckPassword(event.currentTarget.value) }

    // For receiving email value 
    const onEmailHandler = (event) => {
        setEmail(event.currentTarget.value);
        if(!(EMAIL_RE.test(event.currentTarget.value))) {
            setError("Email form is incorrect")
        } else {
            setError(null);
        }
    }

    // For receiving password
    const onPasswordHandler = (event) => {
        setPassword(event.currentTarget.value);
    }

    // Giving the token to API
    const onSubmitHandler = (event) => {
        if(!(EMAIL_RE.test(email))) {
            alert("Email form is incorrect")
        } else if (password != checkPassword){
            alert("Check the password again please")
        } else {
            const url = `${API_URL}/user/register`;
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
                if(res.error === true) {
                    alert(res.message)
                } else {
                    window.location.href = "/login";
                }
            })
        }
    }

    return (
        <div className="app">
            <h2>Register</h2>
            <div>
                <Input 
                    id="login-input" 
                    type="text" 
                    placeholder="ID" 
                    name="email"
                    // required="required"
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
                <Input 
                    id="login-input" 
                    type="password" 
                    placeholder="Check Password" 
                    required="required"
                    value = {checkPassword || ''}
                    onChange = {onCheckPasswordHandler}
                    onKeyPress={onKeyPress}
                />
            </div>
            <div>
                <button className="login-button" type="submit" onClick={onSubmitHandler}>Register</button>
            </div>
            <div className="send-link">
                <a href="login">Do you have an account already?</a>
            </div>
        </div>
    );
}

