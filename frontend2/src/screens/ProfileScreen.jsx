import { useState, useEffect } from 'react';
import { Container, Card, Col, Form } from 'react-bootstrap';
import { FaUserAlt } from 'react-icons/fa';
import { setCredentials } from '../slices/authSlice';
import { toast } from 'react-toastify';
import { useUpdateUserMutation } from '../slices/userApiSlice';
import { useSelector, useDispatch } from 'react-redux';

function ProfileScreen() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  const dispatch = useDispatch();
  const [updateUser, { isLoading }] = useUpdateUserMutation();

  const { userInfo } = useSelector((state) => state.auth);

  useEffect(() => {
    if (userInfo) {
      setName(userInfo.name);
      setEmail(userInfo.email);
    }
  }, [])

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      const res = await updateUser({ name, email }).unwrap();

      if (res && res.hasOwnProperty('_id')) {
        dispatch(setCredentials({ ...res }));
        toast.success('User info update successfully.');
      }
    } catch (err) {
      toast.error(err?.data?.message || err?.error);
    }
  }

  return (
    <Container style={{ width: '100vw', height: '90vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      {/* <div className="d-flex justify-content-center mt-4"> */}
        <Col sm lg={4}>
          <Card>
            <h1 className='bg-dark p-3 text-light'>
              <div className="d-flex align-item-center">
                <div className="d-flex align-items-center border p-4" style={{ borderRadius: '100%' }}>
                  <FaUserAlt style={{ fontSize: '1.4rem' }} />
                </div>
                <span className='mx-2 mt-2'>User Profile</span>
              </div>
            </h1>
            <form className='px-3 py-2' onSubmit={ submitHandler }>
              <Form.Group controlId='formBasicName'>
                <Form.Label>Name:</Form.Label>
                <Form.Control 
                  type="text" 
                  value={ name }
                  onChange={ (e) => setName(e.target.value) }
                />
              </Form.Group>
              <Form.Group controlId='formBasicEmail' className='mt-3'>
                <Form.Label>Email:</Form.Label>
                <Form.Control 
                  type="email" 
                  value={ email }
                  onChange={ (e) => setEmail(e.target.value) }
                />
              </Form.Group>
              <div className="d-flex justify-content-center py-4">
                <button className="btn btn-outline-dark">Update</button>
              </div>
            </form>
          </Card>
        </Col>
      {/* </div> */}
    </Container>
  )
}

export default ProfileScreen