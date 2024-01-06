import React from "react";
import { FaPlus } from "react-icons/fa";
import { Button } from "react-bootstrap";
import { useSelectedRole } from "../../../hooks/contexts/AdminRoleContext";

const AddRoleButton = () => {
  const selectedRole = useSelectedRole();

  const handleAddRole = () => {
    console.log(selectedRole);
  };

  return (
    <Button
      disabled={!selectedRole}
      className="mx-1"
      variant="success"
      onClick={handleAddRole}
    >
      <FaPlus />
    </Button>
  );
};

export default AddRoleButton;
