import styled from "styled-components";
import {Button} from "@material-ui/core";
import {auth, provider} from "../firebase";

const Container = styled.main`
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const LoginButton = styled(Button)`
  width: fit-content !important;
  margin: 20px !important;
  padding: 5px 10px !important;
  color: white !important;
  font-size: 20px !important;
  background: #606770 !important;
`;

const Login = () => {
  const sighIn = () => {
    auth.signInWithPopup(provider).catch((err) => console.log(err));
  };

  return (
    <Container>
      <h1>Welcome to notepad app!</h1>
      <br />
      <LoginButton onClick={sighIn}>Sign in to notepad</LoginButton>
    </Container>
  );
};

export default Login;
