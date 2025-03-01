import { useState } from "react";
import { SERVER_URL } from "../constants/constants";
import { useNavigate } from "react-router-dom";
import { search_users } from "../api/endpoints";
import './search.css'

const Search = () => {

    const [search, setSearch] = useState('')
    const [users, setUsers] = useState([])

    const handleSearch = async () => {
        const users = await search_users(search)
        setUsers(users)
    }

    return (
        <div>
            <div className="search_container">
                <h2>Search Users</h2>
                <div className="form-control">
                    <input onChange={(e) => setSearch(e.target.value)} bg='white' />
                    <button onClick={handleSearch} className="btn btn-primary">Search</button>
                </div>
                <div>
                    {
                        users.map((user) => {
                            return <UserProfile username={user.username} profile_image={user.profile_image} first_name={user.first_name} last_name={user.last_name} />
                        })
                    }
                </div>
            </div>
        </div>
    )
}

const UserProfile = ({username, profile_image, first_name, last_name}) => {

    const nav = useNavigate()

    const handleNav = () => {
        nav(`/${username}`)
    }

    return (
        <div onClick={handleNav} className="users-cont">
            <div>
                <div className="usershow-continer">
                    <img src={`${SERVER_URL}${profile_image}`}/>
                    <p>{first_name} {last_name}</p>
                    <p>@{username}</p>
                </div>

            </div>
        </div>
    )
}

export default Search