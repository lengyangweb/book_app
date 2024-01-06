import AddRoleButton from "./AddRoleButton";
import Combo from "../../shared/Combo/Combo";
import RemoveRoleButton from "./RemoveRoleButton";
import React, { useEffect, useState } from "react";
import { useGetGroupsQuery } from "../../../slices/groupApiSlice";
import {
  useSelectedRole,
  useSetSelectedRole,
} from "../../../hooks/contexts/AdminRoleContext";

const RoleCombo = () => {
  const [roles, setRoles] = useState([]);
  const selectedRole = useSelectedRole();
  const setSelectedRole = useSetSelectedRole();

  // query all groups
  const { data: groups, error } = useGetGroupsQuery();

  useEffect(() => {
    // set roles if groups is not empty
    if (groups && groups.length && !error) setRoles(groups);
  }, [groups]);

  if (!groups) return <h5>No groups selections.</h5>;

  return (
    <div className="d-flex flex-column">
      <div className="d-flex">
        <Combo
          selectedItem={selectedRole}
          setSelectedItem={setSelectedRole}
          defaultOptionText="Choose a role..."
          selection={roles}
        />
        <AddRoleButton />
        <RemoveRoleButton />
      </div>
    </div>
  );
};

export default RoleCombo;
