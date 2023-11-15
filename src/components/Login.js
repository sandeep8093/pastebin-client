import { useState } from "react";
import styled from "styled-components";
import { login } from "../redux/apiCalls";
import Navbar from "./NavBar";
import { useHistory, Link } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";

const Container = styled.div`
  width: 80vw;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Wrapper = styled.div`
  width: 70%;
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
  min-width: 40%;
  margin: 10px 0;
  padding: 10px;
`;

const Button = styled.button`
  width: 40%;
  border: none;
  padding: 15px 20px;
  background-color: teal;
  color: white;
  cursor: pointer;
  margin-bottom: 10px;
  &:disabled {
    color: green;
    cursor: not-allowed;
  }
`;

const Error = styled.span`
  color: red;
  margin-top: 10px;
`;

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const { isFetching, error } = useSelector((state) => state.user);
  const history = useHistory();
  

  const handleClick = async (e) => {
    e.preventDefault();
    console.log("hello")
    try {
      const response= await login(dispatch, { email, password });
      console.log(error)
      history.push('/'); // Redirect to the homepage upon successful registration
    } catch (err) {
      console.error('Login failed:', err);
    }
  };

  return (
    <Container>
      <Wrapper>
        <Title>SIGN IN</Title>
        <Form>
          <Input
            placeholder="email"
            onChange={(e) => setEmail(e.target.value)}
          />
          <Input
            placeholder="password"
            type="password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button onClick={handleClick} >
            LOGIN
          </Button>
          <Link to="/register">CREATE A NEW ACCOUNT</Link>
          {error && <Error>{error}</Error>}
          
        </Form>
      </Wrapper>
    </Container>
  );
};

export default Login;
