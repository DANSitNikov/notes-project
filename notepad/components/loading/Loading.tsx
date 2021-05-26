import styled from 'styled-components';
import {CircularProgress} from "@material-ui/core";

const Container = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
`;

const CustomLoader = styled(CircularProgress)`
  width: 100px !important;
  height: 100px !important;
  
  svg{
    color: grey;
  }
`;

const Loading = () => {
  return (
    <Container>
      <CustomLoader />
    </Container>
  );
};

export default Loading;
