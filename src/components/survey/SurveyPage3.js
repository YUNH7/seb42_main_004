import { useNavigate, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setPlan, setReset } from '../../reducers/surveyQuestionReducer';
import { Option, ExplanationDiv } from './SurveyPage2';
import { SurveyH3 } from './SurveyPage1';
import PreAndNextButtons from './PreAndNextButtons';
import getData from '../../util/getData';
import SurveyBox from './SurveyBox';
import DietInfo from './DietInfo';
import { setSurveyRcmd } from '../../reducers/surveyRcmdReducer';

let explanation = {
  easy: [
    '다이어트는 너무 길어지면 힘들지만 무작정 빨리갈 수는 없어요.',
    '천천히 목표를 향해 나아가보아요.',
  ],
  normal: ['이왕 다이어트를 하는거라면 조금은 도전적인 선택도 좋을거예요!'],
  hard: [
    '다이어트에 대한 강한 의지나 다가오는 중요한 일정이 있으신가요?',
    '강도가 높아 지키기 힘들 수도 있어요.',
  ],
};

function SurveyPage3() {
  let dispatch = useDispatch();
  let navigate = useNavigate();
  let { state } = useLocation();
  let { plan } = useSelector((state) => state.surveyQuestionReducer);

  // 다이어트 플랜 상태 변경
  let dispatchPlan = (e) => {
    dispatch(setPlan(e.target.id));
  };

  // 설문 결과 get 요청 + 화면 전환
  let nextHandler = () => {
    getData(`/mealboxes/rec/survey?kcal=${state[plan].kcal}`)
      .then((res) => {
        dispatch(setSurveyRcmd(res.data));
      })
      .then(() => {
        dispatch(setReset());
        navigate(`/survey/result`);
      });
  };

  let optionItem = Object.keys(explanation).map((p) => {
    return (
      <SurveyBox
        key={p}
        id={p}
        title={p.replace(/^[a-z]/, (char) => char.toUpperCase())}
        group="plan"
        info={<DietInfo plan={state[p]} />}
        changeHandler={dispatchPlan}
        checked={p === plan}
      >
        {explanation[p].map((sentence, idx) => (
          <div key={idx}>{sentence}</div>
        ))}
      </SurveyBox>
    );
  });

  return (
    <article>
      <SurveyH3>
        밀박스 추천을 위한 <br />
        다이어트 플랜를 선택해주세요.
      </SurveyH3>
      <ExplanationDiv>
        선택한 플랜에 따라 일일 칼로리 및 예상 체중이 조정됩니다.
      </ExplanationDiv>
      <Option>{optionItem}</Option>
      <PreAndNextButtons nextHandler={nextHandler} />
    </article>
  );
}

export default SurveyPage3;
