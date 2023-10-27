import React, { useEffect, useState } from 'react'
import Combo from '../shared/Combo/Combo'
import { useSelector } from 'react-redux';
import GridBox from '../shared/Grid/GridBox';
import { Button, Row, Col } from 'react-bootstrap';
import { FaTrashAlt, FaPlus } from 'react-icons/fa';
import { toast } from 'react-toastify';
import PropTypes from 'prop-types';
import { useAddGroupMutation, useRemoveGroupMutation } from '../../slices/userApiSlice';

const USER_ROLES = [
  { label: 'W_ADMIN', value: 'W_ADMIN' },
  { label: 'W_USER', Value: 'W_USER' },
  { label: 'W_UPLOAD', value: 'W_UPLOAD' },
  { label: 'W_LOOKUP', value: 'W_LOOKUP' },
  { label: 'W_RERORT', value: 'W_REPORT' },
  { label: 'W_EMPLOYEE', value: 'W_EMPLOYEE' }
]

const ROLES = [
  { label: 'W_ADMIN', value: 'W_ADMIN' },
  { label: 'W_USER', value: 'W_USER' }
];

const RoleCombo = ({ selectedUser }) => {
  const roleheaders = [{ label: 'Role', value: 'value' }];
  const [roleSelection, setRoleSelection] = useState(USER_ROLES);
  const [selectedRole, setSelectedRole] = useState({});
  const [selectedDelRole, setSelectedDelRole] = useState({});
  const [roles, setRoles] = useState(ROLES);

  useEffect(() => {
    console.log(selectedUser)
    // const structuredGroup = selectedUser.group.map((group) => ({ label: group, value: group }));
    // console.log(structuredGroup)
    // setRoles([ ...structuredGroup ]);
  }, [selectedUser])

  const [addGroup] = useAddGroupMutation();
  const [removeGroup] = useRemoveGroupMutation();

  const onRoleAdd = async () => {

    const group = selectedRole.map(({ value }) => (value));

    // remove user from backend first
    const response = await addGroup(selectedUser._id, group).unwrap();

    if (!response) throw new Error(`Fail trying to add new group to user.`);

    // remove role from selection role
    setRoleSelection([ ...roleSelection.filter(({ label, value }) => selectedRole.value !== value) ]);

    // added role to roles
    const updatedRoles = [ ...roles, selectedRole ];
    setRoles(updatedRoles);

    // show dialog message
    toast.success(`Role ${selectedRole.value} has been added`);

    // un select new role
    setSelectedRole({});

  }

  const onRoleRemove = async () => {

    const group = selectedDelRole.map(({ value }) => (value));

    // remove user from backend first
    const response = await removeGroup(selectedUser._id, group).unwrap();

    if (!response) throw new Error(`Fail trying to remove group from user.`);
    
    // create temp arr
    const tempRoleArr = roles.filter(({ value }) => selectedDelRole['value'] !== value);
    // update roles
    setRoles(tempRoleArr);

    // show success message
    toast.success(`Role ${selectedDelRole['value']} has been removed.`);

    // unset role to be deleted
    setSelectedDelRole({});
  }

  return (
    <>
      <div className="lead bg-dark text-light p-3">Role</div>
      <div className="d-flex flex-column border py-3 px-4">
        <div className="d-flex flex-column">
            <div className="d-flex">
                  <Combo
                    selectedItem={ selectedRole }
                    setSelectedItem={ setSelectedRole }
                    defaultOptionText='Choose a role...'
                    selection={ roleSelection }
                  />               
                    <Button 
                      disabled={ !Object.keys(selectedRole).length } 
                      className='mx-1' variant='success'
                      onClick={ onRoleAdd }
                    >
                      <FaPlus />
                    </Button>
                    <Button 
                      disabled={ !Object.keys(selectedDelRole).length } 
                      variant='danger'
                      onClick={ onRoleRemove }
                    >
                      <FaTrashAlt />
                    </Button>
            </div>
        </div>
        {/* role grid */}
        <div className="my-3">
          <GridBox
            headers={ roleheaders }
            items={ roles }
            setItem={ setRoleSelection }
            initialItems={ roles }
            selectedItem={ selectedDelRole }
            setSelectedItem= { setSelectedDelRole }
            maxHeight='150px'
          />
        </div>
      </div>
    </>
  )
}

RoleCombo.propTypes = {
  selectedUser: PropTypes.object
}

export default RoleCombo