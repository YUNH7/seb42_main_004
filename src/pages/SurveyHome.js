import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import { SurveyHomeArticle } from '../components/survey';

function SurveyHome() {
  let { isLogin, admin } = useSelector((state) => state.authReducer);
  let navigate = useNavigate();

  useEffect(() => {
    if (isLogin || admin) navigate('/mealboxes');
  }, []);

  return (
    <Main>
      <SurveyHomeArticle />
    </Main>
  );
}

export default SurveyHome;

const Main = styled.main`
  padding-top: 50px;
  height: calc(100vh - 50px);
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 100%;
  @media (max-width: 480px) {
    height: 100%;
  }
`;
