import styled from 'styled-components';
import {
  MealBoxCounterDiv,
  MealBoxDeleteButton,
  MealBoxEditButton,
  MealBoxItemsDiv,
} from '.';

function CartItemLi({ mealbox, checkBox, isChecked }) {
  const { name, kcal, price, quantity, products, cartMealboxId } = mealbox;

  return (
    <CartItemWrapperLi className="shadow">
      <CartItemTopDiv>
        <CheckBoxInput
          aria-label={isChecked ? '체크표시됨' : '체크되지않음'}
          type="checkbox"
          onChange={checkBox}
          checked={isChecked}
        />
        <h2>{name}</h2>
        <CartItemTopButtonsDiv>
          <MealBoxDeleteButton cartMealboxId={cartMealboxId} />
          <MealBoxCounterDiv
            cartMealboxId={cartMealboxId}
            quantity={quantity}
          />
        </CartItemTopButtonsDiv>
      </CartItemTopDiv>
      <CartItemBottomDiv>
        <MealBoxItemsDiv products={products} />
        <CartItemBottomButtonsDiv>
          <div>{kcal.toLocaleString()}kcal</div>
          <div>{price.toLocaleString()}원</div>
          <MealBoxEditButton cartMealboxId={cartMealboxId} />
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
    font-family: var(--f_hard);
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
    font-family: var(--f_hard);
    font-size: 1.2rem;
  }
`;
