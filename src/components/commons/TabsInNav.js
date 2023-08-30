import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import { useToCustom } from '../../hooks';

function TabInNav({ flexDirection, tabSize }) {
  const { admin } = useSelector((state) => state.authReducer);
  const toCustom = useToCustom();
  const navigate = useNavigate();
  const toPath = (path) => () => navigate(path);

  return (
    <Nav flexDirection={flexDirection} tabSize={tabSize}>
      {!admin && (
        <Tab onClick={toPath('/survey/question/1')}>한끼밀 추천받기</Tab>
      )}
      <Tab onClick={toCustom}>커스텀 밀박스 만들기</Tab>
      <Tab onClick={toPath('/mealboxes')}>전체 상품 보기</Tab>
      <Tab onClick={toPath('/products')}>구성품 알아보기</Tab>
    </Nav>
  );
}

export default TabInNav;

const Nav = styled.nav`
  display: flex;
  flex-direction: ${(props) => props.flexDirection || 'row'};
  align-items: center;
  justify-content: space-around;
  flex-grow: ${(props) => props.flexDirection !== 'column' && '1'};

  @media (max-width: 768px) {
    display: ${(props) => props.flexDirection !== 'column' && 'none'};
  }

  > button {
    flex-basis: ${(props) => props.tabSize || '120px'};
  }
`;

const Tab = styled.button`
  white-space: nowrap;
  font-family: var(--f_hard);
`;
