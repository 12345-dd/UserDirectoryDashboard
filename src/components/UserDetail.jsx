import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

function UserDetail() {
    const {id} = useParams();
    const navigate = useNavigate();

    const [user,setUser] = useState(null);

    useEffect(() => {
        const getUser = async() => {
            const result = await axios.get(`https://jsonplaceholder.typicode.com/users/${id}`)
            console.log(result.data)
            setUser(result.data)
        }
        getUser()
    },[id])

    if (!user) {
        return <div style={{padding:"20px"}}>Loading user details...</div>;
    }

  return (
    <div style={{padding:"20px"}}>
        <button onClick={() => navigate(-1)}>Back</button>

        <h2>{user.name}</h2>

        <p>Email: {user.email}</p>
        <p>Phone: {user.phone}</p>
        <p>Username: {user.username}</p>

        <h3>Addresses</h3>
        <p>{user.address.street},{user.address.city}</p>

        <h3>Company</h3>
        <p>{user.company.name}</p>
        <p>{user.company.catchPhrase}</p>

    </div>
  )
}

export default UserDetail