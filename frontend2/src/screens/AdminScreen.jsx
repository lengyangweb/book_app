import { useEffect, useState } from 'react';
import { useLoaderData } from 'react-router-dom';
import { Col, Row } from 'react-bootstrap';
import GridBox from '../components/shared/Grid/GridBox';
import { toast } from 'react-toastify';
import { FaTrashAlt, FaTools, FaUserPlus } from 'react-icons/fa'
import CreateUserModal from '../components/CreateUserModal';

import { 
    useUpdateUserInfoMutation,
    useUpdatePasswordMutation,
    useRegisterMutation,
    useGetUsersQuery,
    useDeleteUserMutation

} from '../slices/userApiSlice';

const AdminScreen = () => {
    // const userData = useLoaderData();

    const [users, setUsers] = useState([]);
    const [initialUsers, setInitialUsers] = useState([]);
    const [selectedUser, setSelectedUser] = useState({});
    const [show, setShow] = useState(false);
    const [formSubmit, setFormSubmit] = useState(false);
    const [deleteLoading, setDeleteLoading] = useState(false);
    const [updateLoading, setUpdateLoading] = useState(false);
    const [userCount, setUserCount] = useState(0);

    const { data: usersData, isLoading } = useGetUsersQuery();

    // const [updateUser] = useUpdateUserMutation();
    const [updatePassword] = useUpdatePasswordMutation();
    const [register] = useRegisterMutation();
    const [updateUserInfo] = useUpdateUserInfoMutation();
    const [deleteUser] = useDeleteUserMutation();

    const tableHeaders = [
        { label: 'Name', value: 'name' },
        { label: 'Email', value: 'email' },
    ];

    useEffect(() => {
        // if no users has been set
        if (!isLoading && !users.length) {
            setUsers(usersData);
            setInitialUsers(usersData);
            setUserCount(users.length);
        } else {
            setUsers([])
            setInitialUsers([]);
        }
    }, [usersData, isLoading]);

    const onUserDelete = async () => {
        setDeleteLoading(true);

        // send user id to remove
        const res = await deleteUser(selectedUser._id).unwrap();

        if (!res) throw new Error('Unable to delete user');

        if (res.hasOwnProperty('success') && res.success) {
            setDeleteLoading(false); // set deleting flag

            // update users
            const newUsers = users.filter((user) => user._id !== selectedUser._id);
            setUsers([ ...newUsers ]);
            setInitialUsers([ ...newUsers ]);

            // show success dialog
            toast.success(`User ${selectedUser['name']} has been removed.`, {
                position: toast.POSITION.TOP_CENTER
            });

            setSelectedUser({});
        } else {
            toast.error('Unable to remove user.');
        }
        
    }

    const createUser = async (user) => {
        const res = await fetch('https://jsonplaceholder.typicode.com/users', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(user)
        });

        if (!res) throw new Error('Fail to create user.');

        const data = await res.json();

        // if user is updated and have an id
        if (data && data.hasOwnProperty('id')) {

            // set new update users
            const updatedUsers = [ ...users, { id: userCount + 1, ...user } ];
            setUserCount(userCount + 1);

            // update users info
            setUsers(updatedUsers);
            setInitialUsers(updatedUsers);
            toast.success('User has been created.', {
                position: toast.POSITION.TOP_CENTER
            });
        }
    }

    const onUpdateUser = async (user) => {

        setUpdateLoading(true); // set update loading status

        // send update info for update
        const res = await updateUserInfo(user._id, { name: user.name, email: user.email }).unwrap();

        if (res && res.hasOwnProperty('_id')) {

            setUpdateLoading(false); // set update loading status

            console.log(`User has been updated.`, user);

            const updatedUsers = [ ...users ];
            updatedUsers.forEach((u) => {
                if (u._id === user._id) {
                    u.name = user.name;
                    u.email = user.email;
                }
            });

            setUsers(updatedUsers);
            setInitialUsers(updatedUsers);

        }
    }
    
    const handleClose = () => {
        setShow(false);
    };
    
    const handleShow = async (user) => {
        setFormSubmit(true);
        
        if (!Object.keys(selectedUser).length) {
            await createUser(user);
        } else {
            await onUpdateUser(user);
            setSelectedUser({});
        }

        setShow(false); // close modal after user is created
    };

    const onShowUpdate = () => {
        setShow(true); // open user modal
    }

  if (isLoading && !users.length) {
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
                    <button className="btn btn-sm btn-success" onClick={ () => setShow(true) } disabled={ Object.keys(selectedUser).length }>
                        <div className="d-flex flex-column align-items-center justify-content-center px-3">
                            <FaUserPlus />
                            <small>Create</small>
                        </div>
                    </button>
                    <button 
                        className="btn btn-sm btn-warning mx-2"
                        disabled={ !Object.keys(selectedUser).length }
                        onClick={ onShowUpdate }
                    >
                        <div className="d-flex flex-column align-items-center justify-content-center px-3">
                            {
                                !updateLoading ?
                                <>
                                    <FaTools />
                                    <small>Update</small>
                                </>
                                :
                                <>
                                    <span className="spinner-border spinner-border-sm" aria-hidden="true"></span>
                                    <span className="role">Updating</span>
                                </>
                            }
                        </div>
                    </button>
                    <button 
                        className="btn btn-sm btn-danger" 
                        disabled={ !Object.keys(selectedUser).length }
                        onClick={ onUserDelete }
                    >
                        <div className="d-flex flex-column align-items-center justify-content-center px-3 mx-1">
                            {
                                !deleteLoading ? 
                                <>
                                    <FaTrashAlt />
                                    <small>Delete</small>
                                </>
                                :
                                <>
                                    <span className="spinner-border spinner-border-sm" aria-hidden="true"></span>
                                    <span className="role">Deleting</span>
                                </>
                            }
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
                    selectedUser={ selectedUser }
                />
            </Col>
        </Row>
    </div>
  )
}


export default AdminScreen