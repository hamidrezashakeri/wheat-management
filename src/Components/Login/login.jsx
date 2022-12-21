import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { handleLogin } from "../../services/userService";
import { message } from "../../utils/message";
import Preloader from "../Preloader/Preloader";


const Login = () => {
    const pass = useRef();
    const navigate = useNavigate();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);

    const showPassword = ()=>{
     if(pass.current.type === 'password'){
        pass.current.setAttribute('type', 'text');
     }else{
        pass.current.setAttribute('type', 'password');
     }
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        setLoading(true);
        const info = { username, password };
        try {
            const { data, status } = await handleLogin(info);
            if (status === 200) {
                setLoading(false);
                localStorage.setItem("token", data.token);
                navigate('/');
            }
        } catch (error) {
            setLoading(false);
            navigate('/login');
            message("نام کاربری یا کلمه عبور اشتباه است", "error");
            
        }
    }
    return (
        <div className="login">
            {loading ? <Preloader /> : null}
            <div className="login-box">
                <div className="header-login">
                    <h3>سامانه مدیریت یکپارچه گندم آرد مریانج کار</h3>
                    <img src="../img/2.png" alt="لوگو" />
                </div>
                <form onSubmit={event => handleSubmit(event)}>
                    <div className="input-group">
                        <label htmlFor="username">نام کاربری: </label>
                        <input type="text" id="username" onChange={event => setUsername(event.target.value)} />
                    </div>
                    <div className="input-group">
                        <label htmlFor="password"> گذرواژه: </label>
                        <input type="password" ref={pass} onChange={event => setPassword(event.target.value)} />
                        <span className="fa fa-eye" onClick={showPassword}></span>
                    </div>
                    <div className="input-group">
                        <input type="submit" value="ورود" />
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Login;