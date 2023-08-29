import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {
  addProductInBox,
  initializeCustom,
  setIdNameImage,
} from '../reducers/customReducer';

function useToCustom(mealBox) {
  const { admin } = useSelector((state) => state.authReducer);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const toCustom = () => {
    if (mealBox?.products) {
      dispatch(addProductInBox(mealBox.products));
      if (admin) {
        const { name, mealboxId, imagePath } = mealBox;
        dispatch(setIdNameImage({ name, mealboxId, imagePath }));
      }
    } else if (!mealBox && admin) dispatch(initializeCustom());
    navigate('/custom');
  };
  return toCustom;
}

export default useToCustom;
