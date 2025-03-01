import { useState } from "react";
import './login.css'
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/useAuth";

const Login = () => {

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const navigate = useNavigate();
    const { auth_login } = useAuth();

    const handleLogin = () => {
        auth_login(username, password)
    }

    const handleNav = () => {
        navigate('/register')
    }

    return (
        <div>
            <div className="login-cont">
                <div className="login_card">
                <h1 className="login_title">Login</h1>
                <form>
                    <label htmlFor='username'>Username</label>
                    <input onChange={(e) => setUsername(e.target.value)} bg='white' type='text' />
                </form>
                <form>
                    <label htmlFor='password'>Password</label>
                    <input onChange={(e) => setPassword(e.target.value)} bg='white' type='password' />
                </form>
                <div>
                    <button onClick={handleLogin}  className="login-btn">Login</button>
                    <h6 onClick={handleNav}  >Don't have an account? Sign up</h6>
                </div>
                </div>
            </div>
        </div>
    )
}

export default Login;