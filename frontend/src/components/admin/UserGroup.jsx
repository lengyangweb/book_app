import React, { useState } from "react";
import {
  useGetGroupsQuery,
  useGetUserGroupQuery,
} from "../../slices/groupApiSlice";
import { Dropdown } from "primereact/dropdown";
import { Col, Row } from "react-bootstrap";
import DataGrid from "../shared/DataGrid/DataGrid";

const UserGroup = ({ user }) => {
  const [selected, setSelected] = useState();
  const { data: groups, isLoading } = useGetGroupsQuery();

  if (isLoading) {
    <span>Fetching groups...</span>;
    return;
  }

  return (
    <Dropdown
      className="w-50"
      value={selected}
      onChange={(e) => setSelected(e.value)}
      options={groups}
      optionLabel="name"
      placeholder="Selecte a Group"
    />
  );
};

export default UserGroup;
