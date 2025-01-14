import styled from 'styled-components';
import { OrderHistoryItemLi } from '.';
import { CartItemListUl } from '../../pages/Cart';

function OrderHistoryUl({ mealBoxes }) {
  return (
    <HistoryUl>
      {mealBoxes.map((el, idx) => {
        return <OrderHistoryItemLi key={idx} mealBox={el} />;
      })}
    </HistoryUl>
  );
}

export default OrderHistoryUl;

const HistoryUl = styled(CartItemListUl)`
  width: 100%;
`;
