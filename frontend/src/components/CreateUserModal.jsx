import { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { Form } from 'react-bootstrap';
import { validatePassword } from '../utils/passwordUtil';
import { FaUserPlus } from 'react-icons/fa';
import PropTypes from 'prop-types';

function CreateUserModal({ 
  show, 
  handleShow, 
  handleClose,
  selectedUser
}) {

  const [errMsg, setErrMsg] = useState('');
  const [errPwd, setErrPwd] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const isUpdateUser = Object.keys(selectedUser).length ? true : false;

  useEffect(() => {
    if (isUpdateUser) {
      setName(selectedUser.name);
      setEmail(selectedUser.email);
    }
  }, [selectedUser])

  /**
   * Hanlde create or update user 
   * @returns an error if any
   */
  const handleSubmit = () => {
    if (errMsg) setErrMsg('');

    // check if all the fields are filled out
    if (!name || !email) return setErrMsg('Make sure all fields are filled.');

    const userObj = { name, email };
    
    // if not updating a user
    if (!isUpdateUser) {
      const validPass = validatePassword(password); // validate password
      if (validPass) return setErrPwd(validPass); // if password error
      userObj['password'] = password; // set password
    } else {
      userObj['_id'] = selectedUser._id;
    }

    handleShow(userObj);
    resetForm();
  }

  /**
   * on modal close
   */
  const onClose = () => {
    resetForm();
    setErrMsg('');
    setErrPwd('');
    handleClose();
  }

  /**
   * Reset form values
   */
  const resetForm = () => {
    setName('');
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
                value={ name }
                onChange={ (e) => setName(e.target.value) }
              />
            </Form.Group>
            <Form.Group className='my-3'>
              <Form.Label>Email:</Form.Label>
              <Form.Control 
                type='email'
                value={ email }
                onChange={ (e) => setEmail(e.target.value) }
              />
            </Form.Group>
            { !isUpdateUser && 
              <Form.Group>
                <Form.Label>Password:</Form.Label>
                <Form.Control
                  type='password'
                  value={ password }
                  onChange={ (e) => setPassword(e.target.value) }
                />
              </Form.Group>
            }
            { ( !isUpdateUser && errPwd ) &&
              (<strong className='text-danger my-2'><small>{ errPwd }</small></strong>)
            }
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

CreateUserModal.propTypes = {
  show: PropTypes.bool, 
  handleShow: PropTypes.func, 
  handleClose: PropTypes.func,
  selectedUser: PropTypes.object
}

export default CreateUserModal;