import { useState, useEffect} from 'react';
import { FaUserAlt } from 'react-icons/fa';
import { Container, Card, Col, Row, Form } from 'react-bootstrap';
import { toast } from 'react-toastify';
import { validatePassword } from '../utils/passwordUtil';
import { useRegisterMutation } from '../slices/userApiSlice';

function RegisterForm() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const [register, { isLoading }] = useRegisterMutation();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name || !email || !password) {
        return toast.error('All fields must not be empty.');
    }

    const validPass = validatePassword(password);
    if (validPass) {
        return toast.error(validPass);
    }

    try {
        const res = await register({ name, email, password }).unwrap();
        if (res && res.hasOwnProperty('_id')) {
            toast.success('User has been created.');
            
            setName('');
            setEmail('');
            setPassword('');
        }
    } catch(err) {
        toast.error(err?.data?.message || err?.error);
    }

  }

  return (
    <Card>
    <h3 className='p-4 bg-dark text-light'>
        <div className="d-flex align-items-center">
            <div className="d-flex justify-content-center align-items-center">
                <FaUserAlt />
            </div>
            <span className='mx-3'>Create User</span>
        </div>
    </h3>
    <form className='px-3 pt-2 pb-4' onSubmit={ handleSubmit }>
        <Form.Group controlId='userBasicName'>
            <Form.Label>Name:</Form.Label>
            <Form.Control
                type="text"
                value={ name }
                onChange={ (e) => setName(e.target.value) }
            />
        </Form.Group>
        <Form.Group controlId='userBasicEmail' className='mt-3'>
            <Form.Label>Email:</Form.Label>
            <Form.Control
                type="email"
                value={ email }
                onChange={ (e) => setEmail(e.target.value) }
            />
        </Form.Group>
        <Form.Group controlId='userBasicPassword' className='mt-3'>
            <Form.Label>Password:</Form.Label>
            <Form.Control
                type="password"
                value={ password }
                onChange={ (e) => setPassword(e.target.value) }
            />
        </Form.Group>
        <div className="d-flex justify-content-center mt-4">
            <button className="btn btn-outline-dark">Create</button>
        </div>
    </form>
</Card>
  )
}

export default RegisterForm