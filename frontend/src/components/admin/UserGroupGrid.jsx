import React, { useEffect, useState } from "react";
import { useGetUserGroupQuery } from "../../slices/groupApiSlice";
import DataGrid from "../shared/DataGrid/DataGrid";

const UserGroupGrid = ({ user }) => {
  const [selected, setSelected] = useState();
  let { data: userGroups, isLoading } = useGetUserGroupQuery(user._id);

  if (isLoading) {
    <span>Loading user group...</span>;
    return;
  }

  userGroups = userGroups.map((group) => ({ group: group }));

  const groupColumns = [{ label: "Group", value: "group" }];

  return (
    <DataGrid
      data={userGroups}
      columns={groupColumns}
      selectionMode="single"
      selection={selected}
      setSelection={setSelected}
      minWidth="50rem"
      maxHeight="200px"
    />
  );
};

export default UserGroupGrid;
