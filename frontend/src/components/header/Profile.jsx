import React from "react";
import { useDispatch } from "react-redux";
import { FaSignOutAlt } from "react-icons/fa";
import { NavDropdown } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { logout } from "../../slices/authSlice";
import { LinkContainer } from "react-router-bootstrap";
import { useSignOutMutation } from "../../slices/userApiSlice";

const Profile = ({ userInfo }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [signOut, { isLoading }] = useSignOutMutation();

  const logoutUser = async () => {
    try {
      const res = await signOut({}).unwrap();

      // if user logout successfully
      if (res && res.hasOwnProperty("message")) {
        dispatch(logout());
        navigate("/");
      }
    } catch (err) {
      console.error(err || err?.error);
    }
  };

  return (
    <div className="d-flex flex-column flex-lg-row justify-content-center align-items-center">
      <img
        style={profileStyle}
        src={userInfo.avatar ? userInfo.avatar : "./default-user.png"}
        alt=""
      />
      <NavDropdown id="username" align={{ lg: "end" }}>
        {/* <NavDropdown.Item>{userInfo.name}</NavDropdown.Item>
        <NavDropdown.Divider /> */}
        <LinkContainer to="/profile">
          <NavDropdown.Item>Profile</NavDropdown.Item>
        </LinkContainer>
        <LinkContainer to="/change-password">
          <NavDropdown.Item>Change Password</NavDropdown.Item>
        </LinkContainer>
        <NavDropdown.Divider />
        <NavDropdown.Item onClick={logoutUser}>
          <div className="d-flex align-items-center">
            <span>Logout</span>
            <FaSignOutAlt />
          </div>
        </NavDropdown.Item>
      </NavDropdown>
    </div>
  );
};

const profileStyle = {
  border: "2px solid #eeeeee",
  width: "40px",
  height: "40px",
  borderRadius: "50%",
  backgroundColor: "#ffffff",
  // padding: "8px 18px",
};

export default Profile;
