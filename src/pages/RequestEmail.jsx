import { useSelector } from 'react-redux';
import styled from 'styled-components';
import { RequestEmailDiv } from '../components/signup';

function RequestEmail() {
  const { email } = useSelector((state) => state.authReducer.user);

  return (
    <ContainerDiv className="margininside">
      <RequestEmailDiv email={email} />
    </ContainerDiv>
  );
}

export default RequestEmail;

const ContainerDiv = styled.div`
  justify-content: center;
`;
