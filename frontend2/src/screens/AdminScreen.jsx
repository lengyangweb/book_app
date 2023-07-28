import { useState, useEffect} from 'react';
import { Col, Row } from 'react-bootstrap';
import RegisterForm from '../components/RegisterForm';
import GridBox from '../components/shared/Grid/GridBox';

const AdminScreen = () => {
    const [users, setUsers] = useState([]);
    const [initialUsers, setInitialUsers] = useState([]);

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
            setUsers([ ...data ]);
            setInitialUsers([ ...data ]);
        }

        getUsers();
    }, []);

  return (
    <div className='p-4'>
        <Col lg={12} className='py-4'>
            <GridBox 
                headers={ tableHeaders } 
                items={ users } 
                initialItems = { initialUsers }
                setItem={ setUsers }
            />
        </Col>
        
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

export default AdminScreen