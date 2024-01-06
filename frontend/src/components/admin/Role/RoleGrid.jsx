import React from "react";
import GridBox from "../../shared/Grid/GridBox";

const RoleComboGrid = () => {
  const roleheaders = [{ label: "Role", value: "value" }];

  return (
    <div className="my-3">
      <GridBox
        headers={roleheaders}
        items={roles}
        setItem={setRoleSelection}
        initialItems={roles}
        selectedItem={selectedDelRole}
        setSelectedItem={setSelectedDelRole}
        maxHeight="150px"
      />
    </div>
  );
};

export default RoleComboGrid;
