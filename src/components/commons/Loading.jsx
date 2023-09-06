import styled from 'styled-components';
import { loading } from '../../assets';

function Loading() {
  return (
    <Wrapper>
      <LoadingImg src={loading} alt="loading" />
    </Wrapper>
  );
}

export default Loading;

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;
const LoadingImg = styled.img`
  width: 35%;
`;
