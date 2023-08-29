import { useSelector } from 'react-redux';
import { SurveyPage1, SurveyPage2, SurveyPage3 } from '.';

function SurveyArticle({ page }) {
  let { name } = useSelector((state) => state.authReducer.user);
  switch (page) {
    case 1:
      return <SurveyPage1 />;
    case 2:
      return <SurveyPage2 name={name} />;
    case 3:
      return <SurveyPage3 />;
  }
}

export default SurveyArticle;
