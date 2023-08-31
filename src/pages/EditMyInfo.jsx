import styled from 'styled-components';
import { TabBar } from '../components/commons';
import { EditMyInfoUl } from '../components/myInfo';

function EditMyInfo() {
  return (
    <ContainerDiv className="margininside">
      <TabBar pathName="MyInfo">
        <EditMyInfoUl />
      </TabBar>
    </ContainerDiv>
  );
}

export default EditMyInfo;

const ContainerDiv = styled.div`
  justify-content: center;
`;
