import React from "react";
import Button from "../../styles/Button";

const PrButton = ({ children, action }) => {
  return (
    <Button type="button" onClick={action}>
      <div className="d-flex justify-content-center align-item-center">
        {children}
      </div>
    </Button>
  );
};

export default PrButton;
