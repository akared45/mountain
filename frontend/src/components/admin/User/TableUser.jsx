import React, { useEffect, useState } from 'react';
import { ListUser } from '../../../services/api';
import ModalChangeRole from './ModalChangeRole';

const TableUser = () => {
    const [users, setUsers] = useState([]);
    const [selectedUser, setSelectedUser] = useState(null);
    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        try {
            const response = await ListUser();
            setUsers(response.data.ListUser);
        } catch (error) {
            console.error('Error fetching users:', error);
        }
    };

    const handleShowModal = (user) => {
        setSelectedUser(user);
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
        setSelectedUser(null);
    };

   
    console.log(selectedUser)
    return (
        <div className="container">
            <h2>User List</h2>
            <table className="table table-striped table-bordered">
                <thead className="table-primary">
                    <tr>
                        <th>ID</th>
                        <th>Username</th>
                        <th>Full Name</th>
                        <th>Email</th>
                        <th>Gender</th>
                        <th>Image</th>
                        <th>Address</th>
                        <th>Date of Birth</th>
                        <th>Role</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map((user, index) => (
                        <tr key={user.id}>
                            <td>{index + 1}</td>
                            <td>{user.username}</td>
                            <td>{user.full_name}</td>
                            <td>{user.email}</td>
                            <td>{user.gender}</td>
                            <td>
                                {user.img ? (
                                    <img src={`http://localhost:8000/storage/images/${user.img}`} alt={user.username} style={{ width: '50px', height: '50px' }} />
                                ) : (
                                    'No Image'
                                )}
                            </td>
                            <td>{user.address}</td>
                            <td>{user.dob}</td>
                            <td>{user.role}</td>
                            <td>
                                <button
                                    className="btn btn-primary"
                                    onClick={() => handleShowModal(user)}
                                >
                                    Change Role
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            {selectedUser && (
                <ModalChangeRole
                    show={showModal}
                    handleClose={handleCloseModal}
                    user={selectedUser}
                    setUsers={setUsers}
                />
            )}
        </div>
    );
};

export default TableUser;
