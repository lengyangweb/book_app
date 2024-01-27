import React from "react";
import DataGrid from "../shared/DataGrid/DataGrid";

const UserGrid = ({ users, selectedUser, setSelectedUser }) => {
  const tableHeaders = [
    { label: "Name", value: "name" },
    { label: "Username", value: "username" },
    // { label: "Email", value: "email" },
    // { label: "Phone", value: "phone" },
    { label: "Active", value: "isActive" },
    { label: "Last Login", value: "lastLoginDate" },
  ];

  return (
    <DataGrid
      data={users}
      columns={tableHeaders}
      selectionMode="single"
      selection={selectedUser}
      setSelection={setSelectedUser}
      minWidth="50rem"
      maxHeight="400px"
    />
  );
};

export default UserGrid;
