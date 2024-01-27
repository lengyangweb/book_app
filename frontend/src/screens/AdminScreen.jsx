import { useState } from "react";
import { toast } from "react-toastify";
import { Col, Row } from "react-bootstrap";
import UserForm from "../components/admin/UserForm";
import UserGrid from "../components/admin/UserGrid";
import UserButtons from "../components/admin/UserButtons";
import { useGetUsersQuery } from "../slices/userApiSlice";
import UserGroup from "../components/admin/UserGroup";
import UserGroupGrid from "../components/admin/UserGroupGrid";

const AdminScreen = () => {
  const [selectedUser, setSelectedUser] = useState({});
  const { data: usersData, isLoading } = useGetUsersQuery();

  if (isLoading) {
    return (
      <div className="d-flex justify-content-center align-items-center mt-4">
        <span className="spinner-border"></span>
      </div>
    );
  }

  return (
    <div className="m-2">
      <h3>User Information:</h3>
      <hr />
      <Row>
        <Col lg={4}>
          <UserForm user={selectedUser} />
        </Col>
        <Col lg={8}>
          <UserGrid
            users={usersData}
            selectedUser={selectedUser}
            setSelectedUser={setSelectedUser}
          />
          {(selectedUser && Object.keys(selectedUser).length) > 0 && (
            <UserButtons user={selectedUser} />
          )}
        </Col>
      </Row>
      <hr />
      <h3>User Access:</h3>
      {Object.keys(selectedUser).length > 0 && (
        <Row>
          <Col lg={6}>
            <Row>
              <Col lg={12}>
                <UserGroup user={selectedUser} />
              </Col>
              <Col className="mt-3" lg={6}>
                <UserGroupGrid user={selectedUser} />
              </Col>
            </Row>
          </Col>
          <Col lg={6}></Col>
        </Row>
      )}
    </div>
  );
};

export default AdminScreen;
