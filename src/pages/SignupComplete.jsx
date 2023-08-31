import styled from 'styled-components';
import { SignupCompleteDiv } from '../components/signup';

function SignupComplete() {
  return (
    <ContainerDiv className="margininside">
      <SignupCompleteDiv />
    </ContainerDiv>
  );
}

export default SignupComplete;

const ContainerDiv = styled.div`
  justify-content: center;
`;
