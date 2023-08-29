import styled from 'styled-components';
import { TabBar } from '../components/commons';
import { MyInfoUl } from '../components/myInfo';

function MyInfo() {
  return (
    <ContainerDiv className="margininside">
      <TabBar pathName="MyInfo">
        <MyInfoUl />
      </TabBar>
    </ContainerDiv>
  );
}

export default MyInfo;

const ContainerDiv = styled.div`
  justify-content: center;
`;
