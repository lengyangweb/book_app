import React, { useState } from 'react'
import Combo from '../shared/Combo/Combo'
import { useSelector } from 'react-redux';
import GridBox from '../shared/Grid/GridBox';
import { Button, Row, Col } from 'react-bootstrap';

const USER_ROLES = [
  { label: 'W_ADMIN', value: 'W_ADMIN' },
  { label: 'W_USER', Value: 'W_USER' }
]

const ROLES = [
  { label: 'W_ADMIN', value: 'W_ADMIN' },
  { label: 'W_USER', value: 'W_USER' }
];

const RoleCombo = () => {
  const group = useSelector(state => state.auth.group);
  
  const roleheaders = [{ label: 'Role', value: 'value' }];
  const [roleSelection, setRoleSelection] = useState(USER_ROLES);
  const [selectedRole, setSelectedRole] = useState({});
  const [selectedDelRole, setSelectedDelRole] = useState({});
  const [roles, setRoles] = useState(ROLES);

  return (
    <>
      <div className="d-flex flex-column">
        <div className="d-flex flex-column">
            <div className="lead">Role:</div>
            <div className="d-flex">
              <Row>
                <Col lg={10}>
                  <Combo 
                    selectedItem={ selectedRole }
                    setSelectedItem={ setSelectedRole }
                    defaultOptionText='Choose a role'
                    selection={ roleSelection }
                  />
                </Col>
                <Col lg={2}>                
                  <div className="d-flex">
                    <Button disabled={ selectedRole } variant='success'>Add</Button>
                    <Button disabled={ selectedDelRole } className='mx-2' variant='danger'>Remove</Button>
                  </div>
                </Col>
              </Row>
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