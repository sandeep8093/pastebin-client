import React from "react";
import { useDispatch } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import styled from "styled-components";
import { logout } from "../redux/apiCalls";

const Container = styled.div`
  width: 100%;
  height: 100vh;
  background: linear-gradient(
    rgba(255, 255, 255, 0.8),
    rgba(205, 255, 255, 0.8)
  );
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Wrapper = styled.div`
  width: 35%;
  padding: 30px;
  background-color: #fff;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  border-radius: 10px;
`;

const Title = styled.h1`
  font-size: 24px;
  font-weight: 300;
  text-align: center;
  margin-bottom: 20px;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Button = styled.button`
  width: 100%;
  border: none;
  padding: 15px 20px;
  background-color: teal;
  color: white;
  cursor: pointer;
  border-radius: 5px;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #00796b; /* Darker teal on hover */
  }
`;

const Logout = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const handleClick = (e) => {
    e.preventDefault();
    window.localStorage.clear();
    logout(dispatch);
    history.push('/login');
  };

  return (
    <Container>
      <Wrapper>
        <Title>Log Out</Title>
        <Form>
          <p>Come Back Soon! We will be missing you!!</p>
          <Link to="/">
            <Button onClick={handleClick}>LOGOUT</Button>
          </Link>
        </Form>
      </Wrapper>
    </Container>
  );
};

export default Logout;
