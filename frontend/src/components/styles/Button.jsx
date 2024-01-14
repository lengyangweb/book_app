import styled from "styled-components";

const Button = styled.button`
  cursor: pointer;
  border: 2px solid #4a2569;
  color: #491974;
  background: #ffffff;
  padding: 8px 15px;
  border-radius: 10px;
  transition: 0.2s all ease-in;

  &:hover {
    background: #4a2569;
    color: #ffffff;
  }
`;

export default Button;
