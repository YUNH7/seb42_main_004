import { useState } from 'react';
import styled from 'styled-components';
import MealBoxEditButton from './MealBoxEditButton';
import MealBoxDeleteButton from './MealBoxDeleteButton';
import MealBoxCounterDiv from './MealBoxCounterDiv';
import MealBoxItemsDiv from './MealBoxItemsDiv';

function CartItemLi({ mealbox, value, calcRenderPrice }) {
  let { name, kcal, price, quantity, products } = mealbox;
  let [isChecked, setIsChecked] = useState(true);

  let IsCheckedHandler = () => {
    setIsChecked(!isChecked);
    calcRenderPrice();
  };

  return (
    <CartItemWrapperLi className="shadow">
      <CartItemTopDiv>
        <CheckBoxInput
          id={value}
          type="checkbox"
          onChange={IsCheckedHandler}
          checked={isChecked}
        />
        <h2>{name}</h2>
        <CartItemTopButtonsDiv>
          <MealBoxDeleteButton cartMealboxId={value} />
          <MealBoxCounterDiv cartMealboxId={value} quantity={quantity} />
        </CartItemTopButtonsDiv>
      </CartItemTopDiv>
      <CartItemBottomDiv>
        <MealBoxItemsDiv products={products} />
        <CartItemBottomButtonsDiv>
          <div>{kcal.toLocaleString()}kcal</div>
          <div>{price.toLocaleString()}원</div>
          <MealBoxEditButton cartMealboxId={value} />
        </CartItemBottomButtonsDiv>
      </CartItemBottomDiv>
    </CartItemWrapperLi>
  );
}

export default CartItemLi;

const CheckBoxInput = styled.input`
  margin-right: 10px;
`;

export const CartItemWrapperLi = styled.li`
  height: fit-content;
  border-radius: 10px;
  background-color: var(--bucket_brown);
  padding: 15px;
`;

export const CartItemTopDiv = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;

  > h2 {
    color: var(--white);
    font-family: 'IBM Plex Sans KR', sans-serif;
  }
`;

export const CartItemBottomDiv = styled.div`
  display: flex;
  justify-content: space-between;
  flex-grow: 1;
`;

const CartItemBottomButtonsDiv = styled.div`
  display: flex;
  align-items: flex-end;

  > div {
    margin-right: 8px;
  }
`;

const CartItemTopButtonsDiv = styled.div`
  flex-grow: 1;
  display: flex;
  justify-content: end;

  > div {
    font-family: 'IBM Plex Sans KR', sans-serif;
    font-size: 1.2rem;
  }
`;
