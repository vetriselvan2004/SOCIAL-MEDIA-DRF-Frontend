import { useState } from "react";
import { update_user, logout } from "../api/endpoints";
import './settings.css'
import { useNavigate } from "react-router-dom";

const Settings = () => {

    const storage = JSON.parse(localStorage.getItem('userData'))

    const [username, setUsername] = useState(storage ? storage.username : '')
    const [email, setEmail] = useState(storage ? storage.email : '')
    const [firstName, setFirstName] = useState(storage ? storage.first_name : '')
    const [lastName, setLastName] = useState(storage ? storage.last_name : '')
    const [bio, setBio] = useState(storage ? storage.bio : '')
    const [profileImage, setProfileImage] = useState(storage ? storage.profile_image : '')

    const nav = useNavigate();

    const handleLogout = async () => {
        try {
            await logout();
            nav('/login')
        } catch {
            alert ('error logging out')
        }
    }

    const handleUpdate = async () => {
        try {
            await update_user({"username":username, "profile_image": profileImage, "email":email, "first_name":firstName, "last_name":lastName, "bio":bio})
            localStorage.setItem("userData", JSON.stringify({"username":username, "email":email, "first_name":firstName, "last_name":lastName, "bio":bio}))
            alert('successfully updated')
        } catch {
            alert('error updating details')
        }
    }

    return (
        <>
         <div class="container">
        <form class="settings-form">
            <div class="form-group">
                <label for="profile-pic">Profile Picture</label>
                <input onChange={(e) => setProfileImage(e.target.files[0])}  type='file' />
                {/* <input onChange={(e) => setProfileImage(e.target.files[0])} bg='white' type='file'  id="profile-pic"/> */}
            </div>

            <div class="form-group">
                <label for="username">Username</label>
                <input onChange={(e) => setUsername(e.target.value)} value={username} bg='white' type='text' id="username" placeholder="Enter username"/>
            </div>

            <div class="form-group">
                <label for="email">Email</label>
                <input onChange={(e) => setEmail(e.target.value)} value={email} bg='white' type='email'/>
            </div>

            <div class="form-group">
                <label for="first-name">First Name</label>
                <input onChange={(e) => setFirstName(e.target.value)} value={firstName} bg='white' type='text' />
            </div>

            <div class="form-group">
                <label for="last-name">Last Name</label>
                <input onChange={(e) => setLastName(e.target.value)} value={lastName} bg='white' type='text' />
            </div>

            <div class="form-group">
                <label for="bio">Bio</label>
                <input id="bio" onChange={(e) => setBio(e.target.value)} value={bio} bg='white' type='text' />
            </div>

            <button onClick={handleUpdate} class="submit-btn">Save changes</button>
            <button onClick={handleLogout} className="logout-btn">Logout</button>

        </form>
    </div>
        </>
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        // <div>
        //     <div className="set-cont">
        //         <h2>Settings</h2>
        //         <div className="inp-cont">
        //             <form>
        //                 <label>Profile Picture</label>

        //             </form>
        //             <form>
        //                 <label>Username</label>
        //                 <input onChange={(e) => setUsername(e.target.value)} value={username} bg='white' type='text' />
        //             </form>
        //             <form>
        //             <label>Email</label>
        //                 <input onChange={(e) => setEmail(e.target.value)} value={email} bg='white' type='email' />
        //             </form>
        //             <form>
        //                 <label>First Name</label>
        //                 <input onChange={(e) => setFirstName(e.target.value)} value={firstName} bg='white' type='text' />
        //             </form>
        //             <form>
        //                 <label>Last Name</label>
        //                 <input onChange={(e) => setLastName(e.target.value)} value={lastName} bg='white' type='text' />
        //             </form>
        //             <form>
        //                 <label>Bio</label>
        //                 
        //             </form>
        //             <button onClick={handleUpdate} w='100%' colorScheme="blue" mt='10px'>Save changes</button>
        //         </div>






        //     </div>
        // </div>
    )
}

export default Settings