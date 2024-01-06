import React from "react";
import { Button } from "react-bootstrap";
import { FaTrashAlt } from "react-icons/fa";

const RemoveRoleButton = () => {
  return (
    <Button
      // disabled={!Object.keys(selectedDelRole).length}
      variant="danger"
      // onClick={onRoleRemove}
    >
      <FaTrashAlt />
    </Button>
  );
};

export default RemoveRoleButton;
