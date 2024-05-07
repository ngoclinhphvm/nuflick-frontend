import React, { useEffect, useState } from 'react';
import accountApi from '../../api/modules/account.api.js';
import Container from "../../components/common/Container.jsx";
const AdminPage = () => {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await accountApi.getAllUsers(); // Replace with your API endpoint
                setUsers(response.data);
            } catch (error) {
                console.error('Failed to fetch users:', error);
            }
        };

        fetchUsers();
    }, []);

return (
    <Container header={"Admin"}>
        
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
                <tr>
                    <th style={{ border: '1px solid black', padding: '10px' }}>Username</th>
                    <th style={{ border: '1px solid black', padding: '10px' }}>Name</th>
                    <th style={{ border: '1px solid black', padding: '10px' }}>Gender</th>
                    <th style={{ border: '1px solid black', padding: '10px' }}>Email</th>
                    
                </tr>
            </thead>
            <tbody>
                {users.map(user => (
                    <tr key={user.id}>
                        <td style={{ border: '1px solid black', padding: '10px' }}>{user.username}</td>
                        <td style={{ border: '1px solid black', padding: '10px' }}>{user.name}</td>
                        <td style={{ border: '1px solid black', padding: '10px' }}>{user.gender}</td>
                        <td style={{ border: '1px solid black', padding: '10px' }}>{user.email}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    </Container>
);
};
export default AdminPage;