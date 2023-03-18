import { useParams, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import MainButton from '../commons/MainButton';

function PreAndNextButtons({ nextHandler }) {
  let navigate = useNavigate();
  let { page } = useParams();
  page = Number(page);

  let preHandler = () => {
    navigate(page === 1 ? `/surveyHome` : `/survey/question/${page - 1}`);
  };

  return (
    <ButtonWrapperDiv>
      <MainButton name="이전" handler={preHandler} />
      <MainButton name={page !== 3 ? '다음' : '완료'} handler={nextHandler} />
    </ButtonWrapperDiv>
  );
}

export default PreAndNextButtons;

const ButtonWrapperDiv = styled.div`
  display: flex;
  justify-content: space-between;

  > button {
    flex-grow: 1;
    padding: 30px 0;

    :first-child {
      margin-right: 5px;
    }
    :last-child {
      margin-left: 5px;
    }
  }
`;
