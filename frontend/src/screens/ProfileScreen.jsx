import { useState, useEffect } from 'react';
import { Container, Card, Col, Form } from 'react-bootstrap';
import { FaUserAlt } from 'react-icons/fa';
import { setCredentials } from '../slices/authSlice';
import { toast } from 'react-toastify';
import { useUpdateUserProfileMutation } from '../slices/userApiSlice';
import { useSelector, useDispatch } from 'react-redux';

function ProfileScreen() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  const dispatch = useDispatch();
  const [updateUserProfile, { isLoading }] = useUpdateUserProfileMutation();

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
      const res = await updateUserProfile({ name, email }).unwrap();

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
        <Col sm lg={5}>
          <Card>
            <h1 className='bg-dark p-3 text-light'>
              <div className="d-flex align-items-center">
                {/* <div className="d-flex align-items-center border p-4" style={{}}> */}
                  { !userInfo.avatar && <FaUserAlt className='border p-4' style={{ fontSize: '5rem', borderRadius: '100%' }} /> }

                  { userInfo.avatar && <img 
                    src={ userInfo.avatar } 
                    alt="profile picture" 
                    style={ profImgStyle } 
                  /> }
                {/* </div> */}
                <span className='mx-2 mt-2'>User Profile</span>
              </div>
            </h1>
            <form className='px-4 py-2' onSubmit={ submitHandler }>
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

const profImgStyle = {
  borderRadius: '100%',
  width: '60px'
}

export default ProfileScreen