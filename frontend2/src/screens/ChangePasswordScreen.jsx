import { useState } from 'react';
import { Container, Card, Col } from 'react-bootstrap';
import { FaKey } from 'react-icons/fa';
import { Form } from 'react-bootstrap';
import { toast } from 'react-toastify';
import { useUpdatePasswordMutation } from '../slices/userApiSlice';
import { validatePassword } from '../utils/passwordUtil';

const ChangePasswordScreen = () => {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const [updatePassword, { isLoading }] = useUpdatePasswordMutation();

  const submitHandler = async (e) => {
    e.preventDefault();

    if (!password || !confirmPassword) {
      return toast.error('Both fields must not be empty.');
    }

    if (password !== confirmPassword) {
      return toast.error('Password mismatch');
    }

    const validPass = validatePassword(password);
    if (validPass) {
      return toast.error(validPass);
    }

    try {
      const res = await updatePassword({ password }).unwrap();

      if (res && res.hasOwnProperty('_id')) {
        toast.success('Password has been updated.');
        setPassword('');
        setConfirmPassword('');
      }

    } catch (err) {
      toast.error(err?.data?.message || err?.error);
    }

  }

  return (
    <Container style={{ width: '100vw', height: '90vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <Col sm lg={5}>
        <Card>
          <h2 className='bg-dark p-4 text-light'>
            <div className="d-flex align-items-center">
              <div className="d-flex justify-content-center align-items-center border p-4" style={{ borderRadius: '100%' }}>
                <FaKey style={{ fontSize: '1.5rem' }} />
              </div>
              <span className='px-3'>Change Password</span>
            </div>
          </h2>
          <Col className='p-2'>
            <h6>Password Rule:</h6>
            <ul>
              <li>Must at least 8 or more characters long</li>
              <li>Must contain one or more special characters</li>
            </ul>
          </Col>
          <hr />
          <form className='px-4 pt-2 pb-4' onSubmit={ submitHandler }>
            <Form.Group controlId="formBasicPassword">
              <Form.Label>Password:</Form.Label>
              <Form.Control
                type="password"
                value={ password }
                onChange={ (e) => setPassword(e.target.value) }
              />
            </Form.Group>
            <Form.Group controlId="formBasicConfirmPassword" className='mt-3'>
              <Form.Label>Confirm Password:</Form.Label>
              <Form.Control
                type="password"
                value={ confirmPassword }
                onChange={ (e) => setConfirmPassword(e.target.value) }
              />
            </Form.Group>
            <div className="d-flex justify-content-center mt-4">
              <button className="btn btn-outline-dark">Update</button>
            </div>
          </form>
        </Card>
      </Col>
    </Container>
  )
}

export default ChangePasswordScreen