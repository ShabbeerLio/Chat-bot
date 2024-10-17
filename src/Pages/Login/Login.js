import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import "./Login.css"

const Login = (props) => {
    const [credentials, setCredentials] = useState({ number: "", otp: "" })
    const [validation, setValidation] = useState(false)

    const handleSubmit = async (e) => {
        e.preventDefault();
        setValidation(true)
    }

    const onChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value });
    };
    return (
        <div className='Login'>
            <div className="login-box">
                <p>Login</p>
                {validation === false ? (
                    <form onSubmit={handleSubmit}>
                        <div className="user-box">
                            <input type="number" value={credentials.number} onChange={onChange} name="number" id="number" required />
                            <label htmlFor="number" >Number</label>
                        </div>
                        <div id="emailHelp" className="form-text">We never share your informations with anyone else.</div>
                        <button type="submit" className="btn btn-primary">
                            <span></span>
                            <span></span>
                            <span></span>
                            <span></span>
                            Send OTP
                        </button>
                    </form>
                ) : (
                    <form onSubmit={handleSubmit}>
                        <div className="user-box">
                            <input type="number" value={credentials.otp} onChange={onChange} name="otp" id="otp" required />
                            <label htmlFor="otp" >OTP</label>
                        </div>
                        <div id="emailHelp" className="form-text">We never share your informations with anyone else.</div>
                        <button type="submit" className="btn btn-primary">
                            <span></span>
                            <span></span>
                            <span></span>
                            <span></span>
                            <Link to={"/"}>Submit</Link>
                            
                        </button>
                    </form>
                )}
            </div>
        </div>
    )
}

export default Login
