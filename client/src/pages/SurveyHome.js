import styled from 'styled-components';
import SurveyHomeArticle from '../components/survey/SurveyHomeArticle';

function Survey() {
  return (
    <Main>
      <SurveyHomeArticle />
    </Main>
  );
}

export default Survey;

const Main = styled.main`
  height: calc(100vh - 115px);
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 100%;
`;