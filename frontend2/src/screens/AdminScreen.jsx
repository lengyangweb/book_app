import { useState, useEffect} from 'react';
import { useLoaderData } from 'react-router-dom';
import { Col, Row } from 'react-bootstrap';
import RegisterForm from '../components/RegisterForm';
import GridBox from '../components/shared/Grid/GridBox';
import { toast } from 'react-toastify';
import { FaTrashAlt } from 'react-icons/fa'

const AdminScreen = () => {
    const userData = useLoaderData();

    const [users, setUsers] = useState(userData);
    const [initialUsers, setInitialUsers] = useState(userData);
    const [selectedUser, setSelectedUser] = useState({});
    const [formSubmit, setFormSubmit] = useState(false);

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
                <div className="d-flex justify-content-end">
                    <button 
                        className="btn btn-danger" 
                        disabled={ !Object.keys(selectedUser).length }
                        onClick={ deleteUser }
                    >
                        <div className="d-flex flex-column align-items-center justify-content-center">
                            <span>Delete</span>
                            <FaTrashAlt />
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
        </Row>
        
        {/* <Row>
            <Col md={12} lg={12}>
                <Row>
                    <Col md={12} lg={4} className='py-2'>
                        <RegisterForm />
                    </Col>
                    <Col md={12} lg={8} className='py-2'>
                        <GridBox 
                            headers={ tableHeaders } 
                            items={ items } 
                            setItem={ setItem }
                        />
                    </Col>
                </Row>
            </Col>
            <Col md={12} lg={12}></Col>
        </Row> */}
    </div>
  )
}

const deleteUser = async (id) => {
    
}

export default AdminScreen