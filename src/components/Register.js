import styled from "styled-components";
import Navbar from "./NavBar";
import { useState } from "react";
import {  Redirect,Link, useHistory} from 'react-router-dom';
import { register } from "../redux/apiCalls";
import { useDispatch, useSelector } from "react-redux";
// import { useHistory } from "react-router-dom";

const Container = styled.div`
  width: 80vw;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Wrapper = styled.div`
width: 90%;
padding: 30px;
background-color: white;
`;

const Title = styled.h1`
  font-size: 24px;
  font-weight: 300;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

const Input = styled.input`
  flex: 1;
  min-width: 30%;
  margin: 20px 0;
  padding: 20px;
`;


const Button = styled.button`
  width: 30%;
  border: none;
  padding: 15px 20px;
  background-color: teal;
  color: white;
  cursor: pointer;
`;


const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const dispatch = useDispatch();
  const { isFetching, error } = useSelector((state) => state.user);
  const history = useHistory();
  const handleClick = async(e) => {
    e.preventDefault();
    console.log("hello")
    await register(dispatch, { email, password ,username});
    history.push('/login')
  };
  return (<>
  
    <Container>
      <Wrapper>
        <Title>CREATE AN ACCOUNT</Title>
        <Form>
        <Input
            placeholder="username"
            onChange={(e) => setUsername(e.target.value)}
          />
        <Input
            placeholder="email"
            onChange={(e) => setEmail(e.target.value)}
          />
          <Input
            placeholder="password"
            type="password"
            onChange={(e) => setPassword(e.target.value)}
          />
         
         
          <Button onClick={handleClick} disabled={isFetching}>
            Register
          </Button>
          <Link to="/login">
            LOG INTO EXISTING ACCOUNT
          </Link>
        </Form>
      </Wrapper>
    </Container>
    </> );
};

export default Register;
