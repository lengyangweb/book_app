import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { Form } from 'react-bootstrap';
import { validatePassword } from '../utils/passwordUtil';
import { FaUserPlus } from 'react-icons/fa';

function CreateUserModal({ 
  show, 
  handleShow, 
  handleClose,
  selectedUser
}) {

  const [errMsg, setErrMsg] = useState('');
  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passErrMsg, setPassErrMsg] = useState('');

  const isUpdateUser = Object.keys(selectedUser).length ? true : false;

  const handleSubmit = () => {
    if (errMsg) setErrMsg('');

    if (passErrMsg) setPassErrMsg('');

    // check if all the fields are filled out
    if (!username || !name || !email || !password) return setErrMsg('Make sure all fields are filled.');

    // check for a valid password
    const validPass = validatePassword(password);
    if (validPass) return setPassErrMsg(validPass);

    handleShow({ username, name, email, password });
    resetForm();
  }

  const onClose = () => {
    resetForm();
    setErrMsg('');
    setPassErrMsg('');
    handleClose();
  }

  const resetForm = () => {
    setName('');
    setUsername('');
    setEmail('');
    setPassword('');
  }


  return (
    <>
      <Modal show={show} onHide={onClose}>
        <Modal.Header closeButton>
          <Modal.Title>
            <div className="d-flex align-items-center">
              <span>{ isUpdateUser ? 'Update' : 'Create' } User</span>
              <FaUserPlus className='mx-2' />
            </div>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          { errMsg && (<strong className='text-danger'><small>{ errMsg }</small></strong>) }
          <form className='py-3 px-2'>
            <Form.Group>
              <Form.Label>Name:</Form.Label>
              <Form.Control 
                type='text'
                value={ selectedUser.name || name }
                onChange={ (e) => setName(e.target.value) }
              />
            </Form.Group>
            <Form.Group className='my-3'>
              <Form.Label>Username:</Form.Label>
              <Form.Control 
               type='text'
                value={ selectedUser.username || username }
                onChange={ (e) => setUsername(e.target.value) }
              />
            </Form.Group>
            <Form.Group className='my-3'>
              <Form.Label>Email:</Form.Label>
              <Form.Control 
                type='email'
                value={ selectedUser.email || email }
                onChange={ (e) => setEmail(e.target.value) }
              />
            </Form.Group>
            { !isUpdateUser && 
              <Form.Group className='mt-3'>
              <Form.Label>Password:</Form.Label>
              <Form.Control 
                type='password'
                value={ password }
                onChange={ (e) => setPassword(e.target.value) }
              />
            </Form.Group>
            }
            { passErrMsg && (<small className='text-danger'>{ passErrMsg }</small>)}
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={onClose}>
            Close
          </Button>
          <Button variant="primary" onClick={  handleSubmit}>
            { isUpdateUser ? 'Update' : 'Create' } User
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default CreateUserModal;