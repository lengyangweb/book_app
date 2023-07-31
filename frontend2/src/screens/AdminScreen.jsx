import { useState, useEffect} from 'react';
import { useLoaderData } from 'react-router-dom';
import { Col, Row } from 'react-bootstrap';
import RegisterForm from '../components/RegisterForm';
import GridBox from '../components/shared/Grid/GridBox';
import { toast } from 'react-toastify';
import { FaTrashAlt, FaTools, FaUserPlus } from 'react-icons/fa'
import CreateUserModal from '../components/CreateUserModal';

const AdminScreen = () => {
    const userData = useLoaderData();

    const [users, setUsers] = useState(userData);
    const [initialUsers, setInitialUsers] = useState(userData);
    const [selectedUser, setSelectedUser] = useState({});
    const [formSubmit, setFormSubmit] = useState(false);
    const [show, setShow] = useState(false);
    const [newUser, setNewUser] = useState({});

    const tableHeaders = [
        { label: 'ID', value: 'id' },
        { label: 'Username', value: 'username' },
        { label: 'Name', value: 'name' },
        { label: 'Email', value: 'email' },
    ];

    const deleteUser = async () => {
        console.log(selectedUser);
        const res = await fetch(`https://jsonplaceholder.typicode.com/users/${selectedUser.id}`, {
            method: 'DELETE',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        });

        if (!res) throw new Error('Unable to delete user');

        const data = await res.json();

        if (!Object.keys(data).length) {
            const newUsers = users.filter((user) => user.id !== selectedUser.id);
            setUsers([ ...newUsers ]);
            setInitialUsers([ ...newUsers ]);
            setSelectedUser({});
        } else {
            toast.error('Unable to remove user.');
        }
    }

    const handleClose = () => {
        setShow(false)
    };

    const handleShow = (user) => {
        console.log(user);

        setShow(true)
    };

    const onShowUpdate = () => {
        console.log(selectedUser);
        setShow();
    }

  if (!users) {
    return (
        <div className="d-flex justify-content-centers">
            <span className="spinner-border"></span>
        </div>
    )
  }

  return (
    <div className='p-4'>
        <Row>
            <Col>
                <div className="d-flex justify-content-end align-items-center">
                    <button className="btn btn-success" onClick={ () => setShow(true) }>
                        <div className="d-flex flex-column align-items-center justify-content-center px-3">
                            <FaUserPlus />
                            <small>Create</small>
                        </div>
                    </button>
                    <button 
                        className="btn btn-warning mx-2"
                        disabled={ !Object.keys(selectedUser).length }
                        onClick={ onShowUpdate }
                    >
                        <div className="d-flex flex-column align-items-center justify-content-center px-3">
                            <FaTools />
                            <small>Update</small>
                        </div>
                    </button>
                    <button 
                        className="btn btn-danger" 
                        disabled={ !Object.keys(selectedUser).length }
                        onClick={ deleteUser }
                    >
                        <div className="d-flex flex-column align-items-center justify-content-center px-3 mx-1">
                            <FaTrashAlt />
                            <small>Delete</small>
                        </div>
                    </button>
                </div>
            </Col>
            <Col lg={12} className='py-4'>
                <GridBox 
                    headers={ tableHeaders } 
                    items={ users } 
                    initialItems = { initialUsers }
                    setItem={ setUsers }
                    setSelectedItem={ setSelectedUser }
                    formSubmit={ formSubmit }
                />
            </Col>
            <Col lg={12}>
                <CreateUserModal 
                    show={ show }
                    handleShow={ handleShow }
                    handleClose={ handleClose }
                />
            </Col>
        </Row>
    </div>
  )
}


export default AdminScreen