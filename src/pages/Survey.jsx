import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import { BsFillCircleFill as Dot } from '@react-icons/all-files/bs/BsFillCircleFill.esm';
import { SurveyArticle } from '../components/survey';

function Survey() {
  let { page } = useParams();
  page = Number(page);

  return (
    <Main className="margininside" page={page}>
      <Ul page={page}>
        <li>
          <Dot size="7" />
        </li>
        <li>
          <Dot size="7" />
        </li>
        <li>
          <Dot size="7" />
        </li>
      </Ul>
      <SurveyArticle page={page} />
    </Main>
  );
}

export default Survey;

const Main = styled.main`
  height: calc(100vh - 115px);
  width: 600px;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;
const Ul = styled.ul`
  display: flex;
  justify-content: flex-end;

  > li {
    margin: 2px;
    color: var(--bucket_brown_070);

    :nth-child(${(props) => props.page}) {
      color: var(--signature);
    }
  }
`;
