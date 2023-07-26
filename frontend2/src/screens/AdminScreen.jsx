import { useState, useEffect} from 'react';
import { Container, Card, Col, Row, Form } from 'react-bootstrap';
import RegisterForm from '../components/RegisterForm';
import GridBox from '../components/shared/Grid/GridBox';
import { useGetUsersQuery } from '../slices/userApiSlice';

const AdminScreen = () => {
    const [users, setUsers] = useState([]);
    const tableHeaders = [
        { label: 'ID', value: 'id' },
        { label: 'Username', value: 'username' },
        { label: 'Name', value: 'name' },
        { label: 'Email', value: 'email' },
    ];

    useEffect(() => {
        const getUsers = async (reqData) => {
            const res = await fetch('https://jsonplaceholder.typicode.com/users', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(reqData)
            });

            const data = await res.json();
            setUsers(data);
        }

        getUsers();
    }, []);

  return (
    <div className='p-4'>
        <Row>
            <Col sm md={12} lg={12}>
                {/* <h1>User</h1>
                <hr /> */}
                <Row>
                    <Col md={12} lg={4} className='py-2'>
                        <RegisterForm />
                    </Col>
                    <Col md={12} lg={8} className='py-2'>
                        <GridBox 
                            headers={ tableHeaders } 
                            items={ users } 
                        />
                    </Col>
                </Row>
            </Col>
            <Col md={12} lg={12}></Col>
        </Row>
    </div>
  )
}

export default AdminScreen