import { register } from "../api/endpoints";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import './register.css'

const Register = () => {

    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const navigate = useNavigate();

    const handleRegister = async () => {
        if (password === confirmPassword) {
            try {
                await register(username, email, firstName, lastName, password);
                alert('successful registration')
                navigate('/login')
            } catch {
                alert('error registering')
            }
            
        } else {
            alert('password and confirm password are not identical')
        }
    }

    const handleNav = () => {
        navigate('/login')
    }

    return (
        <div>
            <div className="register-cont">
                <div className="register_card">
                <h1 className="register_title">Register</h1>
                <form>
                    <label htmlFor='username'>Username</label>
                    <input onChange={(e) => setUsername(e.target.value)} bg='white' type='text' />
                </form>
                <form>
                    <label htmlFor='username'>Email</label>
                    <input onChange={(e) => setEmail(e.target.value)} bg='white' type='email' />
                </form>
                <form>
                    <label htmlFor='username'>First Name</label>
                    <input onChange={(e) => setFirstName(e.target.value)} bg='white' type='text' />
                </form>
                <form>
                    <label htmlFor='username'>Last Name</label>
                    <input onChange={(e) => setLastName(e.target.value)} bg='white' type='text' />
                </form>
                <form>
                    <label htmlFor='password'>Password</label>
                    <input onChange={(e) => setPassword(e.target.value)} bg='white' type='password' />
                </form>
                <form>
                    <label htmlFor='password'>Confirm Password</label>
                    <input  onChange={(e) => setConfirmPassword(e.target.value)} bg='white' type='password' />
                </form>
                <div>
                    <button onClick={handleRegister} className="register-btn">Register</button>
                    <h6 onClick={handleNav} >Already have an account? Log in</h6>
                </div>

                </div>
            </div>
        </div>
    )
}

export default Register;