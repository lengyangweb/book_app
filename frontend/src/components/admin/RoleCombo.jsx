import React, { useEffect, useState } from 'react'
import Combo from '../shared/Combo/Combo'
import { useSelector } from 'react-redux';
import GridBox from '../shared/Grid/GridBox';
import { Button, Row, Col } from 'react-bootstrap';
import { FaTrashAlt, FaPlus } from 'react-icons/fa';

const USER_ROLES = [
  { label: 'W_ADMIN', value: 'W_ADMIN' },
  { label: 'W_USER', Value: 'W_USER' }
]

const ROLES = [
  { label: 'W_ADMIN', value: 'W_ADMIN' },
  { label: 'W_USER', value: 'W_USER' }
];

const RoleCombo = () => {
  const roleheaders = [{ label: 'Role', value: 'value' }];
  const [roleSelection, setRoleSelection] = useState(USER_ROLES);
  const [selectedRole, setSelectedRole] = useState({});
  const [selectedDelRole, setSelectedDelRole] = useState({});
  const [roles, setRoles] = useState(ROLES);

  return (
    <>
      <div className="lead bg-dark text-light p-3">Role</div>
      <div className="d-flex flex-column border py-3 px-4">
        <div className="d-flex flex-column">
            <div className="d-flex">
                  <Combo
                    selectedItem={ selectedRole }
                    setSelectedItem={ setSelectedRole }
                    defaultOptionText='Choose a role'
                    selection={ roleSelection }
                  />               
                    <Button size='sm' disabled={ selectedRole } className='mx-1' variant='success'>
                      <FaPlus />
                    </Button>
                    <Button size='sm' disabled={ selectedDelRole } variant='danger'>
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
            setSelectedItem= { setSelectedRole }
          />
        </div>
      </div>
    </>
  )
}

export default RoleCombo