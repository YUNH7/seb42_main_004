import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { addProductInBox } from '../../reducers/customReducer';
import { TextButton } from '../commons';

function MealBoxEditButton({ cartMealboxId }) {
  let navigate = useNavigate();
  let dispatch = useDispatch();
  let { mealboxes } = useSelector((state) => state.cartReducer.cart);

  let customPageLink = () => {
    let idx = mealboxes.findIndex(
      (el) => String(el.cartMealboxId) === String(cartMealboxId)
    );
    let [mealBoxData, quantity] = [
      mealboxes[idx].products,
      mealboxes[idx].quantity,
    ];

    dispatch(addProductInBox(mealBoxData));
    navigate('/custom', { state: { cartMealboxId, quantity } });
  };

  return (
    <TextButton
      inButton="커스텀 하기"
      onClick={customPageLink}
      padding="0"
      margin="0 0 -0.1rem"
      color="var(--black)"
      hover="none"
      fs="1.2rem"
    />
  );
}

export default MealBoxEditButton;
