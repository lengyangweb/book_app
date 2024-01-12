import React, { useState } from "react";
import RoleCombo from "./RoleCombo";
import RoleComboGrid from "./RoleGrid";
import RoleProvider from "../../../hooks/contexts/AdminRoleContext";

const Role = ({ selectedUser }) => {
  const [selectedRole, setSelectedRole] = useState();
  const [delSelectedRole, setDelSelectedRole] = useState();

  return (
    <RoleProvider
      selectedUser={selectedUser}
      selectedRole={selectedRole}
      setSelectedRole={setSelectedRole}
      delSelectedRole={delSelectedRole}
      setDelSelectedRole={setDelSelectedRole}
    >
      <div className="lead bg-dark text-light p-3">Role</div>
      <div className="d-flex flex-column border py-3 px-4">
        <RoleCombo />
        <RoleComboGrid />
      </div>
    </RoleProvider>
  );
};

export default Role;
