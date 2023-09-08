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
    const [selectedUser, setSelectedUser] = useState({});
    const [gridItems, setGridItems] = useState([]);
    const [initialGridItems, setInitialGridItem] = useState([]);

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
        if (!isLoading && !gridItems.length) {
            const items = usersData.map(({ _id, name, email }) => ({ _id, name, email }));
            setGridItems(items);
            setInitialGridItem(items);
            setUserCount(users.length);
        } else {
            setGridItems([]);
            setInitialGridItem([]);
            setSelectedUser({});
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
            setGridItems([ ...newUsers ]);
            setInitialGridItem([ ...newUsers ]);

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
            setGridItems(updatedUsers);
            setInitialGridItem(updatedUsers);

            toast.success('User has been created.', {
                position: toast.POSITION.TOP_CENTER
            });
        }
    }

    const onUpdateUser = async (user) => {
        
        setUpdateLoading(true); // set update loading status

        // send update info for update
        const res = await updateUserInfo(user).unwrap();

        if (res && res.hasOwnProperty('success') && res.success) {

            setUpdateLoading(false); // set update loading status

            const updatedGridItems = [ ...gridItems ];
            updatedGridItems.forEach((u) => {
                if (u._id === user._id) {
                    u.name = user.name;
                    u.email = user.email;
                }
            });

            setGridItems(updatedGridItems);
            setInitialGridItem(updatedGridItems);
            setSelectedUser({});

        }

        return res.success;
    }
    
    const handleClose = () => {
        setShow(false);
    };
    
    const handleShow = async (user) => {
        setFormSubmit(true);
        
        if (!Object.keys(selectedUser).length) { // check if created new user
            await createUser(user);
        } else { // updating an existing user
            const userUpdated = await onUpdateUser(user);
            userUpdated 
            ? toast.success('User info has been updated.') 
            : toast.error('Update user fail.');
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
                    items={ gridItems } 
                    initialItems = { initialGridItems }
                    setItem={ setUsers }
                    selectedItem={ selectedUser }
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