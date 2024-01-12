import React from "react";
import { Nav, NavDropdown } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";

const Menus = ({ userInfo }) => {
  const menus = [
    {
      title: "Additionals",
      enabled: true,
      childrens: [
        {
          title: "Message Center",
          path: "/message-center",
        },
        {
          title: "Feedback",
          path: "/feedback",
        },
      ],
    },
    {
      title: "Admin",
      enabled: userInfo.group.includes("W_ADMIN"),
      childrens: [
        {
          title: "Create/View User",
          path: "/view",
        },
      ],
    },
  ];

  return (
    <>
      {menus.map((menu) => (
        <div key={menu.title}>
          {menu.enabled && (
            <Nav key={menu.title}>
              <NavDropdown title={menu.title}>
                {menu.childrens.map((children) => (
                  <LinkContainer key={children.title} to={children.path}>
                    <NavDropdown.Item>{children.title}</NavDropdown.Item>
                  </LinkContainer>
                ))}
              </NavDropdown>
            </Nav>
          )}
        </div>
      ))}
    </>
  );
};

export default Menus;
