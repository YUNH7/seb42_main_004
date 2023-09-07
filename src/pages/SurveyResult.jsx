import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { HelmetTitle, TextButton } from '../components/commons';
import { Cards, MealBoxCardLi } from '../components/allboxes';
import { MealBoxesWrapDiv } from './AllBoxes';
import { deleteSurveyRcmd } from '../reducers/surveyRcmdReducer';

function SurveyResult() {
  const { surveyRcmd } = useSelector((state) => state.surveyRcmdReducer);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const surveyRetry = () => {
    if (
      window.confirm(
        '추천 페이지로 돌아갑니다\n현재 추천 받은 밀박스는 삭제됩니다.'
      )
    ) {
      dispatch(deleteSurveyRcmd());
      navigate('/survey/question/1');
    }
  };

  useEffect(() => {
    if (!surveyRcmd?.breakfast) navigate('/error');
  }, []);

  return (
    <MealBoxesWrapDiv className="margininside">
      <HelmetTitle title="추천 결과 페이지" />
      <h1>추천 결과 페이지(｡•̀ᴗ-)✧</h1>
      <Cards>
        <MealBoxCardLi title="아침" mealBox={surveyRcmd.breakfast} />
        <MealBoxCardLi title="점심" mealBox={surveyRcmd.lunch} />
        <MealBoxCardLi title="저녁" mealBox={surveyRcmd.dinner} />
      </Cards>
      <SurveyRetryDiv>
        <TextButton
          inButton="다시 추천 받기"
          onClick={surveyRetry}
          font="basic"
          margin="0 -4px 0 0"
        />
        <p>현재 추천 받은 밀박스가 사라집니다</p>
      </SurveyRetryDiv>
    </MealBoxesWrapDiv>
  );
}

export default SurveyResult;

const SurveyRetryDiv = styled.div`
  margin-top: 2rem;
  align-self: flex-end;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
`;
