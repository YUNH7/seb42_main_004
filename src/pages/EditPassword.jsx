import styled from 'styled-components';
import { TabBar } from '../components/commons';
import { MyInfoUl } from '../components/myInfo';

function EditPassword() {
  return (
    <ContainerDiv className="margininside">
      <TabBar pathName="MyInfo">
        <MyInfoUl pathName="password" />
      </TabBar>
    </ContainerDiv>
  );
}

export default EditPassword;

const ContainerDiv = styled.div`
  justify-content: center;
`;
