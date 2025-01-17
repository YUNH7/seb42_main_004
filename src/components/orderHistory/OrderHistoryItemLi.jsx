import styled from 'styled-components';
import { MealBoxItemsDiv } from '../cartPage';
import {
  CartItemWrapperLi,
  CartItemTopDiv,
  CartItemBottomDiv,
} from '../cartPage/CartItemLi';

function OrderHistoryItemLi({ mealBox }) {
  let { mealboxKcal, mealboxName, mealboxPrice, mealboxQuantity, products } =
    mealBox;

  return (
    <OrderHistoryWrapperLi>
      <CartItemTopDiv>
        <h2>{mealboxName}</h2>
        <MealBoxCounter>{`X${mealboxQuantity}`}</MealBoxCounter>
      </CartItemTopDiv>
      <MealBoxItemBottemDiv>
        <MealBoxItemsDiv products={products} />
        <MealBoxInfo>
          <span>{`${mealboxKcal}kcal`}</span>
          <span>{`${mealboxPrice}원`}</span>
        </MealBoxInfo>
      </MealBoxItemBottemDiv>
    </OrderHistoryWrapperLi>
  );
}

export default OrderHistoryItemLi;

const OrderHistoryWrapperLi = styled(CartItemWrapperLi)`
  background-color: var(--bucket_brown_070);
`;

const MealBoxItemBottemDiv = styled(CartItemBottomDiv)`
  align-items: flex-end;
`;

const MealBoxCounter = styled.div`
  font-size: 1.2rem;
  font-family: var(--f_hard);
`;

const MealBoxInfo = styled.div`
  > span:first-child {
    margin-right: 0.8rem;
  }
  > span:last-child {
    font-size: 1.2rem;
    font-family: var(--f_hard);
  }
`;
