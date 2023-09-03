import { useSelector } from 'react-redux';
import styled from 'styled-components';

function CartCounter() {
  const { mealboxes } = useSelector((state) => state.cartReducer.cart);

  return (
    <Round>
      <Count>{mealboxes?.length || 0}</Count>
    </Round>
  );
}

export default CartCounter;

const Round = styled.div`
  position: absolute;
  top: 18px;
  right: -7px;
  width: 17px;
  height: 17px;
  background-color: red;
  border-radius: 100%;
`;

const Count = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-family: var(--f_hard);
  font-size: 0.8rem;
  font-weight: 900;
  color: var(--white);
`;
