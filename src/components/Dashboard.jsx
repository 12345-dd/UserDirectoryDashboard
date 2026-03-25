import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

function Dashboard() {
    const [users,setUsers] = useState([])
    const [search,setSearch] = useState("")
    const [sortOrder,setSortOrder] = useState("asc")
    const [sortType, setSortType] = useState("name")

    const navigate = useNavigate();

    useEffect(() => {
        const getUsers = async() => {
            const results = await axios.get("https://jsonplaceholder.typicode.com/users")
            setUsers(results.data)
        }
        getUsers();
    },[])

    const filteredUsers = users.filter((user) => (
        user.name.toLowerCase().includes(search.toLowerCase()) || user.email.toLowerCase().includes(search.toLowerCase())
    ))

    const sortedUsers = [...filteredUsers].sort((a, b) => {
        if (sortType === "name") {
            if (sortOrder === "asc") {
                return a.name.localeCompare(b.name)
            } else {
                return b.name.localeCompare(a.name)
            }
        }

        if (sortType === "company") {
            if (sortOrder === "asc") {
                return a.company.name.localeCompare(b.company.name)
            } else {
                return b.company.name.localeCompare(a.company.name)
            }
        }

        return 0

    })

    const toggleSort = (type) => {
        if (sortType === type) {
            setSortOrder(sortOrder === "asc" ? "desc" : "asc")
        } else {
            setSortType(type)
            setSortOrder("asc")
        }
    }

  return (
    <div style={{padding:"20px"}}>
        <h2>User Directory</h2>

        <input type='text' placeholder='Enter name or E-mail' value={search} onChange={(e) => setSearch(e.target.value)} style={{marginBottom:"10px",padding:"5px",width:"25vh",height:"5vh"}} />

        <div style={{ marginBottom: "10px" }}>

            <button onClick={() => toggleSort("name")} style={{ marginRight: "10px", cursor: "pointer" }}>
                Sort by Name ({sortOrder})
            </button>

            <button onClick={() => toggleSort("company")} style={{cursor: "pointer" }}>
                Sort by Company ({sortOrder})
            </button>

        </div>

        <table border="1" cellPadding="10">
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Phone</th>
                    <th>Company</th>
                </tr>
            </thead>
            <tbody>
                {sortedUsers.map((user) => (
                    <tr key={user.id} onClick={() => navigate(`/user/${user.id}`)}>
                        <td>{user.name}</td>
                        <td>{user.email}</td>
                        <td>{user.phone}</td>
                        <td>{user.company.name}</td>
                    </tr>
                ))}
            </tbody>
        </table>

    </div>
  )
}

export default Dashboard